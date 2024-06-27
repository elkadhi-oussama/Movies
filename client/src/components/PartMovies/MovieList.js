import React from "react";
import MovieCard from "./MovieCard";

import { Spinner } from "react-bootstrap";
import { useSelector } from "react-redux";

const MovieList = () => {
  const movies = useSelector((state) => state.movie.value);
  const user = useSelector((state) => state.user.value);
  const payment = useSelector(state=>state.payment.value)

  console.log("user ", user)

  console.log("payment ", payment)

  return (
    <div className="wrapperFree">
      {movies ? (
        movies.map((movie) => <MovieCard movie={movie} key={movie._id} />)
      ) : (
        <>
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </>
      )}
    </div>
  );
};

export default MovieList;
