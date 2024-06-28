import React, { useEffect } from "react";
import MovieCard from "./MovieCard";

import { Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { changeEtat } from "../../Redux/Slice/changeStateSlice";

const MovieList = () => {
  const movies = useSelector((state) => state.movie.value);
  const user = useSelector((state) => state.user.value);
  const dispatch = useDispatch()
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
  console.log("in Comp movieList : ", user)
  //end 

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
