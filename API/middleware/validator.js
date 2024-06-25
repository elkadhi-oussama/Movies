// Import check and validationResult functions from express-validator
import { check, validationResult } from "express-validator";

// Function to validate the fields of a movie object
export const validateMovie = () => {
  return [
    // Check if the 'title' field is not empty
    check("title", "You forgot to put the title of the movie").not().isEmpty(),
    
    // Check if the 'image' field is not empty
    check("image", "You forgot to put the image of the movie").not().isEmpty(),
    
    // Check if the 'description' field is not empty
    check("description", "You forgot to put the description of the movie").not().isEmpty(),
    
    // Check if the 'youtube' field is not empty
    check("youtube", "You forgot to put the URL trailer of the movie").not().isEmpty(),
    
    // Check if the 'download' field is not empty
    check("download", "You forgot to put the URL for downloading the movie").not().isEmpty(),
    
    // Check if the 'urlWatching' field is not empty
    check("urlWatching", "You forgot to put the URL for watching the movie").not().isEmpty(),
    
    // Check if the 'rate' field is not empty
    check("rate", "You forgot to put the rate of the movie").not().isEmpty(),
    
    // Check if the 'year' field is not empty
    check("year", "You forgot to put the year of the movie").not().isEmpty(),
  ];
};

// Middleware function to handle validation results
export const validation = (req, res, next) => {
  // Extract validation errors from the request
  const errors = validationResult(req);

  // Check if there are any validation errors
  if (errors.array().length > 0) {
    // If there are errors, return a 400 status with the error messages
    return res
      .status(400)
      .json({ errors: errors.array().map((error) => error.msg) });
  }

  // If there are no errors, proceed to the next middleware or route handler
  next();
};
