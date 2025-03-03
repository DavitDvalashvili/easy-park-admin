import { Router } from "express";
import { getAbout, updateAbout } from "../controllers/about.controller";

const aboutRouter = Router();

aboutRouter.get("/about", getAbout);
aboutRouter.post("/updateAbout/:Id", updateAbout);

export default aboutRouter;
