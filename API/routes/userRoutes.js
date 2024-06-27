// Import the Express library for creating the router
import express from "express";

// Import user-related controllers for handling user operations
import { 
  registerUser, 
  loginUser, 
  currentUser, 
  getAllUser, 
  updateOneUser, 
  deleteOneUser, 
  getOneUser 
} from "../controllers/userControllers.js";

// Import validation middlewares for user registration and login
import { validateRegister, validateLogin, validation } from "../middleware/validator.js";

// Import authentication middleware to check if the user is authenticated
import isAuth from "../middleware/isAuth.js";

// Create an instance of an Express router
const Router = express.Router();

// Define a route for user registration
// Apply the validation middlewares before the controller
Router.post("/register", validateRegister(), validation, registerUser);

// Define a route for user login
// Apply the validation middlewares before the controller
Router.post("/login", validateLogin(), validation, loginUser);

// Define a route to get the current authenticated user
// Apply the authentication middleware before the controller
Router.get("/current", isAuth, currentUser);

// Define a route to get all users
Router.get("/getAllUser", getAllUser);

// Define a route to get a single user by ID
Router.get("/getOneUser/:id", getOneUser);

// Define a route to delete a single user by ID
Router.delete("/deleteOneUser/:id", deleteOneUser);

// Define a route to update a single user by ID
Router.put("/updateOneUser/:id",validateLogin(), validation, updateOneUser);

// Export the router to be used in the main application
export default Router;
