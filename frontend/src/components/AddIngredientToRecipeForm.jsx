import { ArrowFatLineRight, FilePlus } from "phosphor-react";
import React from "react";
import IngredientSelect from "../components/IngredientSelect"

export default function AddIngredientToRecipeForm2(props) {
  const {
    handleChanges,
    handleAddIngredientButton,
    form,
    selectedIngredientToEdit,
    handleEditIngredientButton,
    ingredients,
    disableButton,
  } = props;

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
            className="h-10 w-10 bg-white ml-2 mr-2 rounded-full flex flex-row items-center justify-center disabled:text-cz1"
            onClick={handleAddIngredientButton}
            disabled={disableButton}>
            <FilePlus size={28} />
          </button>
        ) : (
          <button
            type="button"
            className="h-10 w-10 bg-white ml-2 mr-2 rounded-full flex flex-row items-center justify-center disabled:text-cz1"
            onClick={handleEditIngredientButton}
            disabled={disableButton}>
             <ArrowFatLineRight size={28} />
          </button>
        )}
      </div>
    </form>
  );
}
