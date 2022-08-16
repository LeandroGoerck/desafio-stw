import React from 'react';
import NavBar from '../components/NavBar';

function Ingredients() {
  return (
    <div className="w-full h-96">
      <div className="m-14 shadow-lg h-full">
        <NavBar />

        <div className="flex flex-col items-center justify-center">
          <span >Ingredients Page</span>
          <div className="m-14 bg-cz1 w-2/3 h-40 ">
          </div>
        </div>

      </div>
    </div>
  );
}

export default Ingredients;

