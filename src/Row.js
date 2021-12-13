import axios from "axios";
import React, { useEffect, useState } from "react";
import YouTube from "react-youtube";
import "./Row.css";
import movieTrailer from "movie-trailer";

function Row({ title, fetchUrl, isLargeRow }) {
  const [movies, setMovies] = useState([]); //initial value is empty array
  const [trailerUrl, setTrailerUrl] = useState("");

  //a snippets of code which runs based on a specific condition/variables
  useEffect(() => {
    //fetch api data and load on screen
    //if [],run once when the row loads,and don't run again
    async function fetchData() {
      const request = await axios.get(
        "https://api.themoviedb.org/3" + fetchUrl
      ); //https://api.themoviedb.org/3//discover/movie?api_key=${API_KEY}&with_genres=99
      // console.log(request.data.results);
      setMovies(request.data.results);
      return request;
    }
    fetchData();
  }, [fetchUrl]);

  console.table(movies);

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

  const handleClick = (movie) => {
    if (trailerUrl) {
      setTrailerUrl("");
    } else {
      movieTrailer(movie?.name || "")
        .then((url) => {
          const urlParams = new URLSearchParams(new URL(url).search);
          setTrailerUrl(urlParams.get("v"));
        })
        .catch((error) => console.log(error));
    }
  };

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
            className={`row_poster ${isLargeRow && "row_posterLarge"}`}
          />
        ))}
      </div>
      {/* //trailer popup */}
      {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
    </div>
  );
}

export default Row;
