import React, { useState } from "react";
import NavBar from "../components/NavBar";
import RecipesTable from "../components/RecipesTable";
import CodeAndDescriptionForm from "../components/CodeAndDescriptionForm";
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

  const [disableButton, setDisableButton] = useState(true);

  useEffect(() => {
    if (
      form.codigoReceita.length >= 1 &&
      form.descricaoReceita.length >= 1
    ) {
      setDisableButton(false);
    } else {
      setDisableButton(true);
    }
  }, [form])

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
            <CodeAndDescriptionForm
              form={form}
              inputCodeName="codigoReceita"
              inputCodeValue={form.codigoReceita}
              inputDescriptionName="descricaoReceita"
              inputDescriptionValue={form.descricaoReceita}
              handleChanges={handleChanges}
              handleAddButton={handleAddButton}
              disableButton={disableButton}
            />
            {recipes && (
              <div className="h-full w-full bg-white flex flex-col items-center">
                <RecipesTable
                  recipesList={recipes}
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
