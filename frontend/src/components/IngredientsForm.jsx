import { FilePlus } from "phosphor-react";
import React from "react";

export default function IngredientsForm(props) {
  const { handleChanges, handleAddButton, form } = props;

  return (
    <form className="flex flex-row ">

      <div className="h-14 w-full mt-5 mb-5 bg-az1 flex flex-row items-center">
        <input
          type="input"
          name="codigoIngrediente"
          placeholder="Código"
          onChange={handleChanges}
          value={form.codigoIngrediente}
          className="m-2 h-8 pl-1 w-1/4 rounded-sm">
        </input>
        <input
          type="input"
          name="descricaoIngrediente"
          placeholder="Descrição"
          onChange={handleChanges}
          value={form.descricaoIngrediente}
          className="h-8 pl-1 w-2/4 rounded-sm">
        </input>
        <button
          type="button"
          className="h-10 w-10 bg-white ml-2 rounded-full flex flex-row items-center justify-center disabled:bg-cz1"
          onClick={() => handleAddButton()}
          disabled={false}
          >
          <FilePlus size={28} />
        </button>
      </div>

    </form>
  );
}
