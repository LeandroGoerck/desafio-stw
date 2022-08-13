import { connect } from "http2";
import { prismaClient } from "../database/prismaClient";
import IRecipe from "../interfaces/IRecipe";
import ICreateRecipe from "../interfaces/ICreateRecipe";
import ERR from './errors';

export default class RecipesService {

  public create = async (recipe: ICreateRecipe) => {
    const {codigoReceita, descricaoReceita, ingredientes} = recipe;
    const recipesData = await prismaClient.receitas.create({
      data: {
        codigoReceita,
        descricaoReceita,
        ingredientes: { create: ingredientes}
      },
    });
    return { recipesData };
  };

  public getAll = async () => {
    const recipesData = await prismaClient.receitas.findMany(
      {include: { ingredientes: {select: {ingredientesCodigoIngrediente:true , ordem:true, previsto:true}} }});
    return { recipesData };
  };

  public getById = async (id: string) => {
    console.log(id);
    const ingredientFound = await prismaClient.receitas.findFirst({
      where: { id: parseInt(id) }, include: {ingredientes: {select: {ingredientesCodigoIngrediente:true, ordem:true, previsto:true}}}
    });
    return { ingredientFound };
  };

  public updateById = async (id: string, recipe: ICreateRecipe) => {
    const foundRecipe = this.getById(id);
    if (!foundRecipe) throw ERR.thisIdDoesNotExist;
    const {codigoReceita, descricaoReceita, ingredientes} = recipe;
    const updatedIngredient = await prismaClient.receitas.update({
      where: { id: parseInt(id) },
      data: {
        codigoReceita,
        descricaoReceita,
        ingredientes: { }
      },
      include: { ingredientes: true}
    });
    return { updatedIngredient };
  };

  public deleteById = async (id: string) => {
    console.log("id = ", id)
    const deletedData = await prismaClient.receitas.delete({
      where: { id: parseInt(id) },
    });
    return { deletedData };
  };
}