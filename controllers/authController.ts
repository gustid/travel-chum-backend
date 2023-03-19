import { Request, Response } from "express";
import { User } from "../models/userModel";
import catchAsync from "../utils/catchAsync";
import * as jwt from "jsonwebtoken";

const signToken = (id: string) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || "");
};

export const signUp = catchAsync(async (req: Request, res: Response) => {
  const newUser = await User.create({
    email: req.body.email,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    password: req.body.password
  });

  const token: string = signToken(newUser._id.toString());

  const cookieExpiresIn: number = parseInt(
    process.env.JWT_COOKIE_EXPIRES_IN || ""
  );

  res.cookie("jwt", token, {
    expires: new Date(Date.now() + cookieExpiresIn * 24 * 60 * 60 * 1000),
    httpOnly: true,
    secure: req.secure || req.headers["x-forwarded-proto"] === "https"
  });

  const { password, ...data } = newUser;

  res.status(200).send({
    token,
    data
  });
});
