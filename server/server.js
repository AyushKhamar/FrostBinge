import express from "express";
import { config } from "dotenv";
import { router as authRouter } from "./routes/auth.js";
import { connectToMongoDb } from "./config/config.js";
import { router as movieRouter } from "./routes/movie.js";
import { router as tvRouter } from "./routes/tv.js";
import { router as searchRouter } from "./routes/search.js";
import { authorisation } from "./middleware/authorisation.js";
import cookieParser from "cookie-parser";
config();
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
connectToMongoDb();
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/movies", authorisation, movieRouter);
app.use("/api/v1/tv", authorisation, tvRouter);
app.use("/api/v1/search", authorisation, searchRouter);

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server started at port : ${process.env.PORT || 3000}`);
});
