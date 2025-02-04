import express from "express";
import cors from "cors";

const { PORT, API_SERVER } = process.env;

const app = express();
app.use(express.json());

app.use(
  cors({
    origin: API_SERVER,
    methods: ["GET", "POST", "UPDATE", "DELETE"],
    credentials: true,
  })
);

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
