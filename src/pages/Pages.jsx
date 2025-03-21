import React from 'react';
import Home from './Home';
import { Route, Routes } from 'react-router-dom';
import Searched from './Searched';
import Recipe from './Recipe';
import { AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';


function Pages() {
  const location = useLocation();
  return (
    <AnimatePresence wait>
      <Routes Location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
           <Route path="/searched/:search" element={<Searched />} />
          <Route path="/recipe/:name" element={<Recipe />} />
      </Routes>
    </AnimatePresence>
  );
}

export default Pages;