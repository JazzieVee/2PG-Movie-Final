import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const MovieDetail = ({results}) => {
    let navigate = useNavigate();
    const {id} = useParams();
    const [movie, setMovie] = useState(null);
    const apiKey = '5c7ce648';

    useEffect(() => {
        const fetchMovie = async () => {
            try{
               const { data } = await axios.get(`https://www.omdbapi.com/?i=${id}&apikey=${apiKey}`);
               setMovie(data);
            } catch (error) {
                console.log('Error fetching movie data:', error);
            }
        };

        fetchMovie();
    }, [id]);

    if (!movie) return <div>Loading...</div>;


  return (
    <div className='py-10'>
         <button onClick = {() => navigate("/movies", {state: {movies: results}})}
         className='ml-90 w-25 border rounded-lg mb-4 p-2 justify-center text-xl font-semibold'> ← Back </button>
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