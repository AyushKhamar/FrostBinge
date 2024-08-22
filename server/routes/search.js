import express from "express";
import {
  deleteSearchHistory,
  getSearchHistory,
  searchMovie,
  searchPerson,
  searchTv,
} from "../controller/search.js";

export const router = express.Router();

router.get("/person/:query", searchPerson);
router.get("/movie/:query", searchMovie);
router.get("/tv/:query", searchTv);
router.get("/history", getSearchHistory);
router.delete("/history/:id", deleteSearchHistory);
