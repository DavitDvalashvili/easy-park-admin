import { Router } from "express";
import {
  getDeviceType,
  getDevice,
  updateDevice,
  updateFeature,
  addFeature,
  deleteFeature,
  addImage,
  deleteImage,
} from "../controllers/device.controller";
import { uploadImage } from "../middleWare/Upload";

const deviceRouter = Router();

deviceRouter.get("/deviceType", getDeviceType);
deviceRouter.get("/device", getDevice);
deviceRouter.post("/updateDevice/:deviceId", updateDevice);
deviceRouter.post("/updateFeature/:featureId", updateFeature);
deviceRouter.post("/addFeature", addFeature);
deviceRouter.delete("/deleteFeature/:featureId", deleteFeature);
deviceRouter.post("/addImage", uploadImage, addImage);
deviceRouter.delete("/deleteImage/:imageId", deleteImage);

export default deviceRouter;
