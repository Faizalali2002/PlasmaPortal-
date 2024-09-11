import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

// Middleware to verify JWT token
const authMiddleware = (req, res, next) => {
  try {
    // Get the token from the request header and trim any extra spaces
    const token = req.header("Authorization")?.replace("Bearer ", "").trim();
    console.log("Extracted Token from Header: ", token); // Log the extracted token

    // Check if the token is present
    if (!token) {
      console.log("Token not provided."); // Log if token is not present
      return res.status(401).send({
        success: false,
        message: "Access Denied. No token provided.",
      });
    }

    // Log before token verification
    console.log("Verifying token...");

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded Token: ", decoded); // Log the decoded token information

    // Attach the decoded user information to the request object
    req.user = decoded;
    console.log("Attached User Info to Request: ", req.user); // Log the attached user info

    // Proceed to the next middleware or route handler
    next();

    console.log("Proceeding to next middleware...");
  } catch (error) {
    console.error("Authentication error:", error); // Log any authentication error
    return res.status(401).send({
      success: false,
      message: "Invalid or expired token.",
    });
  }
};

export default authMiddleware;
