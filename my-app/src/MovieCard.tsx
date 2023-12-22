import React from 'react';
import { Link } from 'react-router-dom';


interface MovieData {
    id: number;
    title: string;
    release_date: string;
    poster_path: string;
    genre_ids: number[];
  }

interface MovieCardProps {
  movie: MovieData;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  return (
    <div className="max-w-xs rounded shadow-lg m-2">
      <Link to={`/movie/${movie.id}`}>
        <img
          className="w-full h-32 object-fill"
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
        />
      </Link>
      <p className="text-lg font-bold">{movie.title}</p>
      <p className="text-sm">{movie.release_date}</p>
    </div>
  );
};

export default MovieCard;
