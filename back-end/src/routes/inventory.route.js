import express from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import {
  createInventoryController,
  getInventoryController,
} from "../controllers/inventory.controller.js";

const router = express.Router();

//create inventory
router.post("/create-inventory", authMiddleware, createInventoryController);

//get inventory
router.get("/get-inventory", authMiddleware, getInventoryController);

export default router;
