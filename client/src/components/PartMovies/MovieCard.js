import React from "react";
import "./MovieCard.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const MovieCard = ({ movie }) => {
  const user = useSelector((state) => state.user.value);
  return (
    <div>
      <Link to={user.email ? `/movie/${movie._id}` : "/login"}>
        <div className="cardFree">
          <img src={movie.image} alt="" />
          <div className="descriptionsFree">
            <h1> {movie.title} </h1>
            <p>{movie.description}</p>
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
