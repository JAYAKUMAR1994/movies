import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';

interface MovieData {
  id: number;
  title: string;
  overview: string;
  release_date: string;
  poster_path: string;
}

const MovieDetails: React.FC = () => {
  const [movie, setMovie] = useState<MovieData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}?language=en-US`,
          {
            headers: {
              accept: 'application/json',
              Authorization:
                'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlYWRlZTQ5NGExMjViNWI2MTdhN2UzZjA3ZmZiNGViYyIsInN1YiI6IjY1ODQxMTUyOTkyZmU2M2UzNjcyZDM0NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.rSK1Ua3lbl_uqJ4YeAkf6py_oQDYxyQZU0_9Nz7J-nY',
            },
          }
        );

        setMovie(response.data);
      } catch (error) {
        console.error('Error fetching movie details:', error);
        setError(error as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

  return (
    <div className="container mx-auto p-4">
      <Link to="/" className="text-blue-500 hover:underline">
        &larr; Back to Homepage
      </Link>

      {loading ? (
        
        <div className="animate-pulse mt-8">
          <div className="bg-gray-300 h-4 w-full mb-4"></div>
          <div className="bg-gray-300 h-32 w-full"></div>
          <div className="bg-gray-300 h-4 w-2/3 mt-4"></div>
          <div className="bg-gray-300 h-4 w-full mt-2"></div>
        </div>
      ) : movie ? (
        <div className="mt-8">
        <img
          className="w-full h-60 object-fit rounded-md shadow-md mb-4"
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
        />
        <div className="bg-gray-800 p-6 rounded-md shadow-md">
          <h1 className="text-4xl font-bold mb-2">{movie.title}</h1>
          <p className="text-gray-600 text-sm mb-4">{movie.release_date}</p>
          <p className="text-white text-lg font-bold mb-2">Overview:</p>
          <p className="text-white text-sm">{movie.overview}</p>
         
        </div>
      </div>
      ) : error ? (
        <p className="text-red-500 mt-8">Error fetching movie details: {error.message}</p>
      ) : (
        <p className="text-gray-600 mt-8">No movie details found.</p>
      )}
    </div>
  );
};

export default MovieDetails;


