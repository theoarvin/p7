import React from 'react';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Home from '../../pages/Home';
import FormPage from '../../pages/FormPage';
import Trending from '../../pages/Trending';

const Index = () => {
  return (
   <BrowserRouter> 
      <Routes>
        <Route path='/home' element={<Home />}/>
        <Route path='/' element={<FormPage />}/>
        <Route path='/trending' element={<Trending />}/>
        <Route path='*' element={<FormPage />}/>
      </Routes>
   </BrowserRouter>
  );
};

export default Index;