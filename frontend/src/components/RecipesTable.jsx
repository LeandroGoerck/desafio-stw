import React, { useState } from "react";
import { NotePencil, Trash, Eye, ArrowFatLineRight } from "phosphor-react";
import { Link } from "react-router-dom";

export default function RecipesTable(props) {
  const [editRecipe, setEditRecipe] = useState(0);

  const handleViewEditButton = (recipeId, newRecipeData) => {
    if (editRecipe === 0) {
      setEditRecipe(recipeId);
    }
  };

  const { recipesList, removeRecipe } = props;
  return (
    <table className="table-fixed w-full border-2 border-az3 p-2 mt-5 mb-5">
      <thead>
        <tr>
          <th className="md:pl-10 md:pr-10 xl:pl-20 xl:pr-20 pt-2 pb-2 text-center">
            Código
          </th>
          <th className="md:pl-10 md:pr-10 xl:pl-20 xl:pr-20 pt-2 pb-2 text-center">
            Descrição
          </th>
          <th className="md:pl-10 md:pr-10 xl:pl-20 xl:pr-20 pt-2 pb-2 text-center">
            Opções
          </th>
        </tr>
      </thead>
      <tbody className="border-2 border-az3">
        {recipesList &&
          recipesList.map((recipe, index) => (
            <tr
              key={`${recipe.id}${index}`}
              className="text-center items-center border ">
              <td className="pt-2 pb-2">{recipe.codigoReceita}</td>
              
              <td className="pt-2 pb-2">{recipe.descricaoReceita}</td>

              <td className="pt-2 pb-2 flex flex-row justify-center">
                <Link to={`/recipes/${recipe.id}`}>
                  <Eye size={22} className="ml-2 mr-2" />
                </Link>

                <Link to={`/create/${recipe.id}`}>
                  <NotePencil size={22} className="ml-2 mr-2" />
                </Link>

                {/* {recipe.id === editRecipe ? (
                  <button
                    type="button"
                    className="h-fit w-fit ml-2 mr-2"
                    onClick={() => {
                      setEditRecipe(0);
                      // handleEditButton(ing.id);
                    }}>
                    <ArrowFatLineRight size={22} />
                  </button>
                ) : (
                  <button
                    type="button"
                    className="h-fit w-fit ml-2 mr-2"
                    onClick={() =>
                      handleViewEditButton(recipe.id, {
                        codigoReceita: recipe.codigoReceita,
                        codigoIngrediente: recipe.codigoIngrediente,
                      })
                    }>
                    <NotePencil size={22} />
                  </button>
                )} */}

                <button type="button" onClick={() => removeRecipe(recipe.id)}>
                  <Trash size={22} className="ml-2 mr-2" />
                </button>
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );
}
