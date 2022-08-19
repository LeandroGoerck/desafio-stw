import React, { useState } from "react";
import NavBar from "../components/NavBar";
import RecipesTable from "../components/RecipesTable";
import RecipesForm from "../components/RecipesForm";
import api from "../helpers/request";
import { useEffect } from "react";

function Recipes() {
  const [recipes, setRecipes] = useState([
    {
      id: 1,
      codigoReceita: "58964",
      descricaoReceita: "Ração crescimento inicial",
    },
  ]);

  const [form, setFormValue] = useState({
    codigoReceita: "",
    descricaoReceita: "",
  });

  const handleChanges = (e) => {
    const { name, value } = e.target;

    setFormValue((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  useEffect(() => {
    api.get("/recipes").then(({ data }) => {
      setRecipes(data.recipesData);
      console.log(data.recipesData);
    });
  }, []);

  const removeRecipe = (value) => {
    api.delete("/recipes", { data: { id: value } }).then(() => {
      api.get("/recipes").then(({ data }) => setRecipes(data.recipesData));
    });
  };

  const handleAddButton = async () => {
    api.post("/recipes", form).then((returnedMessage) => {
      if (returnedMessage.status === 201) {
        api.get("/recipes").then(({ data }) => {
          setRecipes(data.recipesData);
          setFormValue((prevState) => ({
            ...prevState,
            descricaoIngrediente: "",
            codigoIngrediente: "",
          }));
        });
      }
    });
  };

  return (
    <div className="w-full h-full">
      <div className="md:m-14 shadow-lg h-full">
        <NavBar />

        <div className="flex flex-col items-center justify-center">
          <div className="mt-14 mb-14  md:m-14 w-full md:w-2/3 flex flex-col items-center">
            <span>CADASTRO DE RECEITAS</span>
            <RecipesForm
              form={form}
              handleChanges={handleChanges}
              handleAddButton={handleAddButton}
            />
            {recipes && (
              <div className="h-full w-full bg-white flex flex-col items-center">
                <div className="flex flex-row">
                  <div className="mt-2 ml-2 mr-2 text-xl">
                    Código: {recipes[0].codigoReceita}
                  </div>
                  <div className="mt-2 ml-2 mr-2 text-xl">
                    Descrição: {recipes[0].descricaoReceita}
                  </div>
                </div>
                <div className="mt-2 ml-2 mr-2 text-xl">Ingredientes</div>

                <RecipesTable
                  ingredients={recipes[0].ingredientes}
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

export default Recipes;
