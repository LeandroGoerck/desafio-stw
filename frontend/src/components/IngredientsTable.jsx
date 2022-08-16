import React from "react";
import { NotePencil, Trash } from "phosphor-react";

export default function IngredientsTable() {
  return (
    <table className="table-fixed w-full md:w-fit border-2 border-az3 p-2 mt-5 mb-5">
      <thead>
        <tr >
          <th className="md:pl-10 md:pr-10 xl:pl-20 xl:pr-20 pt-2 pb-2 text-center">Código</th>
          <th className="md:pl-10 md:pr-10 xl:pl-20 xl:pr-20 pt-2 pb-2 text-center">Descrição</th>
          <th className="md:pl-10 md:pr-10 xl:pl-20 xl:pr-20 pt-2 pb-2 text-center">Opções</th>
        </tr>
      </thead>
      <tbody className="border-2 border-az3">
        <tr className="text-center items-center border ">
          <td className="pt-2 pb-2">5698</td>
          <td className="pt-2 pb-2">Milho</td>
          <td className="pt-2 pb-2 flex flex-row justify-center">
            <button
              type="button"
            >
              <NotePencil size={22}/>
            </button>
            <button
            type="button"
              >
            <Trash size={22} className="ml-5"/>
            </button>
            </td>
        </tr>
        <tr  className="text-center items-center border">
          <td className="pt-2 pb-2">5697</td>
          <td className="pt-2 pb-2">Farinha</td>
          <td className="pt-2 pb-2 flex flex-row justify-center"><NotePencil size={22}/><Trash size={22} className="ml-5"/></td>
        </tr>
        <tr  className="text-center items-center border">
          <td className="pt-2 pb-2">5699</td>
          <td className="pt-2 pb-2">Premix</td>
          <td className="pt-2 pb-2 flex flex-row justify-center"><NotePencil size={22}/><Trash size={22} className="ml-5"/></td>
        </tr>
      </tbody>
    </table>
  );
}
