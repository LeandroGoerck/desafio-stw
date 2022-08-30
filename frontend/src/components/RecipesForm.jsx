import { FilePlus } from "phosphor-react";
import React, { useEffect, useState } from "react";
import api from "../helpers/request";
import IngredientSelect from "./IngredientSelect";

export default function RecipesForm(props) {
  const { handleChanges, handleAddIngredientButton, form } = props;
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    api.get('/ingredients')
      .then(({ data }) => {
        setIngredients(data.ingredientsData);
      })
  }, [])

  return (
    <form className="flex flex-row ">

      <div className="h-14 w-full mt-5 mb-5 bg-az1 flex flex-row items-center">
        <IngredientSelect ingredients={ingredients} handleChanges={handleChanges}/>
        <input
          type="input"
          name="previsto"
          placeholder="Previsto em kg"
          onChange={handleChanges}
          value={form.descricaoIngrediente}
          className="h-8 pl-1 w-2/4 rounded-sm">
        </input>
        
        <button
          type="button"
          className="h-10 w-10 bg-white ml-2 rounded-full flex flex-row items-center justify-center disabled:text-cz1 hover:text-az1"
          onClick={handleAddIngredientButton}
          disabled={false}
          >
          <FilePlus size={28} />
        </button>
      </div>

    </form>
  );
}
