import { Router } from "express";
import {
  getBenefits,
  updateBenefit,
  addBenefit,
} from "../controllers/benefit.controller";

const benefitRouter = Router();

benefitRouter.get("/benefits", getBenefits);
benefitRouter.post("/updateBenefit/:benefitId", updateBenefit);
benefitRouter.post("/addBenefit", addBenefit);

export default benefitRouter;
