import express from "express";
import { config } from "dotenv";
import { router as authRouter } from "./routes/auth.js";
import { connectToMongoDb } from "./config/config.js";
import { router as movieRouter } from "./routes/movie.js";
config();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
connectToMongoDb();
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/movies", movieRouter);

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server started at port : ${process.env.PORT || 3000}`);
});
