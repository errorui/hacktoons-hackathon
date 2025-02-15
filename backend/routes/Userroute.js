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
    expires: new Date(0),
    sameSite: "none",
  });
  return res.send("Logout successful");
});

router.post("/forgotpassword", forgotPassword);
router.post("/resetpassword/:resetToken", resetPassword);
router.get("/profile", protect, getUser);


router.post("/buy", protect, async (req, res) => {

  try {
   
    const { userId, name, amount, price } = req.body;
    console.log(req.body)
    const user = await userModel.findById(userId);

    if (!user || user.balance < amount) {
      return res.status(400).json({ message: "Insufficient funds" });
    }

    const shares = amount / price;
   
    user.investments.push({ symbol:name, shares, purchasePrice: price });
    console.log(user.investments)
    user.balance =user.balance- parseInt(amount);
  
    await user.save();

    res.json({ message: "Stock purchased", user });
  } catch (error) {
    console.error("Error buying stock:", error);
    res.status(500).json({ message: "Server error" });
  }
});


router.post("/sell", protect, async (req, res) => {
  try {
    const { symbol, sharesToSell } = req.body;
    console.log(req.body);

    const userId = req.user._id; 
    const user = await userModel.findOne({ _id: userId, "investments.symbol": symbol });

    if (!user) {
      return res.status(404).json({ message: "Stock not found in portfolio" });
    }

    const investment = user.investments.find(inv => inv.symbol === symbol);

    if (investment.shares < sharesToSell) {
      return res.status(400).json({ message: "Not enough shares to sell" });
    }

    // ✅ Fetch latest stock price
    const currentPrice = await getStockPrice(symbol);
    if (!currentPrice) {
      return res.status(500).json({ message: "Failed to fetch stock price" });
    }

    const saleAmount = sharesToSell * currentPrice;

    // ✅ Update shares and balance in one step
    await userModel.findOneAndUpdate(
      { _id: userId },
      { 
        $inc: { "investments.$[elem].shares": -sharesToSell, balance: saleAmount } 
      },
      {
        arrayFilters: [{ "elem.symbol": symbol }],
        new: true,
      }
    );

    // ✅ Remove investments with zero or near-zero shares
    await userModel.updateOne(
      { _id: userId },
      { $pull: { investments: { shares: { $lte: 0 } } } }
    );

    // ✅ Fetch updated user
    const updatedUser = await userModel.findById(userId).select("-password"); 

    res.json({
      message: "Stock sold successfully",
      user: updatedUser,
      saleAmount,
      currentPrice,
    });

  } catch (error) {
    console.error("Error selling stock:", error);
    res.status(500).json({ message: "Server error" });
  }
});


router.get("/user", protect, async (req, res) => {
  try {
    const user = req.user;
    console.log(user)
    const symbols = user.investments.map(inv => inv.symbol);
    console.log(symbols)

    const priceResponses = await Promise.all(symbols.map(symbol => getStockPrice(symbol)));

    const currentPrices = {};
    priceResponses.forEach((price, index) => {
      currentPrices[symbols[index]] = price ?? user.investments[index].purchasePrice;
    });

    const portfolio = user.investments.map((inv) => {
      const currentPrice = currentPrices[inv.symbol];
      const profitLoss = (currentPrice - inv.purchasePrice) * inv.shares;
      return { ...inv.toObject(), currentPrice, profitLoss }; 
    });
    
    let u=user.toJSON();
    const userWithPortfolio = { ...u, portfolio };

    res.status(200).json(userWithPortfolio);
  } catch (error) {
    console.error("Error fetching user data:", error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
