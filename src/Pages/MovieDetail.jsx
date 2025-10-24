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

    if (!movie) return <div className='my-centered-element text-center text-3xl font-serif'>Loading movie details...</div>;


  return (
    <div className='py-10'>
        <Link to={"/movies"}>
         <button id='back__btn' 
         className='ml-82 w-25 border rounded-lg mb-4 p-2 justify-center text-xl font-semibold'> 
         ← Back </button>
         </Link>
        <div id='movie__detail--container' className='flex justify-center my-centered-element'>
            <img id='movie__detail--img' className=' w-[380px] h-[520px] rounded-xl shadow' src={movie.Poster}/>
            <div className='ml-20'>
            <h1 id='movie__detail--title' className='text-4xl font-bold text-wrap w-106'>{movie.Title}</h1>
            <p className='text-lg'>{movie.Year}</p>
            <p className='text-md'>{movie.Rated}</p>
            <p className='mb-10 text-md'>{movie.Runtime}</p>
            <b className='font-bold text-lg'>Plot:</b>
            <p id='movie__detail--plot' className='w-100 text-xl'>{movie.Plot}</p>
            </div>
        </div>
    </div>
  )
}

export default MovieDetail;