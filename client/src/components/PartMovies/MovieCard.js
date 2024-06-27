import React from "react";
import "./MovieCard.css";
import { Link } from "react-router-dom";

const MovieCard = ({ movie }) => {
  return (
    <div>
      <Link to={`/movie/${movie._id}`} >
        <div className="cardFree">
          <img src={movie.image} alt="" />
          <div className="descriptionsFree">
            <h1> {movie.title} </h1>
            <p>
             {movie.description}
            </p>
            <button>
              <i className="fab fa-youtube"></i>
              Play trailer on YouTube
            </button>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default MovieCard;
