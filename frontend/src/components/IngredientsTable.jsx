import React, { useState } from "react";
import { NotePencil, Trash, ArrowFatLineRight } from "phosphor-react";

export default function IngredientsTable(props) {
  const [editIngredient, setEditIngredient] = useState(0);

  const handleViewEditButton = (ingredientId, newIngredientData) => {
    if (editIngredient === 0) {
      setEditIngredient(ingredientId);
      setFormValue(newIngredientData);
    }
  };

  const {
    ingredients,
    setFormValue,
    removeIngredient,
    handleChanges,
    inputDescriptionName,
    inputDescriptionValue,
    inputCodeName,
    inputCodeValue,
    handleEditButton,
  } = props;
  return (
    <table className="table-fixed w-full border-2 border-az3 p-2">
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
        {ingredients &&
          ingredients.map((ing) => (
            <tr key={ing.id} className="text-center items-center border ">
              {/* <td className="pt-2 pb-2">{ing.codigoIngrediente}</td> */}

              <td>
                {ing.id === editIngredient ? (
                  <input
                    type="input"
                    name={inputCodeName}
                    placeholder="Código"
                    onChange={handleChanges}
                    value={inputCodeValue}
                    className="pl-1 w-full rounded-sm text-center"></input>
                ) : (
                  <span className="pt-2 pb-2">{ing.codigoIngrediente}</span>
                )}
              </td>

              <td>
                {ing.id === editIngredient ? (
                  <input
                    type="input"
                    name={inputDescriptionName}
                    placeholder="Descrição"
                    onChange={handleChanges}
                    value={inputDescriptionValue}
                    className=" pl-1 w-full rounded-sm text-center"></input>
                ) : (
                  <span className="pt-2 pb-2">{ing.descricaoIngrediente}</span>
                )}
              </td>

              <td className="pt-2 pb-2 flex flex-row justify-center">
                {ing.id === editIngredient ? (
                  <button
                    type="button"
                    className="h-fit w-fit ml-2 mr-2"
                    onClick={() => {
                      setEditIngredient(0);
                      handleEditButton(ing.id);
                    }}>
                    <ArrowFatLineRight size={22} />
                  </button>
                ) : (
                  <button
                    type="button"
                    className="h-fit w-fit ml-2 mr-2"
                    onClick={(e) => handleViewEditButton(ing.id, {codigoIngrediente: ing.codigoIngrediente, descricaoIngrediente: ing.descricaoIngrediente})}>
                    <NotePencil size={22} />
                  </button>
                )}
                <button
                  type="button"
                  className="h-fit w-fit ml-2 mr-2"
                  onClick={() => removeIngredient(ing.id)}>
                  <Trash size={22} />
                </button>
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );
}
