import mongoose from "mongoose";
import validator from "validator";
import * as bcrypt from "bcryptjs";

export interface IUser {
  name: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
}

const userSchema = new mongoose.Schema<IUser>({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Please provide a valid email"]
  },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  password: { type: String, required: true, minlength: 8, select: false }
});

userSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, 12);

  next();
});

export const User = mongoose.model<IUser>("User", userSchema);
