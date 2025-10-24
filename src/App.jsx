import { useState } from 'react';
import { Routes, Route, } from 'react-router-dom';
import Landing from "./Pages/Landing";
import Browse from './Pages/Browse';
import MovieDetail from './Pages/MovieDetail';
import bgImage from "./assets/moviebackground.jpg";



function App() {
  const [movies, setMovies] = useState([]);

  const commonStyle = {
    position: "relative",
    background: "linear-gradient(to bottom right, #1f2937, #d97706)",
    height: "19rem",
    zIndex: 10,    
    };

    const backgroundImageStyle = {
      content: "",
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundImage: `url(${bgImage})`,
      backgroundSize: "cover",
      opacity: 0.3,
      zIndex: -1,
    }

  return (
          <Routes>
            <Route path="/" element={<div style={commonStyle}><div style={backgroundImageStyle}></div><Landing/></div>}></Route>
            <Route path="/movies" element={<div style={commonStyle}><div style={backgroundImageStyle}></div><Browse movies={movies}/></div>}></Route>
            <Route path="/movie/:id" element={<MovieDetail/>}></Route>
          </Routes>
  );
}

export default App;
