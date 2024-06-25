// Import the User model for database operations
import User from "../models/User.js";
// Import bcrypt for hashing passwords
import bcrypt from "bcrypt";
// Import jsonwebtoken for generating JWT tokens
import jwt from "jsonwebtoken";

// Function to register a new user
export const registerUser = async (req, res) => {
  try {
    // Destructure user details from the request body
    const { username, email, password, isAdmin, subscribe } = req.body;

    // Check if the email or username already exists in the database
    const emailUserFind = await User.findOne({ email });
    const userNameUserFind = await User.findOne({ username });

    // If email or username is found, return an error response
    if (emailUserFind || userNameUserFind) {
      return res.status(400).send({ msg: "Username or email already exists!" });
    }

    // Prepare user data for saving
    const dataUser = new User({
      username,
      email,
      password,
      isAdmin,
      subscribe,
    });

    // Hash the password before saving
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);
    dataUser.password = hashedPassword;

    // Save the new user to the database
    const newUser = await dataUser.save();

    // Generate an access token for the new user
    const payload = { id: newUser._id };
    const secret = process.env.privateKey;
    const options = { expiresIn: 3600 }; // Token expires in 1 hour
    const userToken = jwt.sign(payload, secret, options);

    // Send a success response with the generated token
    res.status(200).send({ msg: "New user added", userToken });
  } catch (error) {
    // Send an error response if there was a problem registering the user
    res.status(500).send({ msg: "Can't register user", error });
  }
};

// Function to log in an existing user
export const loginUser = async (req, res) => {
  try {
    // Destructure login details from the request body
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      // If user is not found, return an error response
      return res.status(400).send({ msg: "Email or password incorrect" });
    }

    // Compare the provided password with the stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      // If passwords do not match, return an error response
      return res.status(400).send({ msg: "Email or password incorrect" });
    }

    // Generate an access token for the authenticated user
    const payload = { id: user._id };
    const secret = process.env.privateKey;
    const options = { expiresIn: 3600 }; // Token expires in 1 hour
    const userToken = jwt.sign(payload, secret, options);

    // Send a success response with the generated token
    res.status(200).send({ msg: "Welcome back", userToken });
  } catch (error) {
    // Send an error response if there was a problem logging in the user
    res.status(500).send({ msg: "Can't login user", error });
  }
};


// Exporting the currentUser function to be used in other parts of the application
export const currentUser = (req, res) => {
    // Send a JSON response with a message and the user information from the request object
    res.send({ msg: "User is authenticated", user: req.user });
  };
  