import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';

const MovieDetail = ({ results }) => {
    const {id} = useParams();
    const [movie, setMovie] = useState(null);
    const apiKey = '5c7ce648';

    useEffect(() => {
        const fetchMovie = async () => {
            try{
               const { data } = await axios.get(`https://www.omdbapi.com/?i=${id}&apikey=${apiKey}`);
            if (data && data.Response !== "False") {
               setMovie(data);
            } else {
                console.error('Movie not found');
            }
        } catch (error) {
                console.log('Error fetching movie data:', error);
            }
        };

        fetchMovie();
    }, [id]);

    if (!movie) return <div>Loading movie details...</div>;


  return (
    <div className='py-10'>
        <Link to={"/movies"}>
         <button 
         className='ml-90 w-25 border rounded-lg mb-4 p-2 justify-center text-xl font-semibold'> 
         ← Back </button>
         </Link>
        <div className='flex  justify-center my-centered-element'>
            <img className=' w-[300px] h-[400px] rounded-xl shadow' src={movie.Poster}/>
            <div className='ml-20'>
            <h1 className='text-2xl font-bold '>{movie.Title}</h1>
            <p className='text-lg'>{movie.Year}</p>
            <p className='text-sm'>{movie.Rated}</p>
            <p className='mb-10 text-sm'>{movie.Runtime}</p>
            <b className='font-bold'>Plot:</b>
            <p className='w-100 text-lg'>{movie.Plot}</p>
            </div>
        </div>
    </div>
  )
}

export default MovieDetail;