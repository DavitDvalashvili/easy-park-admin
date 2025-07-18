import express from "express";
import cors from "cors";
import session from "express-session";
import { v4 } from "uuid";
import authRouter from "./routes/auth.route";
import { sessionStore } from "./db/database";
import deviceRouter from "./routes/device.route";
import serviceRouter from "./routes/service.route";
import benefitRouter from "./routes/benefit.route";
import faqRouter from "./routes/faq.route";
import aboutRouter from "./routes/about.route";
import path from "path";

const { PORT, API_CLIENT } = process.env;

const app = express();

app.use("/images", express.static(path.join(__dirname, "images")));

app.use(
  cors({
    origin: API_CLIENT,
    methods: ["GET", "POST", "UPDATE", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    genid: () => v4(),
    name: "auth",
    secret: "password123",
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
    cookie: {
      sameSite: true,
      maxAge: 60 * 60 * 24 * 365 * 1000,
      httpOnly: true,
      secure: false,
    },
  })
);

app.use(authRouter);
app.use(deviceRouter);
app.use(serviceRouter);
app.use(benefitRouter);
app.use(faqRouter);
app.use(aboutRouter);

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
