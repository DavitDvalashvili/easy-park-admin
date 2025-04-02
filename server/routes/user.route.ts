import { Router } from "express";
import {
  logIn,
  logOut,
  checkAuthentication,
} from "../controllers/user.controller";

const userRouter = Router();

userRouter.post("/logIn", logIn);
userRouter.get("/logOut", logOut);
userRouter.get("/checkAuthentication", checkAuthentication);

export default userRouter;
