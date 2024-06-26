import axios from "axios";
import React, { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import "./OneMovie.css";
import { useDispatch, useSelector } from "react-redux";
import { changeEtat } from "../../Redux/Slice/changeStateSlice";

const OneMovie = () => {
  const idMovie = useParams().id;
  const [oneMovie, setoneMovie] = useState({});

  const user = useSelector((state) => state.user.value);
  const dispatch = useDispatch();

  useEffect(() => {
    const getOneMovie = async () => {
      await axios
        .get(
          "https://movies-application-api.vercel.app/movie/getOneMovie/" +
            idMovie
        )
        .then((result) => setoneMovie(result.data.oneMovie))
        .catch((err) =>
          console.log("this error coming when i try to get one movie : ", err)
        );
    };
    getOneMovie();
  }, []);
  //update user for subscribe
  const updateUserForCheckPayment = async (condition) => {
    await axios.put(
      `https://movies-application-api.vercel.app/user/updateOneUser/${user._id}`,
      { ...user, subscribe: condition }
    );
    dispatch(changeEtat());
  };

  const checkPayment = async (payment_id) => {
    await axios
      .post(
        `https://movies-application-api.vercel.app/payment/verify/${payment_id}`
      )
      .then((result) =>
        result.data === "SUCCESS"
          ? updateUserForCheckPayment(true)
          : updateUserForCheckPayment(false)
      )
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    checkPayment(user.paymentId);
  }, []);
  //end

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
                  <a
                    target="_blank"
                    href={oneMovie.urlWatching}
                    className="href"
                  >
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
            {user.subscribe ? (
              <iframe
                id="video"
                className="videoMov"
                src={oneMovie.youtube}
              ></iframe>
            ) : (
              <h1 className="h1Payement">
                {" "}
                You need to payment for see the movie{" "}
                <span>
                  {" "}
                  <Link to={"/profile"}> click here to make payment </Link>{" "}
                </span>{" "}
              </h1>
            )}
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
