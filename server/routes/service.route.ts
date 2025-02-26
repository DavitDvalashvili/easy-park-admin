import { Router } from "express";
import { getServices } from "../controllers/service.controller";

const serviceRouter = Router();

serviceRouter.get("/services", getServices);

export default serviceRouter;
