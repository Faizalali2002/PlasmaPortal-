import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import testRouter from "./routes/test.route.js";
import connectDB from "./db/index.js";
import authRoutes from "./routes/auth.route.js";

dotenv.config();

connectDB();
const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

app.use("/api/v1/test", testRouter);
app.use("/api/v1/auth", authRoutes);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(
    `⚙️  Server is running in ${process.env.DEV_MODE} mode at port : ${process.env.PORT}`
  );
});
