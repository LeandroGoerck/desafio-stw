import React, { useState } from 'react';
import NavBar from '../components/NavBar';
import IngredientsTable from '../components/IngredientsTable';
import CodeAndDescriptionForm from '../components/CodeAndDescriptionForm';
import api from '../helpers/request';
import { useEffect } from 'react';


function Ingredients() {
  const [ingredients, setIngredients] = useState([
    {
      id: 1,
      codigoIngrediente: "5698",
      descricaoIngrediente: "Milho",
    },
  ]);

  const [form, setFormValue] = useState(
    {
      codigoIngrediente: "",
      descricaoIngrediente: "",
    }
  );

  const handleChanges = (e) => {
    const { name, value } = e.target;

    setFormValue((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  useEffect(() => {
    api.get('/ingredients')
      .then(({ data }) => {
        setIngredients(data.ingredientsData);
      })
  
  }, [])

const removeIngredient = (value) => {
  api
    .delete('/ingredients', {data: {id: value}})
    .then(() => {
      api
        .get('/ingredients')
        .then(({ data }) => setIngredients(data.ingredientsData));
    });
};
  

  const handleAddButton = async () => {
    api
      .post('/ingredients', form)
      .then((returnedMessage) => {
        if (returnedMessage.status === 201) {
          api
            .get('/ingredients')
            .then(({ data }) => {
              setIngredients(data.ingredientsData);
            });
        }
      });
  };  

  const handleEditButton = async (ingredientId) => {
    
    api
      .put(`/ingredients/${ingredientId}`, form)
      .then((returnedMessage) => {
        if (returnedMessage.status === 200) {
          api
            .get('/ingredients')
            .then(({ data }) => {
              setIngredients(data.ingredientsData);
              setFormValue((prevState) => ({ ...prevState, descricaoIngrediente: "",  codigoIngrediente: ""}));
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
            <span >CADASTRO DE INGREDIENTES</span>
            <CodeAndDescriptionForm
              form={form}
              inputCodeName="codigoIngrediente"
              inputCodeValue={form.codigoIngrediente}
              inputDescriptionName="descricaoIngrediente"
              inputDescriptionValue={form.descricaoIngrediente}
              handleChanges={handleChanges}
              handleAddButton={handleAddButton}
            />
            <div className="h-full w-full bg-cz2 flex flex-col items-center">
              <IngredientsTable
                ingredients={ingredients}
                setFormValue={setFormValue}
                removeIngredient={removeIngredient}
                inputCodeName="codigoIngrediente"
                inputCodeValue={form.codigoIngrediente}
                inputDescriptionName="descricaoIngrediente"
                inputDescriptionValue={form.descricaoIngrediente}
                handleChanges={handleChanges}
                handleAddButton={handleAddButton}
                handleEditButton={handleEditButton}
              />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Ingredients;

