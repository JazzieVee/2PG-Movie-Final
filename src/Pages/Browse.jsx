import React, { useState, useEffect } from 'react';
import movieLogo from "../assets/movie warehouse.png";
import { FaMagnifyingGlass } from 'react-icons/fa6';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';


const Browse = () => {
    const location = useLocation();
    const movies = location.state?.movies || [];
    const initialSearchTerm = location.state?.searchTerm || "";

    const [searchTerm, setSearchTerm] = useState(initialSearchTerm);
    const [filteredMovies, setFilteredMovies] = useState(movies);
    const [sortOption, setSortOption] = useState(''); 
    const [loading, setLoading] = useState(false);
    const [isSpinning, setIsSpinning] = useState(false);

    useEffect(() => {
    const fetchMovies = async() => {
        if (!searchTerm) return;
        const apiKey = '5c7ce648';
        setLoading(true);
        setIsSpinning(true);
        try{
         const response = await axios.get(`https://www.omdbapi.com/?s=${searchTerm}&apikey=${apiKey}`);
         setFilteredMovies(response.data.Search.slice(0,6) || []);
        } catch(error) {
            console.error('Error fetching movies:', error);
        } finally {          
            setLoading(false);
            setIsSpinning(false);
      }
    };

    fetchMovies();
    },[searchTerm]);
    
        
    useEffect(() => { 
        let results = [...filteredMovies];

        if (sortOption === 'A_to_Z') {
            results.sort((a, b) => a.Title.localeCompare(b.Title));
        } else if (sortOption === 'Z_to_A') {
            results.sort((a, b) => b.Title.localeCompare(a.Title));
        } else if (sortOption === 'Year') {
            results.sort((a, b) => b.Year - a.Year); 
        } 

    setFilteredMovies(results);    
    },[sortOption]);

    const handleChange = (event) => {
            setSearchTerm(event.target.value);
            setIsSpinning(true);
        };


  return (
    <>
        <div className=" flex justify-between my-centered-element h-30 pt-4 max-w-[1300px]">
            <figure className="w-60 p-2">
                <img src={movieLogo} alt="" className="w-30 rounded-full shadow mx-20 mt-5 glow-shadow" />
            </figure>
            <div className='p-10 mx-16'>
                <Link to="/">
                <b className='mr-8 cursor-pointer text-xl text-white underline white-shadow font-serif'>HOME</b>
                </Link>
                <button className='bg-green-700 text-[24px] glow-shadow cursor-not-allowed font-bold px-6 py-1.5 rounded-3xl'>Contact us</button>
               </div>
        </div>
        <div>
            <div className="text-[52px] mb-8 font-bold text-center white-shadow font-serif text-stroke-white">
                Browse our Library
            </div>
            <div className=" flex items-center justify-center">
                <input 
                className="pr-50 bg-white absolute border p-3 border-green-700 rounded-3xl text-lg glow-shadow" 
                type="text"
                placeholder="Search for a movie"
                value={searchTerm}
                onChange={handleChange}    
                 />
                <button
                className='relative left-44 bg-transparent border-none cursor-pointer'>                       
            <FaMagnifyingGlass className={`transition-transform duration-200 ${isSpinning ? 'animate-spin' : ''}`} />
                </button>                        
            </div>
        </div>
        <div className='flex justify-between h-60 py-26 my-centered-element max-w-[800px]'>
            <div>
                <p className='flex justify-around font-serif text-xl w-70'>Search results for <span className='text-green-800'> "{searchTerm}"</span></p>
            </div>
            <select className='pr-20 border rounded ml-80' 
            onChange={(event) => setSortOption(event.target.value)} value={sortOption}>
              <option value='' disabled >Sort by</option>
              <option value="A_to_Z">A to Z</option>
              <option value="Z_to_A">Z to A</option>
              <option value="Year">Year</option>
            </select>
            </div>
            <div className='my-centered-element'>
            <div id="movie__results"className='my-centered-element justify-between max-w-[900px] flex' >
            {loading ? (
            new Array(6).fill(0).map((__, index) => (  
                 <div className='w-[120px] h-[80px]' 
                  key={index} id='skeleton_loading_state'>
                    <h3 className='bg-gray-300 rounded-xl h-10 mb-1'></h3>
                    <h3 className='bg-gray-300 rounded-xl h-6 mb-1'></h3>
                    <img className='w-[120px] h-[180px] rounded-xl bg-gray-300' />
                </div>))
            ) : (  
                filteredMovies.length > 0 ? (
                    filteredMovies.map((movie, index) => (
                        <Link key={index} to={`/movie/${movie.imdbID}`}>
                            <div className='w-[120px] h-[80px]'>
                                <h3 className='text-sm h-10 overflow-clip font-bold font-serif'>{movie.Title}</h3>
                                <h3 className='font-bold h-6 text-sm'>{movie.Year}</h3>
                                <img className='w-[120px] h-[180px] rounded-xl shadow' src={movie.Poster}/>
                            </div>
                        </Link>
                    ))
                ) : (
                    <p className='my-centered-element font-serif text-center text-2xl'>No movies found. Please try a different search...</p>
                )
                )}
            </div>            
        </div> 
    </>
  );
};

export default Browse;