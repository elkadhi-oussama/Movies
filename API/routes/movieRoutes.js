// Import the Express library for creating the router
import express from "express";

// Import the controller functions for handling movie-related operations
import {
  addNewMovie,
  getAllMovie,
  getOneMovie,
  deleteOneMovie,
  updateOneMovie,
} from "../controllers/movieControllers.js";

// Import the validation middleware for movie data
import { validateMovie, validation } from "../middleware/validator.js";

// Create a new router instance
const Router = express.Router();

// Define a POST route to add a new movie
// The route uses validation middleware before calling the controller function
Router.post("/addMovie", validateMovie(), validation, addNewMovie);

// Define a GET route to retrieve all movies
Router.get("/getAllMovie", getAllMovie);

// Define a GET route to retrieve a specific movie by its ID
Router.get("/getOneMovie/:id", getOneMovie);

// Define a DELETE route to delete a specific movie by its ID
Router.delete("/deleteOneMovie/:id", deleteOneMovie);

// Define a PUT route to update a specific movie by its ID
// The route uses validation middleware before calling the controller function
Router.put("/updateOneMovie/:id", updateOneMovie);

// Export the router to be used in other parts of the application
export default Router;
