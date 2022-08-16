import React from 'react';
import NavBar from '../components/NavBar';
import IngredientsTable from '../components/IngredientsTable';
import { FilePlus } from "phosphor-react";


function Ingredients() {
  return (
    <div className="w-full h-full">
      <div className="md:m-14 shadow-lg h-full">
        <NavBar />

        <div className="flex flex-col items-center justify-center">
          <div className="mt-14 mb-14  md:m-14 w-full md:w-2/3 flex flex-col items-center">
            <span >CADASTRO DE INGREDIENTES</span>
            <div className="h-14 w-full mt-5 mb-5 bg-az1 flex flex-row items-center">
              <input
                type="text"
                placeholder="Código"
                className="m-2 h-8 pl-1 w-1/4 rounded-sm"
              >
              </input>
              <input
                type="text"                
                placeholder="Descrição"
                className="h-8 pl-1 w-2/4 rounded-sm"
              >
              </input>
              <button
                type="button"
                className="h-10 w-10 bg-white ml-2 rounded-full flex flex-row items-center justify-center"
              >
                <FilePlus size={28}/>
              </button>
            </div>
            <div className="h-full w-full bg-cz2 flex flex-col items-center">
              <IngredientsTable />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Ingredients;

