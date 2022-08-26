import { ArrowFatLineRight, FilePlus } from "phosphor-react";
import React, { useEffect, useState } from "react";
import api from "../helpers/request";
import IngredientSelect from "../components/IngredientSelect"

export default function AddIngredientToRecipeForm(props) {
  const [ingredients, setIngredients] = useState([]);
  const {
    handleChanges,
    handleAddIngredientButton,
    form,
    selectedIngredientToEdit,
    handleEditIngredientButton,
  } = props;


  useEffect(() => {
    api.get("/ingredients").then(({ data }) => {
      setIngredients(data.ingredientsData);
    });
  }, []);

  return (
    <form className="flex flex-row ">
      <div className="h-14 w-full mt-5 mb-5 bg-az1 flex flex-row items-center">
        <IngredientSelect
          selected={0}
          ingredients={ingredients}
          handleChanges={handleChanges}
        />
        <input
          type="input"
          name="previsto"
          placeholder="Previsto em kg"
          onChange={handleChanges}
          value={form.previsto}
          className="h-8 pl-1 w-2/4 rounded-sm"></input>

        {selectedIngredientToEdit === 0 ? (
          <button
            type="button"
            className="h-10 w-10 bg-white ml-2 mr-2 rounded-full flex flex-row items-center justify-center disabled:bg-cz1"
            onClick={handleAddIngredientButton}
            disabled={false}>
            <FilePlus size={28} />
          </button>
        ) : (
          <button
            type="button"
            className="h-10 w-10 bg-white ml-2 mr-2 rounded-full flex flex-row items-center justify-center disabled:bg-cz1"
            onClick={handleEditIngredientButton}
            disabled={false}>
             <ArrowFatLineRight size={28} />
          </button>
        )}
      </div>
    </form>
  );
}
