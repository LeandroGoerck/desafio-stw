import React from "react";

export default function IngredientSelect(props) {
  const { ingredients, handleChanges } = props;

  return (
    <div className="flex justify-center">
      <div className="xl:w-96">
        <select
          name="ingredientesCodigoIngrediente"
          onChange={handleChanges}
          className="form-select block py-1.5 px-3 font-normal text-gray-700
                   bg-white bg-clip-padding bg-no-repeat border border-solid
                   border-gray-300 rounded transition mx-2 focus:text-az4
                   focus:bg-white focus:border-blue-600 focus:outline-none"
          >
           {ingredients.length && ingredients.map((ing) => (
             <option key={ing.id} value={ing.codigoIngrediente}>{`${ing.codigoIngrediente}  ${ing.descricaoIngrediente}`}</option>
           ))} 
        </select>
      </div>
    </div>
  );
}
