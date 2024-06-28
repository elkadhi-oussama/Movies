import "bootstrap/dist/css/bootstrap.min.css";
import MovieList from "./components/PartMovies/MovieList";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import NavbarApp from "./components/NavbarApp";
import HomePage from "./Pages/HomePage";
import { useDispatch, useSelector } from "react-redux";
import { getMovies } from "./Redux/Slice/movieSlice";
import { useEffect } from "react";
import axios from "axios";
import RegisterUser from "./components/PartUser/RegisterUser";
import LoginUser from "./components/PartUser/LoginUser";
import { addUser } from "./Redux/Slice/userSlice";
import OneMovie from "./components/PartMovies/OneMovie";
import Profile from "./components/PartUser/Profile";
function App() {
  const dispatch = useDispatch();
  const changeState = useSelector((state) => state.change.value);
  const user = useSelector((state) => state.user.value);
  useEffect(() => {
    const getAllMovies = async () => {
      try {
        const res = await axios.get(
          "https://movies-application-api.vercel.app/movie/getAllMovie"
        );
        dispatch(getMovies(res.data.getAllMovie));
      } catch (error) {
        console.log(
          "we have some error when trying to get all movies : ",
          error
        );
      }
    };
    getAllMovies();
  }, []);
  const auth = localStorage.getItem("auth");
  // get current user
  useEffect(() => {
    const getCurrentUser = async () => {
      try {
        const result = await axios.get(
          "https://movies-application-api.vercel.app/user/current",
          {
            headers: { auth: auth },
          }
        );
        dispatch(addUser(result.data.user));
      } catch (err) {
        console.error(err);
      }
    };
    auth && getCurrentUser();
  }, [changeState]);
  // end current
  return (
    <div>
      <NavbarApp />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/movie" element={<MovieList />} />
        <Route path="/register" element={<RegisterUser />} />
        <Route path="/login" element={<LoginUser />} />
        {user.email ? (
          <>
            <Route path="/movie/:id" element={<OneMovie />} />
            <Route path="/profile" element={<Profile />} />
          </>
        ) : (
          <Route path="/login" element={<LoginUser />} />
        )}
        <Route path="*" element={<LoginUser />} />
      </Routes>
    </div>
  );
}

export default App;
