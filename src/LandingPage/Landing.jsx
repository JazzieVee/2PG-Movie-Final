import React from 'react';
import movieLogo from "../assets/movie warehouse.png";
import couch from "../assets/undraw_home-cinema_jdm1 (2).svg";
import { FaMagnifyingGlass } from "react-icons/fa6";


const Landing = () => {

return(
        <>
            <div className=" flex justify-between my-centered-element max-w-[1300px]">
                <figure className="w-60 p-2">
                 <img src={movieLogo} alt="" className="w-30 rounded-full shadow mx-20 mt-5"/>
                </figure>
                <div className="font-bold my-8 text-white text-center">
                    <p className="text-2xl font-semibold mb-10 w-60 text-shadow">Search for any movie!</p>
                    <p className="text-xl font-serif text-shadow">Est. 2025</p>
                </div>
            </div>
             <div>
                <div className="text-[84px] font-bold text-center text-shadow font-serif text-stroke-white">
                    Movie Warehouse
                </div>
                <div className=" flex items-center justify-center">
                <input className="pr-50 border p-2.5 mr-2 border-green-700 rounded-2xl text-lg shadow" type="text" autoComplete="off" placeholder="Search for a movie"/>
               <button 
               className="bg-green-800 text-[24px] items-center font-bold px-10 py-3.5 border-white rounded-2xl shadow">
                <FaMagnifyingGlass/>
                </button>
                </div>
                </div>
                <div>
                    <img className="pt-4 my-centered-element h-95" src={couch} alt="" />
                </div>

        </>
    );
}

export default Landing