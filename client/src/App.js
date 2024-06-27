import "bootstrap/dist/css/bootstrap.min.css";
import MovieList from "./components/PartMovies/MovieList";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import NavbarApp from "./components/NavbarApp";
import HomePage from "./Pages/HomePage";
import { useDispatch } from "react-redux";
import { getMovies } from "./Redux/Slice/movieSlice";
import { useEffect } from "react";
import axios from "axios";
import RegisterUser from "./components/PartUser/RegisterUser";
import LoginUser from "./components/PartUser/LoginUser";
function App() {
  const dispatch = useDispatch();
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

  // get current user
  // useEffect(() => {
  //   const getCurrentUser = async () => {
  //     try {
  //       const result = await axios.get("https://movies-application-api.vercel.app/user/current", {
  //         headers: { auth: localStorage.getItem("auth") },
  //       });
  //       console.log(result)
        
  //     } catch (err) {
  //       console.error(err);
  //     }
  //   };
  //   getCurrentUser();
  // }, []);
  // end current
  return (
    <div>
      <NavbarApp />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/movie" element={<MovieList />} />
        <Route path="/register" element={<RegisterUser />} />
        <Route path="/login" element={<LoginUser />} />
      </Routes>
    </div>
  );
}

export default App;
