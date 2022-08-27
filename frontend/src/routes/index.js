import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import GlobalProvider from '../context/GlobalProvider';
import Ingredients from '../pages/Ingredients';
import RecipeCreate from '../pages/RecipeCreate';
import RecipeDetails from '../pages/RecipeDetails';
import Recipes from '../pages/Recipes';

function RoutesApp() {

  return (
    <GlobalProvider >
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
          <Route
            exact
            path="/create"
            element={
                <RecipeCreate />
            }
          />
          <Route
            exact
            path="/create/:id"
            element={
                <RecipeCreate />
            }
          />
          <Route
            exact
            path="/recipes"
            element={
                <Recipes />
            }
          />
          <Route
            exact
            path="/recipes/:id"
            element={
                <RecipeDetails />
            }
          />
        </Routes>
      </BrowserRouter>
    </GlobalProvider>
  );
}

export default RoutesApp;
