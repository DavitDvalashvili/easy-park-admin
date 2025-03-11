import { Router } from "express";
import {
  getDeviceType,
  getDevice,
  updateDevice,
  updateFeature,
  addFeature,
  deleteFeature,
} from "../controllers/device.controller";

const deviceRouter = Router();

deviceRouter.get("/deviceType", getDeviceType);
deviceRouter.get("/device", getDevice);
deviceRouter.post("/updateDevice/:deviceId", updateDevice);
deviceRouter.post("/updateFeature/:featureId", updateFeature);
deviceRouter.post("/addFeature", addFeature);
deviceRouter.delete("/deleteFeature/:featureId", deleteFeature);

export default deviceRouter;
