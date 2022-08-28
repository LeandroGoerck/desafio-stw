import React from "react";
import {
  ArrowFatLineDown,
  ArrowFatLineUp,
  RadioButton,
  Trash,
} from "phosphor-react";

export default function RecipeWithIngredientsTable(props) {
  const handleViewEditButton = (
    recipeIngredientOrdem,
    editRecipeIngredientData
  ) => {
    if (editRecipeIngredient === 0) {
      setRecipeEditIngredient(recipeIngredientOrdem);

      setFormValue((prevState) => ({
        ...prevState,
        ...editRecipeIngredientData,
      }));
    }
  };

  const {
    recipeIngredients,
    handleRemoveIngredientButton,
    editRecipeIngredient,
    setRecipeEditIngredient,
    setFormValue,
    handleSwapIngredientsButton,
    ingredients,
    inputRecipeCodeName,
    handleRecipeChanges,
    inputRecipeCodeValue,
    inputRecipeDescription,
    inputRecipeDescriptionValue,
  } = props;
  return (
    <table className="table-fixed w-full border-2 border-az3 p-2 mb-5">
      <thead className="border-2 border-az3 ">
        <tr>
          <th>
            <div className="flex flex-row items-center">
              <div className="ml-5 flex flex-row items-center">
                <span className="text-lg font-semibold">Receita</span>
                <input
                  type="input"
                  name={inputRecipeCodeName}
                  placeholder="Código"
                  onChange={handleRecipeChanges}
                  value={inputRecipeCodeValue}
                  className="m-2 h-8 pl-1 w-20 bg-slate-100 rounded-sm"></input>
              </div>
              <div className="flex flex-row items-center">
                <span className="hidden md:inline-block text-lg font-semibold">
                  Descrição
                </span>
                <input
                  type="input"
                  name={inputRecipeDescription}
                  placeholder="Descrição"
                  onChange={handleRecipeChanges}
                  value={inputRecipeDescriptionValue}
                  className="h-8 pl-1 bg-slate-100 rounded-sm ml-2"></input>
              </div>
            </div>
          </th>
        </tr>
      </thead>

      <thead>
        <tr>
          <th className="md:pl-10 md:pr-10 xl:pl-20 xl:pr-20 pt-2 pb-2 text-center">
            Ordem
          </th>
          <th className="md:pl-10 md:pr-10 xl:pl-20 xl:pr-20 pt-2 pb-2 text-center">
            Código
          </th>
          <th className="md:pl-10 md:pr-10 xl:pl-20 xl:pr-20 pt-2 pb-2 text-center">
            Descrição
          </th>
          <th className="md:pl-10 md:pr-10 xl:pl-20 xl:pr-20 pt-2 pb-2 text-center">
            Previsto em kg
          </th>
          <th className="md:pl-10 md:pr-10 xl:pl-20 xl:pr-20 pt-2 pb-2 text-center">
            Opções
          </th>
        </tr>
      </thead>
      <tbody className="border-2 border-az3">
        {recipeIngredients &&
          recipeIngredients
            .sort((ingA, ingB) => ingA.ordem - ingB.ordem)
            .map((ing, index) => (
              <tr
                key={`${ing.id}${index}`}
                className={`${
                  editRecipeIngredient === ing.ordem && "bg-az1"
                } text-center items-center border`}>
                <td>
                  <span className="pt-2 pb-2">{ing.ordem}</span>
                </td>

                <td className="flex flex-box justify-center">
                  <span className="pt-2 pb-2">
                    {ing.ingredientesCodigoIngrediente}
                  </span>
                </td>

                <td className="pt-2 pb-2">
                  {
                    ingredients.find(
                      (i) =>
                        i.codigoIngrediente ===
                        ing.ingredientesCodigoIngrediente
                    ).descricaoIngrediente
                  }
                </td>

                <td>
                  <span className="pt-2 pb-2">{ing.previsto}</span>
                </td>

                <td className="pt-2 pb-2 flex flex-row justify-end">
                  <button
                    type="button"
                    className="h-fit w-fit ml-2 mr-2 disabled:text-cz1"
                    disabled={index === 0}
                    onClick={() => {
                      const ingredients = {
                        actual: index + 1,
                        target: index,
                      };
                      handleSwapIngredientsButton(ingredients);
                    }}>
                    <ArrowFatLineUp size={22} />
                  </button>

                  <button
                    type="button"
                    className="h-fit w-fit ml-2 mr-2 disabled:text-cz1"
                    disabled={index === recipeIngredients.length - 1}
                    onClick={() => {
                      const ingredients = {
                        actual: index + 1,
                        target: index + 2,
                      };
                      handleSwapIngredientsButton(ingredients);
                    }}>
                    <ArrowFatLineDown size={22} />
                  </button>

                  {ing.ordem === editRecipeIngredient ? (
                    <button
                      type="button"
                      className="h-fit w-fit ml-2 mr-2"
                      onClick={() => {
                        setRecipeEditIngredient(0);
                      }}>
                      <RadioButton size={22} weight="fill" />
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="h-fit w-fit ml-2 mr-2"
                      onClick={() =>
                        handleViewEditButton(ing.ordem, {
                          ingredientesCodigoIngrediente:
                            ing.ingredientesCodigoIngrediente,
                          previsto: ing.previsto,
                          ordem: ing.ordem,
                        })
                      }>
                      <RadioButton size={22} />
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={() => handleRemoveIngredientButton(ing.ordem)}>
                    <Trash size={22} className="ml-2 mr-2" />
                  </button>
                </td>
              </tr>
            ))}
      </tbody>
    </table>
  );
}
