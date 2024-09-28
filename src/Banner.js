import axios from "axios";
import React, { useEffect, useState } from "react";
import "./Banner.css";
import requests from "./requests";

function Banner() {
  const [movie, setmMovie] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(
        "https://api.themoviedb.org/3" + requests.fetchActionMovies
      );

      setmMovie(
        request.data.results[
          Math.floor(Math.random() * request.data.results.length - 1)
        ]
      );
      return request;
    }

    fetchData();
  }, []);


  //image base url
  const baseUrl = "https://image.tmdb.org/t/p/original/";

  //limit description
  function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  }

  return (
    <header
      className="banner"
      style={{
        backgroundSize: "cover",
        backgroundImage: `url(${baseUrl}${movie?.backdrop_path})`,
        backgroundPosition: "center center",
      }}
    >
      <div className="banner_contents">
        {/* title  */}
        <h1 className="banner_title">
          {movie?.title || movie?.name || movie?.original_name}
        </h1>

        {/* //banner button  */}
        <div className="banner_buttons">
          <button className="banner_button">Play</button>
          <button className="banner_button">My List</button>
        </div>

        {/* discription  */}
        <h1 className="banner_description">{truncate(movie?.overview, 150)}</h1>
      </div>

      <div className="banner_fadebottom"></div>
    </header>
  );
}

export default Banner;
