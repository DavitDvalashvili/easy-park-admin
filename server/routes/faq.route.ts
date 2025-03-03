import { Router } from "express";
import { getFaqs, updateFaq, addFaq } from "../controllers/faq.controller";

const faqRouter = Router();

faqRouter.get("/faqs", getFaqs);
faqRouter.post("/updateFaq/:faqId", updateFaq);
faqRouter.post("/addFaq", addFaq);

export default faqRouter;
