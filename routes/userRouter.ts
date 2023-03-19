import express from "express";
import {
  createUser,
  getUser,
  updateUser,
  deleteUser
} from "./../controllers/userController";

const userRouter = express.Router();

userRouter.route("/").post(createUser);
userRouter.route("/:id").get(getUser).patch(updateUser).delete(deleteUser);

export default userRouter;
