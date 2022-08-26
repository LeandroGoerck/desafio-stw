import React from "react";
import {
  ArrowFatLineDown,
  ArrowFatLineUp,
  RadioButton,
  Trash,
} from "phosphor-react";

export default function RecipeWithIngredientsTable(props) {
  const handleViewEditButton = (
    recipeIngredientId,
    editRecipeIngredientData
  ) => {
    if (editRecipeIngredient === 0) {
      setRecipeEditIngredient(recipeIngredientId);

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
  } = props;
  return (
    <table className="table-fixed w-full md:w-fit border-2 border-az3 p-2 mb-5">
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
                  editRecipeIngredient === ing.id && "bg-az1"
                } text-center items-center border`}>
                <td>
                  <span className="pt-2 pb-2">{ing.ordem}</span>
                </td>

                <td className="flex flex-box justify-center">
                  <span className="pt-2 pb-2">
                    {ing.ingredientes.codigoIngrediente}
                  </span>
                </td>

                <td className="pt-2 pb-2">
                  {ing.ingredientes.descricaoIngrediente}
                </td>

                <td>
                  <span className="pt-2 pb-2">{ing.previsto}</span>
                </td>

                <td className="pt-2 pb-2 flex flex-row justify-end">

                    <button
                      type="button"
                      className="h-fit w-fit ml-2 mr-2 disabled:text-cz1"
                      disabled={index === 0 }
                      onClick={() => {
                        const ingredients = [
                          {
                            id: ing.id,
                            ordem: recipeIngredients[index - 1].ordem,
                          },
                          {
                            id: recipeIngredients[index - 1].id,
                            ordem: ing.ordem,
                          },
                        ];

                        handleSwapIngredientsButton(ingredients);
                      }}>
                      <ArrowFatLineUp size={22} />
                    </button>

                  
                    <button
                      type="button"
                      className="h-fit w-fit ml-2 mr-2 disabled:text-cz1"
                      disabled={index === (recipeIngredients.length - 1) }
                      onClick={() => {
                        const ingredients = [
                          {
                            id: ing.id,
                            ordem: recipeIngredients[index + 1].ordem,
                          },
                          {
                            id: recipeIngredients[index + 1].id,
                            ordem: ing.ordem,
                          },
                        ];

                        handleSwapIngredientsButton(ingredients);
                      }}>
                      <ArrowFatLineDown size={22} />
                    </button>
                  

                  {ing.id === editRecipeIngredient ? (
                    <button
                      type="button"
                      className="h-fit w-fit ml-2 mr-2"
                      onClick={() => {
                        setRecipeEditIngredient(0);
                        // handleEditButton(ing.id);
                      }}>
                      <RadioButton size={22} weight="fill" />
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="h-fit w-fit ml-2 mr-2"
                      onClick={() =>
                        handleViewEditButton(ing.id, {
                          ingredientesCodigoIngrediente:
                            ing.ingredientes.codigoIngrediente,
                          previsto: ing.previsto,
                          ordem: ing.ordem,
                        })
                      }>
                      <RadioButton size={22} />
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={() => handleRemoveIngredientButton(ing.id)}>
                    <Trash size={22} className="ml-2 mr-2" />
                  </button>
                </td>
              </tr>
            ))}
      </tbody>
    </table>
  );
}
