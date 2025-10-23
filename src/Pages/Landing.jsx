import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import movieLogo from "../assets/movie warehouse.png";
import couch from "../assets/undraw_home-cinema_jdm1 (2).svg";
import { FaMagnifyingGlass } from "react-icons/fa6";

const Landing = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [movies, setMovies] = useState([]);
    const navigate = useNavigate();

    const handleSearch = async () => {
        if(!searchTerm)return;
        const apiKey = '5c7ce648';
        try {
            const { data } = await axios.get(
            `https://www.omdbapi.com/?s=${searchTerm}&apikey=${apiKey}`
            );
            setMovies(data.Search);
            navigate('/movies', {state: {movies: data.Search, searchTerm} });
        } catch (error) {
            console.error('Error fetching movies:', error);
        }
    };



return(
        <>
            <div className=" flex justify-between my-centered-element pt-4 max-w-[1300px]">
                <figure className="w-60 p-2">
                 <img src={movieLogo} alt="" className="w-30 rounded-full shadow mx-20 mt-5"/>
                </figure>
               <div className='p-10 mx-16'>
                <Link to="/movies">
                    <b className='mr-8 text-white font-serif'>Find your movie</b>
                </Link>
                <button className='bg-green-800 text-[24px] font-bold px-6 py-1.5 rounded-3xl'>Contact us</button>
               </div>
            </div>
             <div>
                <div className="text-[92px] font-bold text-center text-shadow font-serif text-stroke-white">
                    Movie Warehouse
                </div>
                <div className="font-bold text-center">
                    <p className="text-2xl font-semibold text-shadow mb-4">Search for any movie!</p>
                </div>
                <div className=" flex items-center justify-center">
                <input 
                className="pr-50 border p-2.5 mr-2 border-green-700 rounded-2xl text-lg shadow" 
                type="text"
                placeholder="Search for a movie"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                onKeyDown={(event) => {
                    if(event.key === 'Enter') {
                     handleSearch();
                    }
                 }}
                />                
               <button 
               className="bg-green-800 text-[24px] items-center font-bold px-10 py-3.5 border-white rounded-2xl shadow"
               aria-label='Search for movies'
               onClick={handleSearch}
                >
                <FaMagnifyingGlass/>
                </button>
                
                </div>
                </div>
                <div>
                    <img className="pt-4 my-centered-element h-110" src={couch} alt="" />
                </div>
            </>
        );
    }

export default Landing;