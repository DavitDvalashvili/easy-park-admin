import Router from "express";
import { login, logout, checkSession } from "../controllers/auth.controller";

const authRouter = Router();

authRouter.post("/login", login);
authRouter.post("/logout", logout);
authRouter.get("/checkSession", checkSession);

export default authRouter;
