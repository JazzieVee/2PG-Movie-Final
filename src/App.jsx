import { useState } from 'react';
import { Routes, Route, } from 'react-router-dom';
import Landing from "./Pages/Landing";
import Browse from './Pages/Browse';
import MovieDetail from './Pages/MovieDetail';


function App() {
  const [movies, setMovies] = useState([]);

  const commonStyle = {
    background: "linear-gradient(to bottom right, #1f2937, #d97706)",
    height: "19rem",
  };

  return (
          <Routes>
            <Route path="/" element={<div style={commonStyle}><Landing/></div>}></Route>
            <Route path="/movies" element={<div style={commonStyle}><Browse movies={movies}/></div>}></Route>
            <Route path="/movie/:id" element={<MovieDetail/>}></Route>
          </Routes>
  );
}

export default App;
