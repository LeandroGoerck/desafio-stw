import React, { useState } from "react";
import NavBar from "../components/NavBar";
import RecipeWithIngredientsTable2 from "../components/RecipeWithIngredientsTable2";
import api from "../helpers/request";
import { useEffect } from "react";
import AddIngredientToRecipeForm2 from "../components/AddIngredientToRecipeForm2";
import { FloppyDisk } from "phosphor-react";
import { useParams } from "react-router-dom";

export default function RecipeCreate() {
  const [editRecipeIngredient, setRecipeEditIngredient] = useState(0);
  const { id } = useParams();
  const [recipeId, setRecipeId] = useState(parseInt(id) | 0);

  const [recipeTemp, setRecipeTemp] = useState(0);

  const [recipe, setRecipe] = useState({
    codigoReceita: "",
    descricaoReceita: "",
  });

  const [ingredients, setIngredients] = useState([]);
  useEffect(() => {
    api.get("/ingredients").then(({ data }) => {
      setIngredients(data.ingredientsData);
      console.log(data.ingredientsData);
    });
  }, []);

  const [recipeIngredients, setRecipeIngredients] = useState([
    // {
    //   ingredientesCodigoIngrediente: 0,
    //   previsto: 0,
    //   ordem: 0,
    // },
  ]);

  const [form, setFormValue] = useState({
    ingredientesCodigoIngrediente: "",
    previsto: 0,
  });

  useEffect(() => {
    if (recipeId > 0) {
      api.get(`/recipes/${recipeId}`).then(({ data }) => {
        setRecipeTemp(data.recipeFound)
      });
    } 
  }, [recipeId]);

  useEffect(() => {

    if (recipeTemp) {
      const formattedIngredients = [...recipeTemp.ingredientes].map(
        (ing) => ({
          ingredientesCodigoIngrediente: ing.ingredientes.codigoIngrediente,
          ordem: ing.ordem,
          previsto: ing.previsto,
          id: ing.id
        })
      );
      console.log('formattedIngredients', formattedIngredients);
      setRecipeIngredients(formattedIngredients);
      setRecipe({
        codigoReceita: recipeTemp.codigoReceita,
        descricaoReceita: recipeTemp.descricaoReceita,
      })
    }
        
  }, [recipeTemp])

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

  const handleRecipeChanges = (e) => {
    let { name, value } = e.target;

    setRecipe((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };


  const handleRemoveIngredientButton = async (ordem) => {
    setRecipeIngredients(recipeIngredients.filter((i) => i.ordem !== ordem));
  };

  useEffect(() => {
    const ingredientsInOrderSequence = [...recipeIngredients].map(
      (ing, index) => ({
        ingredientesCodigoIngrediente: ing.ingredientesCodigoIngrediente,
        ordem: index + 1,
        previsto: ing.previsto,
        id: ing.id,
      })
    );
    setRecipeIngredients(ingredientsInOrderSequence);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [recipeIngredients.length]);

  const handleAddIngredientButton = async () => {
    const updatedIngredientList = [...recipeIngredients];
    updatedIngredientList.push(form);
    setRecipeIngredients(updatedIngredientList);
  };

  const handleEditIngredientButton = async () => {
    console.log(editRecipeIngredient, form);
    const updatedIngredientList = [...recipeIngredients].map((ing) => {
      if (ing.ordem === editRecipeIngredient) {
        return form;
      }
      return ing;
    });
    console.log("updatedIngredientList", updatedIngredientList);
    setRecipeIngredients(updatedIngredientList);
    setRecipeEditIngredient(0);
  };

  const handleSwapIngredientsButton = async ({ actual, target }) => {
    const actualItem = { ...recipeIngredients[actual - 1] };
    const targetItem = { ...recipeIngredients[target - 1] };

    const swapedIngredientsList = [...recipeIngredients].map((ing) => {
      if (ing.ordem === target) {
        return actualItem;
      } else if (ing.ordem === actual) {
        return targetItem;
      } else {
        return ing;
      }
    });

    const ingredientsInOrderSequence = swapedIngredientsList.map(
      (ing, index) => ({
        ingredientesCodigoIngrediente: ing.ingredientesCodigoIngrediente,
        ordem: index + 1,
        previsto: ing.previsto,
        id: ing.id
      })
    );

    setRecipeIngredients(ingredientsInOrderSequence);
  };

  const handleSaveButton = () => {

    const data = {
      ...recipe,
      ingredientes: recipeIngredients 
    }

    api.post(`/recipes/create/${recipeId}`, data).then((returnedMessage) => {
      if (returnedMessage.status === 201) {
        console.log(returnedMessage.data.recipesData.id);
        const receivedRecipeId =returnedMessage.data.recipesData.id;
        

        api.get(`/recipes/${receivedRecipeId}`).then(({ data }) => {
          setRecipeTemp(data.recipeFound);
          console.log(data.recipeFound);
          setRecipeId(receivedRecipeId)
        });
      }
    });
    
  }

  return (
    <div className="w-full h-full">
      <div className="relative md:m-14 shadow-lg h-full">
        <NavBar />

        <button
          type="button"
          className="absolute right-0 m-2"
          onClick={handleSaveButton}
        >
          <FloppyDisk size={32}/>
        </button>

        <div className="flex flex-col items-center justify-center">
          <div className="mt-14 mb-14  w-full md:w-2/3 flex flex-col items-center">
            <span>CADASTRO DE ETAPAS DA RECEITA</span>
            <span>{recipeId}</span>
            <AddIngredientToRecipeForm2
              ingredients={ingredients}
              recipeId={recipeId}
              form={form}
              handleChanges={handleChanges}
              handleAddIngredientButton={handleAddIngredientButton}
              selectedIngredientToEdit={editRecipeIngredient}
              handleEditIngredientButton={handleEditIngredientButton}
            />

            <div className="h-full w-full bg-white flex flex-col items-center">
              <table className="table w-full md:w-fit border-t-2 border-x-2 border-az3 p-2 mt-5">
                <thead>
                  <tr>
                    <th className="md:pl-10 md:pr-10 xl:pl-20 xl:pr-20 w-3/12 pt-2 pb-2 text-center">
                      Receita
                    </th>

                    <th className="md:pl-10 md:pr-10 xl:pl-20 xl:pr-20 w-2/12 pt-2 pb-2 text-center">
                      <input
                        type="input"
                        name="codigoReceita"
                        placeholder="Código"
                        onChange={handleRecipeChanges}
                        value={recipe.codigoReceita}
                        className="m-2 h-8 pl-1 w-20 bg-slate-100 rounded-sm"></input>
                    </th>

                    <th className="md:pl-10 md:pr-10 xl:pl-20 xl:pr-20 pt-2 pb-2 text-center">
                      <input
                        type="input"
                        name="descricaoReceita"
                        placeholder="Descrição"
                        onChange={handleRecipeChanges}
                        value={recipe.descricaoReceita}
                        className="h-8 pl-1 w-60 bg-slate-100 rounded-sm"></input>
                    </th>
                  </tr>
                </thead>
              </table>

              <RecipeWithIngredientsTable2
                ingredients={ingredients}
                recipeIngredients={recipeIngredients}
                inputCodeName="previsto"
                handleRemoveIngredientButton={handleRemoveIngredientButton}
                editRecipeIngredient={editRecipeIngredient}
                setRecipeEditIngredient={setRecipeEditIngredient}
                setFormValue={setFormValue}
                handleSwapIngredientsButton={handleSwapIngredientsButton}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
