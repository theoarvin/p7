import React from 'react';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Home from '../../pages/Home';
import FormPage from '../../pages/FormPage';
import ProfilPage from '../../pages/ProfilPage';

const Index = () => {
  return (
   <BrowserRouter> 
      <Routes>
        <Route path='/home' element={<Home />}/>
        <Route path='/form' element={<FormPage />}/>
        <Route path='/profil' element={<ProfilPage />}/>
        <Route path='*' element={<FormPage />}/>
      </Routes>
   </BrowserRouter>
  );
};

export default Index;