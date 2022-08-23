import React, { useState } from "react";
import NavBar from "../components/NavBar";
import RecipeWithIngredientsTable from "../components/RecipeWithIngredientsTable";
import AddIngredientToRecipeForm from "../components/AddIngredientToRecipeForm";
import api from "../helpers/request";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

export default function RecipeDetails() {
  const { id } = useParams();
  const recipeId = parseInt(id);

  const [recipe, setRecipe] = useState([
    {
      id: 1,
      codigoReceita: "58964",
      descricaoReceita: "Ração crescimento inicial",
      ordem: 0
    },
  ]);

  const [form, setFormValue] = useState({
    receitasCodigoReceita: "",
    ingredientesCodigoIngrediente: "",
    previsto: 0,
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
    console.log('recipe',recipe)
    let nextOrdem = 1;
    if (recipe.ingredientes?.length > 0){
      nextOrdem =  getIngredientsMaxOrdemValue(recipe.ingredientes) +1;
    } else {
      nextOrdem = 1;
    }
      console.log('nextOrdem', nextOrdem)
      setFormValue((prevState) => ({
        ...prevState,
        ordem: nextOrdem,
        receitasCodigoReceita: recipe.codigoReceita
      }));
    
}, [recipe])


  useEffect(() => {
    api.get(`/recipes/${recipeId}`).then(({ data }) => {
      setRecipe(data.recipeFound);
      console.log(data.recipeFound.codigoReceita);

      setFormValue((prevState) => ({
        ...prevState,
        codigoReceita: data.recipeFound.codigoReceita,
      }));
    });
  }, [recipeId]);

  const handleRemoveIngredientButton = async (id) => {
    console.log("delete ingredient id", id);
    api.delete("/recipes/ingredient", {data: {id}}).then((returnedMessage) => {
      if (returnedMessage.status === 200) {
        api.get(`/recipes/${recipeId}`).then(({ data }) => {
          setRecipe(data.recipeFound);
        });
      }
    });
  };

  function getIngredientsMaxOrdemValue(args) {
    console.log('args', args)

    const max= args.reduce((prev, cur) => {
        return prev.ordem > cur.ordem ? prev.ordem : cur.ordem;
    },[]);
    return max;

}

  const handleAddIngredientButton = async () => {
    api.post("/recipes/ingredient", form).then((returnedMessage) => {
      if (returnedMessage.status === 201) {
        api.get(`/recipes/${recipeId}`).then(({ data }) => {
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
            <span>CADASTRO DE ETAPAS DA RECEITA</span>
            <span>{recipeId}</span>
            <AddIngredientToRecipeForm
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

                <RecipeWithIngredientsTable
                  recipeIngredients={recipe.ingredientes}
                  handleRemoveIngredientButton={handleRemoveIngredientButton}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
