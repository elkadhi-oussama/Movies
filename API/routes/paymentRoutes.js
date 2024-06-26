// Import the Express library for creating the router
import express from "express";

// Import the payment controller functions for adding and verifying payments
import {
  addPayment,
  verifyPayment,
} from "../controllers/paymentControllers.js";

// Create an instance of an Express router
const Router = express.Router();

// Define a route for adding a payment
// This route handles POST requests to the /add endpoint
// When a request is received, the addPayment function from the paymentControllers module is called
Router.post("/add", addPayment);

// Define a route for verifying a payment
// This route handles POST requests to the /verify/:id endpoint
// The :id part of the path is a route parameter, which represents the payment ID
// When a request is received, the verifyPayment function from the paymentControllers module is called
Router.post("/verify/:id", verifyPayment);

// Export the router as the default export of this module
export default Router;
