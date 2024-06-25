// Import the mongoose library for interacting with MongoDB
import mongoose from "mongoose";

// Destructure the Schema constructor from mongoose for defining the schema structure
const { Schema } = mongoose;

// Define the schema for a movie collection in MongoDB
const movieSchema = new Schema({
    // Title of the movie, stored as a string and is required
  title: { type: String, required: true },
  
  // URL of the movie's image or poster, stored as a string and is required
  image: { type: String, required: true },
  
  // Description or summary of the movie, stored as a string and is required
  description: { type: String, required: true },
  
  // URL of the movie's trailer on YouTube, stored as a string and is required
  youtube: { type: String, required: true },
  
  // URL for downloading the movie, stored as a string and is required
  download: { type: String, required: true },
  
  // URL for watching the movie online, stored as a string and is required
  urlWatching: { type: String, required: true },
  
  // Rating of the movie, stored as a number and is required
  rate: { type: Number, required: true },
  
  // Year of the movie's release, stored as a number and is required
  year: { type: Number, required: true }
});

// Create a model based on the schema defined above
// This will map to a collection named 'movies' in MongoDB
const Movie = mongoose.model("Movie", movieSchema);

// Export the Movie model to use it in other parts of the application
export default Movie;
