import React, { useState } from "react";
import NavBar from "../components/NavBar";
import RecipeWithIngredientsTable from "../components/RecipeWithIngredientsTable";
import AddIngredientToRecipeForm from "../components/AddIngredientToRecipeForm";
import api from "../helpers/request";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

export default function RecipeDetails() {
  const [editRecipeIngredient, setRecipeEditIngredient] = useState(0);
  const { id } = useParams();
  const recipeId = parseInt(id);

  const [recipe, setRecipe] = useState([
    {
      id: 1,
      codigoReceita: "58964",
      descricaoReceita: "Ração crescimento inicial",
      ordem: 0,
    },
  ]);

  const [form, setFormValue] = useState({
    receitasCodigoReceita: "",
    ingredientesCodigoIngrediente: "",
    previsto: 0,
    ordem: 1,
  });

  const handleChanges = (e) => {
    let { name, value } = e.target;
    if (name === "previsto") {
      value = parseInt(value);
      if (!value) {
        value = 0;
      }
    }
    setFormValue((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  useEffect(() => {
    let nextOrdem = 1;
    if (recipe.ingredientes?.length > 0) {
      nextOrdem = getIngredientsMaxOrdemValue(recipe.ingredientes) + 1;
    } else {
      nextOrdem = 1;
    }
    setFormValue((prevState) => ({
      ...prevState,
      ordem: nextOrdem,
      receitasCodigoReceita: recipe.codigoReceita,
    }));
  }, [recipe]);

  useEffect(() => {
    api.get(`/recipes/${recipeId}`).then(({ data }) => {
      setRecipe(data.recipeFound);

      setFormValue((prevState) => ({
        ...prevState,
        codigoReceita: data.recipeFound.codigoReceita,
      }));
    });
  }, [recipeId]);

  const handleRemoveIngredientButton = async (id) => {
    api
      .delete("/recipes/ingredient", { data: { id } })
      .then((returnedMessage) => {
        if (returnedMessage.status === 200) {
          api.get(`/recipes/${recipeId}`).then(({ data }) => {
            setRecipe(data.recipeFound);
          });
        }
      });
  };

  function getIngredientsMaxOrdemValue(args) {
    const max = args.reduce((prev, cur) => {
      return prev.ordem > cur.ordem ? prev.ordem : cur.ordem;
    }, []);
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

  const handleEditIngredientButton = async () => {
    api
      .put(`/recipes/ingredient/${editRecipeIngredient}`, form)
      .then((returnedMessage) => {
        if (returnedMessage.status === 200) {
          api.get(`/recipes/${recipeId}`).then(({ data }) => {
            setRecipe(data.recipeFound);
            setRecipeEditIngredient(0);
          });
        }
      });
  };

  const handleSwapIngredientsButton = async (ingredients) => {
    api.put(`/recipes/ingredient/`, ingredients).then((returnedMessage) => {
      if (returnedMessage.status === 200) {
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
          <div className="mt-14 mb-14  w-full md:w-2/3 flex flex-col items-center">
            <span>CADASTRO DE ETAPAS DA RECEITA</span>
            <span>{recipeId}</span>
            <AddIngredientToRecipeForm
              recipeId={recipeId}
              form={form}
              handleChanges={handleChanges}
              handleAddIngredientButton={handleAddIngredientButton}
              selectedIngredientToEdit={editRecipeIngredient}
              handleEditIngredientButton={handleEditIngredientButton}
            />
            {recipe && (
              <div className="h-full w-full bg-white flex flex-col items-center">

                <table className="table-fixed w-full md:w-fit border-2 border-az3 p-2 mt-5">
                  <thead>
                    <tr>
                      <th className="md:pl-10 md:pr-10 xl:pl-20 xl:pr-20 pt-2 pb-2 text-center">
                        Código da Receita
                      </th>
                      <th className="md:pl-10 md:pr-10 xl:pl-20 xl:pr-20 pt-2 pb-2 text-center">
                        Descrição
                      </th>
                    </tr>
                  </thead>
                  <tbody className="border-2 border-az3">
                    <tr className="text-center items-center border">
                      
                      <td>
                        <span className="pt-2 pb-2">
                          {recipe.codigoReceita}
                        </span>
                      </td>
                      <td>
                        <span className="pt-2 pb-2">
                          {recipe.descricaoReceita}
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>

                <RecipeWithIngredientsTable
                  recipeIngredients={recipe.ingredientes}
                  inputCodeName="previsto"
                  handleRemoveIngredientButton={handleRemoveIngredientButton}
                  editRecipeIngredient={editRecipeIngredient}
                  setRecipeEditIngredient={setRecipeEditIngredient}
                  setFormValue={setFormValue}
                  handleSwapIngredientsButton={handleSwapIngredientsButton}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
