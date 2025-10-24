import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import movieLogo from "../assets/movie warehouse.png";
import couch from "../assets/undraw_home-cinema_jdm1 (2).svg";
import { FaMagnifyingGlass } from "react-icons/fa6";

const Landing = () => {
    const [movies, setMovies] = useState([]);

    
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();
    const [isSpinning, setIsSpinning] = useState(false);

    const handleSearch = async () => {
        setIsSpinning(true);
        if(!searchTerm)return;
        const apiKey = '5c7ce648';

        try {
            const { data } = await axios.get(
            `https://www.omdbapi.com/?s=${searchTerm}&apikey=${apiKey}`
            );
            setMovies(data.Search);
        setTimeout(() => {
            navigate('/movies', {state: {movies: data.Search, searchTerm} });
            setIsSpinning(false);
        }, 1000);

        } catch (error) {
            console.error('Error fetching movies:', error);
            setIsSpinning(false);
        }
    };



return(
        <>
        
            <div className="flex justify-between my-centered-element pt-4 max-w-[1300px]">
                <figure className="w-60 p-2">
                 <img src={movieLogo} alt="" className="w-30 rounded-full glow-shadow mx-20 mt-5"/>
                </figure>
               <div className='p-10 mx-16'>
                <button className=' cursor-not-allowed bg-green-700 text-[24px] glow-shadow font-bold px-6 py-1.5 rounded-3xl'>Contact us</button>
               </div>  
                </div>                    
                <div className="text-[92px] font-bold text-center white-shadow font-serif text-stroke-white">
                    Movie Warehouse
                </div>
                 <div>
                <div className="font-bold text-center">
                    <p className="text-2xl font-semibold text-shadow mb-4">Search for any movie!</p>
                </div>
                <div className=" flex items-center justify-center">
                <input 
                className="pr-50 border p-2.5 mr-2 border-green-600 rounded-2xl text-lg shadow" 
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
               className="bg-green-700 text-[24px] items-center font-bold px-10 py-3.5 border-white rounded-2xl shadow hover:bg-amber-600"
               aria-label='Search for movies'
               onClick={handleSearch}
                >
                <FaMagnifyingGlass className={`transition-transform duration-200 ${isSpinning ? 'animate-spin' : ""}`}/>
                </button>
                
                </div>
                </div>
                <div>
                    <img className="pt-4 my-centered-element h-80" src={couch} alt="" />
                </div>
            </>
        );
    }

export default Landing;