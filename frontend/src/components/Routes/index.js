import React from 'react';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Home from '../../pages/Home';
import Profil from '../../pages/Profil';
import Trending from '../../pages/Trending';

const Index = () => {
  return (
   <BrowserRouter>
      <Routes>
        <Route path='/home' element={<Home />}/>
        <Route path='/' element={<Profil />}/>
        <Route path='/trending' element={<Trending />}/>
        <Route path='*' element={<Profil />}/>
      </Routes>
   </BrowserRouter>
  );
};

export default Index;