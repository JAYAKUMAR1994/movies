import React from 'react';
import './App.css';
import HomePage from './HomePage';
import { Routes,Route } from 'react-router-dom';
import MovieDetails from './MovieDetails';

  
function App() {
  return (
    <div >
      <Routes>
        <Route path='/' element={ <HomePage/>}/>
        <Route path='/movie/:id' element={ <MovieDetails/>}/>
      </Routes>
    </div>
  );
}

export default App;
