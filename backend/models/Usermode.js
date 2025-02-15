
import mongoose from "mongoose";
import bcrypt from "bcrypt";
const userSchema = new mongoose.Schema({
  name: String,
  email: { type: "String", unique: true, required: true },
  password: { type: "String", required: true },
  balance: { type: Number, default: 100 },
  investments: [
    {
      symbol: String,
      shares: Number,
      purchasePrice: Number,
    },
  ],
  resetPasswordToken: {
    type: String,
  },
  resetPasswordExpire: {
    type: Date,
  },
},{
    timestamps: true,
});

userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
  };
  
  userSchema.pre("save", async function (next) {
    if (!this.isModified) {
      next();
    }
  
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  });
  
export default mongoose.model("User", userSchema);
