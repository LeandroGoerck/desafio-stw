import React from "react";
import { Link } from "react-router-dom";
import { Clipboard, ClipboardText, ListPlus } from "phosphor-react";

export default function NavBar() {
  return (
    <nav className="bg-az4 flex flex-row h-16 items-center text-white">
      <div className="bg-white h-16">
        <Link to="/recipes">
          <img className="h-16" src="/stw.svg" alt="stw logo"></img>
        </Link>
      </div>
      <div className="triangle"></div>
      <div className="h-full w-full flex flex-row items-center justify-around">
        <Link to="/recipes">
          <Clipboard className="block md:hidden" size={32} />
          <div className="h-fit text-xl p-5 hidden md:block">RECEITAS</div>
        </Link>
        <Link to="/ingredients">
          <ClipboardText className="block md:hidden" size={32} />
          <div className="h-fit text-xl p-5 hidden md:block">INGREDIENTES</div>
        </Link>
        <Link to="/create">
          <ListPlus className="block md:hidden" size={32} />
          <div className="h-fit text-xl p-5 hidden md:block">
            CRIAÇÃO DE RECEITA
          </div>
        </Link>
      </div>
    </nav>
  );
}
