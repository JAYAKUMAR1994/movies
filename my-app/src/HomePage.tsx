import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSpring, animated } from 'react-spring';
import MovieCard from './MovieCard';

interface MovieData {
  id: number;
  title: string;
  release_date: string;
  poster_path: string;
  genre_ids: number[];
}

const HomePage: React.FC = () => {
  const [data, setData] = useState<MovieData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [selectedGenre, setSelectedGenre] = useState<number | null>(null);
  const [genres, setGenres] = useState<any[]>([]);
  const [filterData, setFilterData] = useState<MovieData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/popular?language=en-US&page=${currentPage}`,
          {
            headers: {
              accept: 'application/json',
              Authorization:
                'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlYWRlZTQ5NGExMjViNWI2MTdhN2UzZjA3ZmZiNGViYyIsInN1YiI6IjY1ODQxMTUyOTkyZmU2M2UzNjcyZDM0NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.rSK1Ua3lbl_uqJ4YeAkf6py_oQDYxyQZU0_9Nz7J-nY',
            },
          }
        );

        setData(response.data.results);
        setTotalPages(response.data.total_pages);
        setFilterData(response.data.results);

    
         const genresResponse = await axios.get(
            'https://api.themoviedb.org/3/genre/movie/list?language=en-US',
            {
              headers: {
                accept: 'application/json',
                Authorization:
                  'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlYWRlZTQ5NGExMjViNWI2MTdhN2UzZjA3ZmZiNGViYyIsInN1YiI6IjY1ODQxMTUyOTkyZmU2M2UzNjcyZDM0NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.rSK1Ua3lbl_uqJ4YeAkf6py_oQDYxyQZU0_9Nz7J-nY',
              },
            }
          );
  
        
          setGenres(genresResponse.data.genres);

      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [currentPage]);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };



const handleSearch = async () => {
    try {
      let apiUrl = 'https://api.themoviedb.org/3/movie/popular?language=en-US&page=1';
  
      if (searchQuery.trim() !== '') {
        apiUrl = `https://api.themoviedb.org/3/search/movie?language=en-US&page=1&query=${searchQuery}`;
      }
  
      const response = await axios.get(apiUrl, {
        headers: {
          accept: 'application/json',
          Authorization:
            'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlYWRlZTQ5NGExMjViNWI2MTdhN2UzZjA3ZmZiNGViYyIsInN1YiI6IjY1ODQxMTUyOTkyZmU2M2UzNjcyZDM0NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.rSK1Ua3lbl_uqJ4YeAkf6py_oQDYxyQZU0_9Nz7J-nY',
        },
      });
  
      setData(response.data.results);
      setTotalPages(response.data.total_pages);
      setFilterData(response.data.results);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError(error as Error);
    }
  };
  
   

  useEffect(() => {
    if (selectedGenre === null) {
      setFilterData(data);
    }
    if (selectedGenre !== null) { 
      setFilterData( data.filter((movie) => movie.genre_ids.includes(selectedGenre)));
    } 
  }, [selectedGenre]);
  
  const props = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    config: { duration: 1000 },
  });

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Popular Movies</h1>

{/*searchbar */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search for movies..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full p-2 border mb-2"
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded ml-2"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>

{/*filter */}
  <div className="mb-4 ">
  <label>
        Select Genre:
        <select
          value={selectedGenre || ''}
          onChange={(e) => setSelectedGenre(e.target.value ? Number(e.target.value) : null)}
          className='border border-black'
        >
          <option value="">All Genres</option>
          {genres.map((genre) => (
            <option key={genre.id} value={genre.id}>
              {genre.name}
            </option>
          ))}
        </select>
      </label>
      </div>

      {/*movielist */}
      <animated.div style={props}>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-around">
        {loading ?(
             Array.from({ length: 8 }, (_, index) => (
                <div className="animate-pulse max-w-xs rounded shadow-lg m-2" key={index}>
                  <div className="bg-gray-300 h-32 w-full"></div>
                  <div className="bg-gray-300 h-4 w-2/3 mt-2"></div>
                  <div className="bg-gray-300 h-4 w-full mt-2"></div>
                </div>
              ))
        ):filterData.length > 0 ? (
          
          filterData.map((item) => (
            <MovieCard key={item.id} movie={item} />
          ))
        ) : error ? (
          <p>Error fetching data: {error.message}</p>
        ) : (
          <p>No results found.</p>
        )}
      </div>
      </animated.div>

{/*pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-4">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
          >
            Previous
          </button>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            disabled={currentPage === totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default HomePage;

