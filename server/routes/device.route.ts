import { Router } from "express";
import { getDeviceType } from "../controllers/device.controller";

const deviceRouter = Router();

deviceRouter.get("/deviceType", getDeviceType);

export default deviceRouter;
