import React from "react";
import "./MovieCard.css";

const MovieCard = ({ movie }) => {
  return (
    <div>
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
    </div>
  );
};

export default MovieCard;
