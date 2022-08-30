import { FilePlus } from "phosphor-react";
import React from "react";

export default function CodeAndDescriptionForm(props) {
  const {
    handleChanges,
    handleAddButton,
    inputCodeName,
    inputDescriptionName,
    inputCodeValue,
    inputDescriptionValue,
    disableButton,
  } = props;

  return (
    <form className="flex flex-row ">
      <div className="h-14 w-full mt-5 mb-5 bg-az1 flex flex-row items-center">

        <input
          type="input"
          name={inputCodeName}
          placeholder="Código"
          onChange={handleChanges}
          value={inputCodeValue}
          className="m-2 h-8 pl-1 w-1/4 rounded-sm">
        </input>

        <input
          type="input"
          name={inputDescriptionName}
          placeholder="Descrição"
          onChange={handleChanges}
          value={inputDescriptionValue}
          className="h-8 pl-1 w-2/4 rounded-sm">
        </input>

        <button
          type="button"
          className="h-10 w-10 bg-white ml-2 mr-2 rounded-full flex flex-row items-center justify-center disabled:text-cz1"
          onClick={() => handleAddButton()}
          disabled={disableButton}>
          <FilePlus size={28} />
        </button>

      </div>
    </form>
  );
}
