import React from "react";
import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <nav className="bg-az4 h-16 flex flex-row items-center">
      <div className="bg-white h">
        <Link to="/recipes" >
        <img className="h-16" src="/stw.svg" alt="stw logo"></img>
        </Link>
      </div>
      <div className="triangle"></div>
      <Link to="/recipes">
        <span className="text-xl text-white ml-5 mr-5">RECEITAS</span>
      </Link>
      <Link to="/ingredients">
        <span className="text-xl text-white ml-5 mr-5">INGREDIENTES</span>
      </Link>
    </nav>
  );
}
