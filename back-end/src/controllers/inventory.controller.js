import { User } from "../models/user.model.js"; // Import the User model
import { Inventory } from "../models/inventory.model.js"; // Import the Inventory model

// Create Inventory
export const createInventoryController = async (req, res) => {
  try {
    const { email, inventoryType } = req.body;

    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User Not Found",
      });
    }

    // Check if the user is a donor when inventoryType is "in"
    if (inventoryType === "in" && user.role !== "donar") {
      return res.status(403).send({
        success: false,
        message: "Not a Donor Account",
      });
    }

    // Check if the user is a hospital when inventoryType is "out"
    if (inventoryType === "out" && user.role !== "hospital") {
      return res.status(403).send({
        success: false,
        message: "Not a Hospital Account",
      });
    }

    // Save the inventory
    const inventory = new Inventory({
      ...req.body,
      donar: inventoryType === "in" ? user._id : null,
      hospital: inventoryType === "out" ? user._id : null,
    });
    await inventory.save();

    return res.status(201).send({
      success: true,
      message: "Inventory created successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in creating inventory",
      error,
    });
  }
};

// Get Inventory
export const getInventoryController = async (req, res) => {
  try {
    // Find the inventory by organisation and populate the related fields
    const inventory = await Inventory.findOne({ organisation: req.body.id })
      .populate("donar")
      .populate("hospital")
      .sort({ createdAt: -1 }); // Sort by createdAt field (latest first)

    if (!inventory) {
      return res.status(404).send({
        success: false,
        message: "Inventory not Found",
      });
    }

    return res.status(200).send({
      success: true,
      message: "Get all records successfully",
      inventory,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in getting the Inventory",
      error,
    });
  }
};
