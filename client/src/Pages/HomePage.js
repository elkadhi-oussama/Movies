import React from "react";
import { Carousel, Spinner } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const HomePage = () => {
  const movies = useSelector((state) => state.movie.value);
  
  return (
    <div className="carouselCSS">
      <Carousel data-bs-theme="light">
        { movies ? (movies.map((movie) => (
          <Carousel.Item key={movie._id}>
          <Link to={"/movie"} >
            <img
              className="d-block w-100"
              src={movie.image}
              alt="First slide"
            />
            </Link>
            <Carousel.Caption>
              <h1> {movie.title} </h1>
            </Carousel.Caption>
          </Carousel.Item>
        ))) : 
        <>
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </>
          
        }
      </Carousel>
    </div>
  );
};

export default HomePage;
