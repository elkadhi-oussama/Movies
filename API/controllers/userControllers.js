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
    const { username, email, password, isAdmin, subscribe, paymentId } =
      req.body;

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
      paymentId,
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

// Function to check the current authenticated user
export const currentUser = (req, res) => {
  // Send a JSON response with a message and the user information from the request object
  res.send({ msg: "User is authenticated", user: req.user });
};

// Function to get all users
export const getAllUser = async (req, res) => {
  try {
    // Retrieve all users from the database
    const allUsers = await User.find();
    res.status(200).send({ msg: "All users retrieved", allUsers });
  } catch (error) {
    // Send an error response if there was a problem retrieving users
    res
      .status(500)
      .send({ msg: "Invalid request when retrieving all users", error });
  }
};

// Function to get a single user by ID
export const getOneUser = async (req, res) => {
  try {
    // Extract the user ID from the request parameters
    const idUser = req.params.id;

    // Find the user in the database by its ID
    const oneUser = await User.findById({ _id: idUser });

    // Send a success response if the user is found, or an appropriate message if not found
    oneUser
      ? res.status(200).send({ msg: "User found", oneUser })
      : res.status(200).send({ msg: "User not found" });
  } catch (error) {
    // Send an error response if there was a problem retrieving the user
    res
      .status(500)
      .send({ msg: "Invalid request when retrieving one user", error });
  }
};

// Function to delete a single user by ID
export const deleteOneUser = async (req, res) => {
  try {
    // Extract the user ID from the request parameters
    const idUser = req.params.id;

    // Delete the user from the database by its ID
    const userDel = await User.deleteOne({ _id: idUser });

    // Send a success response if the user is deleted, or an appropriate message if it was already deleted
    userDel.deletedCount
      ? res.status(200).send({ msg: "User deleted" })
      : res.status(200).send({ msg: "User already deleted" });
  } catch (error) {
    // Send an error response if there was a problem deleting the user
    res
      .status(500)
      .send({ msg: "Invalid request when trying to delete user", error });
  }
};

// Function to update a single user by ID
export const updateOneUser = async (req, res) => {
  try {
    let updateUser;
    const oneUser = await User.findById({ _id: req.body._id });

    if (oneUser.password === req.body.password) {
      // If the password in the request body matches the user's current password
      updateUser = await User.updateOne(
        { _id: req.params.id }, // Filter to find the user by ID
        { $set: req.body } // Update the user with the new data from the request body
      );
    } else {
      let hashedPassword; // Variable to store the hashed password
      if (req.body.password) {
        const saltRounds = 10; // Number of rounds for salting the password
        const salt = await bcrypt.genSalt(saltRounds); // Generate a salt
        hashedPassword = await bcrypt.hash(req.body.password, salt); // Hash the new password with the generated salt
      }
      // Update the user in the database with the new data, including the hashed password if provided
      updateUser = await User.updateOne(
        { _id: req.params.id }, // Filter to find the user by ID
        { $set: { ...req.body, password: hashedPassword } } // Update the user data, including the new hashed password
      );
    }

    // Send a success response if the user is updated, or an appropriate message if it was already updated
    updateUser.modifiedCount
      ? res.status(200).send({ msg: "User updated" })
      : res.status(200).send({ msg: "User already updated" });
  } catch (error) {
    // Send an error response if there was a problem updating the user
    res.status(500).send({ msg: "Invalid request", error });
  }
};
