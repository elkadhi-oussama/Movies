// Import the Movie model from the models directory
import Movie from "../models/Movie.js";

// Function to add a new movie to the database
export const addNewMovie = async (req, res) => {
  try {
    // Create a new Movie instance with the data from the request body
    const newMovie = new Movie(req.body);
    
    // Save the new movie to the database
    await newMovie.save();
    
    // Send a success response with the new movie data
    res.status(200).send({ msg: "Movie Added Successfully", newMovie });
  } catch (error) {
    // Send an error response if the request fails
    res.status(500).send({ msg: "Invalid request when adding new movie", error });
  }
};

// Function to get all movies from the database
export const getAllMovie = async (req, res) => {
  try {
    // Retrieve all movies from the database
    const getAllMovie = await Movie.find();
    
    // Send a success response with the retrieved movies
    res.status(200).send({ msg: "All movies retrieved", getAllMovie });
  } catch (error) {
    // Send an error response if the request fails
    res.status(500).send({ msg: "Invalid request when retrieving all movies", error });
  }
};

// Function to get a specific movie by its ID
export const getOneMovie = async (req, res) => {
  try {
    // Extract the movie ID from the request parameters
    const idMovie = req.params.id;
    
    // Find the movie in the database by its ID
    const oneMovie = await Movie.findById({ _id: idMovie });
    
    // Send a success response if the movie is found, or an appropriate message if not found
    oneMovie
      ? res.status(200).send({ msg: "Movie found", oneMovie })
      : res.status(200).send({ msg: "Movie not found" });
  } catch (error) {
    // Send an error response if the request fails
    res.status(500).send({ msg: "Invalid request when retrieving one movie", error });
  }
};

// Function to delete a specific movie by its ID
export const deleteOneMovie = async (req, res) => {
  try {
    // Extract the movie ID from the request parameters
    const idMovie = req.params.id;
    
    // Delete the movie from the database by its ID
    const movieDel = await Movie.deleteOne({ _id: idMovie });
    
    // Send a success response if the movie is deleted, or an appropriate message if it was already deleted
    movieDel.deletedCount
      ? res.status(200).send({ msg: "Movie deleted" })
      : res.status(200).send({ msg: "Movie already deleted" });
  } catch (error) {
    // Send an error response if the request fails
    res.status(500).send({ msg: "Invalid request when trying to delete movie", error });
  }
};

// Function to update a specific movie by its ID
export const updateOneMovie = async (req, res) => {
  try {
    // Update the movie in the database with the data from the request body
    const updateMovie = await Movie.updateOne(
      { _id: req.params.id },
      { $set: req.body }
    );
    
    // Send a success response if the movie is updated, or an appropriate message if it was already updated
    updateMovie.modifiedCount
      ? res.status(200).send({ msg: "Movie updated" })
      : res.status(200).send({ msg: "Movie already updated" });
  } catch (error) {
    // Send an error response if the request fails
    res.status(500).send({ msg: "Invalid request", error });
  }
};
