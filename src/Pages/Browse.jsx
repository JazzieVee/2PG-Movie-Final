import React, { useState, useEffect } from 'react';
import movieLogo from "../assets/movie warehouse.png";
import { FaMagnifyingGlass } from 'react-icons/fa6';
import { Link, useLocation } from 'react-router-dom';

const Browse = () => {
    const location = useLocation();
    const movies = location.state?.movies || [];

    const [searchTerm, setSearchTerm] = useState('');
    const [filteredMovies, setFilteredMovies] = useState([]);
    const [sortOption, setSortOption] = useState(''); 
    const [loading, setLoading] = useState(true)


    useEffect(() => {
        setLoading(true);
        let results = movies.filter(movie => 
            movie.Title.toLowerCase().includes(searchTerm.toLowerCase())
        );


        if (sortOption === 'A_to_Z') {
            results.sort((a, b) => a.Title.localeCompare(b.Title));
        } else if (sortOption === 'Z_to_A') {
            results.sort((a, b) => b.Title.localeCompare(a.Title));
        } else if (sortOption === 'Year') {
            results.sort((a, b) => b.Year - a.Year); 
        }

    setFilteredMovies(results.slice(0,6));
    setLoading(false);   
    },[searchTerm, sortOption, movies]);


  return (
    <>
        <div className=" flex justify-between my-centered-element h-30 pt-4 max-w-[1300px]">
            <figure className="w-60 p-2">
                <img src={movieLogo} alt="" className="w-30 rounded-full shadow mx-20 mt-5" />
            </figure>
            <div className='p-10 mx-16'>
                <Link to="/">
                <b className='mr-8 cursor-pointer text-white font-serif'>Find your movie</b>
                </Link>
                <button className='bg-green-800 text-[24px] font-bold px-6 py-1.5 rounded-3xl'>Contact us</button>
               </div>
        </div>
        <div>
            <div className="text-[52px] mb-8 font-bold text-center text-shadow font-serif text-stroke-white">
                Browse our movies
            </div>
            <div className=" flex items-center justify-center">
                <input 
                className="pr-50 bg-white absolute border p-3 border-green-700 rounded-3xl text-lg shadow" 
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
                <button onClick={() => setSearchTerm(searchTerm)}
                className='relative left-44 bg-transparent border-none cursor-pointer'>                       
                <FaMagnifyingGlass />                       
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
            {loading ? 
            new Array(6).fill(0).map((__, index) => (  
                 <div className='w-[100px] h-[80px]' 
                  key={index} id='skeleton_loading_state'>
                    <h3 className='border bg-gray-600'></h3>
                    <h3 className='border bg-gray-600'></h3>
                    <img className='w-[120px] h-[180px] rounded-xl border bg-gray-600' />
                </div>)
            ) : (  
                    filteredMovies.map(movie => (
                        <Link key={movie.imdbID} to={`/movie/${movie.imdbID}`}>
                            <div className='w-[100px] h-[80px]'>
                                <h3 className='text-sm h-15 overflow-clip font-bold font-serif'>{movie.Title}</h3>
                                <h3 className='font-bold text-sm'>{movie.Year}</h3>
                                <img className='w-[120px] h-[180px] rounded-xl shadow' src={movie.Poster}/>
                            </div>
                        </Link>
                    ))
                
                )}
            </div>            
        </div> 
    </>
  );
};

export default Browse;