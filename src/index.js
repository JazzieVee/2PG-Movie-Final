import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './components/Landing.jsx';
import Browse from './components/Browse.jsx';

ReactDOM.render(

    <Router>
     <App >
        <Routes>
            <Route path="/" element={<Landing/>}></Route>
            <Route path="/browse" element={<Browse/>}></Route>
          </Routes>
      </App>
     </Router>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

          
