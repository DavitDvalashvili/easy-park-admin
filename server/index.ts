import express from "express";
import cors from "cors";
import session from "express-session";
import { v4 } from "uuid";
import authRouter from "./routes/auth.route";

const { PORT, API_SERVER } = process.env;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: API_SERVER,
    methods: ["GET", "POST", "UPDATE", "DELETE"],
    credentials: true,
  })
);

app.use(
  session({
    genid: () => v4(),
    name: "user",
    secret: "secret2444666668888888",
    resave: false,
    saveUninitialized: false,
    cookie: {
      sameSite: true,
      maxAge: 60 * 60 * 24 * 365 * 1000,
      httpOnly: true,
      secure: false,
    },
  })
);

app.use(authRouter);

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
