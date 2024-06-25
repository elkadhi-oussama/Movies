// Import jwt for token handling and User model to interact with the database
import jwt from "jsonwebtoken";
import User from "../models/User.js";

// Middleware function to authenticate user based on JWT token
const isAuth = async (req, res, next) => {
  try {
    // Extract the token from the request headers
    const tokenUser = req.headers["auth"];

    // Decode and verify the token using the private key
    const decoded = await jwt.verify(tokenUser, process.env.privateKey);

    // If token verification fails, send a 401 Unauthorized response
    if (!decoded) {
      return res.status(401).send({ msg: "User not authenticated" });
    }

    // Find the user in the database using the decoded token's user ID
    const userFind = await User.findById(decoded.id);

    // If user is not found in the database, send a 401 Unauthorized response
    if (!userFind) {
      return res.status(401).send({ msg: "User not authenticated" });
    }

    // Assign the found user to the request object
    req.user = userFind;

    // Call the next middleware function in the stack
    next();
  } catch (error) {
    // If any error occurs during the process, send a 500 Internal Server Error response
    return res.status(500).send({ msg: "We have some error", error });
  }
};

// Export the isAuth middleware function for use in other parts of the application
export default isAuth;
