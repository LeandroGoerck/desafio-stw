import React, { useState } from "react";
import NavBar from "../components/NavBar";
import RecipesTable from "../components/RecipesTable";
import RecipesForm from "../components/RecipesForm";
import api from "../helpers/request";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

function RecipeDetails() {
  const { id } = useParams();
  const recipeId = parseInt(id);

  const [recipe, setRecipe] = useState([
    {
      id: 1,
      codigoReceita: "58964",
      descricaoReceita: "Ração crescimento inicial",
    },
  ]);

  const [form, setFormValue] = useState({
    receitasCodigoReceita: "58964",
    ingredientesCodigoIngrediente: "5698",
    previsto: 100,
    ordem: 1
  });

  const handleChanges = (e) => {
    let { name, value } = e.target;
    if (name === "previsto") {
      value = parseInt(value);
    }
    setFormValue((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  useEffect(() => {
    api.get(`/recipes/${recipeId}`).then(({ data }) => {
      setRecipe(data.recipeFound);
      console.log(data.recipeFound.codigoReceita);

      setFormValue((prevState) => ({
        ...prevState,
        codigoReceita: data.recipeFound.codigoReceita,
      }));
    });
  }, [recipeId, recipe]);

  const removeRecipe = (value) => {
    api.delete("/recipes", { data: { id: value } }).then(() => {
      api.get("/recipes").then(({ data }) => setRecipe(data.recipesData));
    });
  };

  const handleAddIngredientButton = async () => {
    api.post("/recipes/ingredient", form).then((returnedMessage) => {
      if (returnedMessage.status === 201) {
        api.get("/recipes").then(({ data }) => {
          setRecipe(data.recipeFound);
        });
      }
    });
  };

  return (
    <div className="w-full h-full">
      <div className="md:m-14 shadow-lg h-full">
        <NavBar />

        <div className="flex flex-col items-center justify-center">
          <div className="mt-14 mb-14   w-full md:w-2/3 flex flex-col items-center">
            <span>DETALHES DA RECEITA</span>
            <span>{recipeId}</span>
            <RecipesForm
              recipeId={recipeId}
              form={form}
              handleChanges={handleChanges}
              handleAddIngredientButton={handleAddIngredientButton}
            />
            {recipe && (
              <div className="h-full w-full bg-white flex flex-col items-center">
                <div className="flex flex-row">
                  <div className="mt-2 ml-2 mr-2 text-xl">
                    Código: {recipe.codigoReceita}
                  </div>
                  <div className="mt-2 ml-2 mr-2 text-xl">
                    Descrição: {recipe.descricaoReceita}
                  </div>
                </div>
                <div className="mt-2 ml-2 mr-2 text-xl">Ingredientes</div>

                <RecipesTable
                  recipeIngredients={recipe.ingredientes}
                  removeRecipe={removeRecipe}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default RecipeDetails;
