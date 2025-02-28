import { Router } from "express";
import { getServices, updateService } from "../controllers/service.controller";

const serviceRouter = Router();

serviceRouter.get("/services", getServices);
serviceRouter.post("/updateService/:serviceId", updateService);

export default serviceRouter;
