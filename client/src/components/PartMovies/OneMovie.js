import axios from "axios";
import React, { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { useParams } from "react-router-dom";
import "./OneMovie.css";

const OneMovie = () => {
  const idMovie = useParams().id;
  const [oneMovie, setoneMovie] = useState({});

  const getOneMovie = async () => {
    await axios
      .get(
        "https://movies-application-api.vercel.app/movie/getOneMovie/" + idMovie
      )
      .then((result) => setoneMovie(result.data.oneMovie))
      .catch((err) =>
        console.log("this error coming when i try to get one movie : ", err)
      );
  };
  useEffect(() => {
    getOneMovie();
  }, []);

  return (
    <div>
      {oneMovie ? (
        <>
        <div className="allCardsMov">
      <div className="divWatchMovie">
        <img src={oneMovie.image} alt="" />
        <div className="contWatch">
          <h1> Title : {oneMovie.title}</h1>
          <p>{oneMovie.description}</p>
          <div className="genreMov">
            <span>Year</span>
            <p> {oneMovie.year} </p>
          </div>
          <div className="rateMov">
            <span>Rate</span>
            <p> {oneMovie.rate} </p>
          </div>
        </div>
        <div className="btnMov">
          <button>
          <a target="_blank" href={oneMovie.urlWatching} className="href">
              Watch Now
            </a>
          </button>
          <button>
            <a target="_blank" href={oneMovie.download} className="href">
              Download
            </a>
          </button>
        </div>
      </div>
      <iframe
        id="video"
        className="videoMov"
        src={oneMovie.youtube}
      ></iframe>
    </div>
        </>
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

export default OneMovie;
