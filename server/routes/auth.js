import express from "express";
import { authCheck, login, logout, signUp } from "../controller/auth.js";
import { authorisation } from "../middleware/authorisation.js";
export const router = express.Router();

router.post("/signup", signUp);
router.post("/login", login);
router.post("/logout", logout);
//we need to check auth on this because it is solely made to give frontend the verification
// that is user logged in or not
router.get("/authCheck", authorisation, authCheck);
