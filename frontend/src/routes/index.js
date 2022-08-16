import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import GlobalProvider from '../context/GlobalProvider';
import Ingredients from '../pages/Ingredients';

function RoutesApp() {
  return (
    <GlobalProvider>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={ <Navigate to="/ingredients" replace /> } />
          <Route
            exact
            path="/ingredients"
            element={
                <Ingredients />
            }
          />
        </Routes>
      </BrowserRouter>
    </GlobalProvider>
  );
}

export default RoutesApp;
