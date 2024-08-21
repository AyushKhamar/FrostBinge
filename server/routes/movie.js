import express from "express";
import {
  getMovieDetails,
  getMoviesByCategory,
  getMovieTrailers,
  getSimilarMovies,
  getTrendingMovie,
} from "../controller/movie.js";
export const router = express.Router();

router.get("/trending", getTrendingMovie);
router.get("/:id/trailers", getMovieTrailers);
router.get("/:id/details", getMovieDetails);
router.get("/:id/similar", getSimilarMovies);
router.get("/:category", getMoviesByCategory);
