// Clear the console to remove any previous logs or errors for a clean start
console.clear();

// Import the Express library for creating the web server
import express from "express";

// Import the Mongoose library for interacting with MongoDB
import mongoose from "mongoose";

// Import the CORS library to handle Cross-Origin Resource Sharing
import cors from "cors";

// Import the Body-Parser library for parsing request bodies
import bodyParser from "body-parser";

// Import the router for handling movie-related routes
import routerMovie from "./routes/movieRoutes.js";

// Import the router for handling user-related routes
import routerUser from "./routes/userRoutes.js";

// Import the router for handling payment-related routes
import routerPayment from "./routes/paymentRoutes.js";

// Import and configure environment variables from a .env file
import "dotenv/config";

// Create an instance of an Express application
const app = express();

// Use Express's built-in middleware to parse incoming JSON requests
app.use(express.json());

// Enable Cross-Origin Resource Sharing (CORS) for all requests
app.use(cors({
  origin:["https://movies-application-api.vercel.app"], // Specify the allowed origin
  methods:["POST", "GET", "DELETE","PUT"], // Specify the allowed HTTP methods
  credentials:true // Allow cookies to be sent with requests
}));

// Use Body-Parser's URL-encoded middleware to parse URL-encoded request bodies
app.use(bodyParser.urlencoded({ extended: false }));

// Get the port number from environment variables, where the server will listen for requests
const PORT = process.env.PORT;

// Get the MongoDB connection string from environment variables
const DB = process.env.DB_URL;

// Connect to the MongoDB database using Mongoose
mongoose
  .connect(DB)
  .then(() => console.log("Database is connected !!!!!")) // Log a success message if the connection is successful
  .catch((err) => console.log("Database has a problem ", err)); // Log an error message if the connection fails

// Define a route for the root URL that sends a simple HTML response
app.get("/", (req, res) => res.send("<h1>Hello Server side</h1>"));

// Use the movie router for any requests that start with "/movie"
app.use("/movie", routerMovie);

// Use the user router for any requests that start with "/user"
app.use("/user", routerUser);

// Use the payment router for any requests that start with "/payment"
app.use("/payment", routerPayment);

// Start the Express server and listen on the specified port
app.listen(PORT, (err) => {
  if (err) throw err; // If there is an error starting the server, throw an error
  return console.log(`Server is running on http://localhost:${PORT}`); // Log a message indicating that the server is running
});
