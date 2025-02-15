import express from "express";
import protect from "../middleware/isLoggin.js";
import {
  registerUser,
  authUser,
  forgotPassword,
  resetPassword,
  getUser,
} from "../controllers/usercontroller.js";
import userModel from "../models/Usermode.js";
import { getStockPrice } from "../config/fetchStockPrices.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", authUser);
router.get("/logout", protect, (req, res) => {
  res.cookie("token", "", {
    httpOnly: true,
    secure: true,
    expires: new Date(0), // ✅ Immediate expiry
    sameSite: "none",
  });
  return res.send("Logout successful");
});

router.post("/forgotpassword", forgotPassword);
router.post("/resetpassword/:resetToken", resetPassword); // ✅ Fixed route typo
router.get("/profile", protect, getUser);

router.post("/buy", protect, async (req, res) => {
  const { userId, symbol, amount, price } = req.body;
  const user = await userModel.findById(userId);

  if (!user || user.balance < amount) {
    return res.status(400).json({ message: "Insufficient funds" });
  }

  const shares = amount / price;
  user.investments.push({ symbol, shares, purchasePrice: price });
  user.balance -= amount;

  await user.save();
  res.json({ message: "Stock purchased", user });
});

router.get("/user", protect, async (req, res) => {
    try {
        const user = req.user;
        const symbols = user.investments.map(inv => inv.symbol);

        // ✅ Fetch stock prices in parallel
        const priceResponses = await Promise.all(symbols.map(symbol => getStockPrice(symbol)));

        const currentPrices = {};
        priceResponses.forEach((price, index) => {
            currentPrices[symbols[index]] = price ?? user.investments[index].purchasePrice;
        });

        const portfolio = user.investments.map((inv) => {
            const currentPrice = currentPrices[inv.symbol];
            const profitLoss = (currentPrice - inv.purchasePrice) * inv.shares;
            return { ...inv, currentPrice, profitLoss };
        });

        const userWithPortfolio = { ...user, portfolio };

        res.status(200).json(userWithPortfolio);
    } catch (error) {
        console.error("Error fetching user data:", error);
        res.status(500).json({ message: "Server error" });
    }
});

export default router;
