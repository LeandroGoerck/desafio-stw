import React from "react";
import { NotePencil, Trash } from "phosphor-react";


export default function IngredientsTable(props) {
  const { ingredients, removeIngredient } = props;
  return (
    <table className="table-fixed w-full md:w-fit border-2 border-az3 p-2 mt-5 mb-5">
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
        {ingredients && ingredients.map((ing) => (
          <tr key={ing.id} className="text-center items-center border ">
            <td className="pt-2 pb-2">{ing.codigoIngrediente}</td>
            <td className="pt-2 pb-2">{ing.descricaoIngrediente}</td>
            <td className="pt-2 pb-2 flex flex-row justify-center">
              <button
                type="button"
              >
                <NotePencil size={22} className="ml-2 mr-2" />
              </button>
              <button
                type="button"
                onClick={() => removeIngredient(ing.id)}
              >
                <Trash size={22} className="ml-2 mr-2" />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
