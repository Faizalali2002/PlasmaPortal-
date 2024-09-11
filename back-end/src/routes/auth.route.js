import express from "express";
import {
  currentUserContrller,
  loginController,
  registerController,
} from "../controllers/auth.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const router = express.Router();

//reister
router.post("/register", registerController);

//login
router.post("/login", loginController);

//get user
router.get("/current-user", authMiddleware, currentUserContrller);
export default router;
