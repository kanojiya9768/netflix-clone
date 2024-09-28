import axios from "axios";
import movieTrailer from "movie-trailer";
import React, { memo, useEffect, useState } from "react";
import YouTube from "react-youtube";
import "./Row.css";

function Row({ title, fetchUrl, isLargeRow }) {
  const [movies, setMovies] = useState([]); //initial value is empty array
  const [trailerUrl, setTrailerUrl] = useState({id : ""});

  //a snippets of code which runs based on a specific condition/variables
  useEffect(() => {
    //fetch api data and load on screen
    //if [],run once when the row loads,and don't run again
    (async function fetchData() {
      const request = await axios.get(
        "https://api.themoviedb.org/3" + fetchUrl
      );
      setMovies(request.data.results);
    })();
  }, [fetchUrl]);

  //base url for image
  const baseUrl = "https://image.tmdb.org/t/p/original/";

  // trailer movie setup
  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };

  const handleClick = async (movie) => {
    let res = await movieTrailer(movie?.name || movie?.title || "");
    setTrailerUrl((prev)=>{
      return{
        ...prev,
        id : ""
      }
    });
    setTrailerUrl((prev)=>{
      return{
        ...prev,
        id : res?.split("v=")[1]
      }
    });
  };

  console.log(trailerUrl);
  

  return (
    <div className="row">
      <h2>{title}</h2>

      <div className="row_posters">
        {/* row posters */}
        {movies.map((movie) => (
          <img
            src={`${baseUrl}${
              isLargeRow ? movie.poster_path : movie.backdrop_path
            }`}
            alt={movie.title}
            key={movie.id}
            onClick={() => handleClick(movie)}
            className={`row_poster  ${isLargeRow && "row_posterLarge"}`}
          />
        ))}
      </div>
      {/* //trailer popup */}
      {trailerUrl?.id && <YouTube videoId={trailerUrl?.id} opts={opts} />}
    </div>
  );
}

export default memo(Row);
