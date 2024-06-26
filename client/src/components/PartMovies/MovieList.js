import React, { useEffect, useState } from 'react'
import MovieCard from './MovieCard'
import axios from "axios"
const MovieList = () => {
  const [movies, setmovies] = useState([])
  useEffect(() => {
  const getAllMovies = async ()=>{
    try {
     const res = await axios.get("https://movies-application-api.vercel.app/movie/getAllMovie")
     console.log(res)
    } catch (error) {
      console.log("we have some error when trying to get all movies : ", error)
    }
  }  
  getAllMovies()
  
  }, [])
  
  return (
    <div>
        <MovieCard />
    </div>
  )
}

export default MovieList