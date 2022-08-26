import IAddIngredient from "../interfaces/IAddIngredient";
import { prismaClient } from "../database/prismaClient";
import ICreateRecipe from "../interfaces/ICreateRecipe";
import ERR from './errors';
import ISwapIngredient from "../interfaces/ISwapIngredient";

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
      // {include: { ingredientes: true} });
      // {include: { ingredientes: {select: {ingredientes:true}} }});
      // {include: { ingredientes: {select: { ingredientesCodigoIngrediente:true , ordem:true, previsto:true, ingredientes:{select: { descricaoIngrediente:true }}}} }});
      {include: { ingredientes: {select: { id:true, ordem:true, previsto:true, ingredientes:{select: { id: true, codigoIngrediente:true, descricaoIngrediente:true }}}} }});
      //  { select: { id:true, codigoReceita:true, descricaoReceita:true, ingredientes: true}} );
    return { recipesData };
  };

  public getById = async (id: string) => {
    console.log(id);
    const recipeFound = await prismaClient.receitas.findFirst({
      where: { id: parseInt(id) }, include: { ingredientes: {select: { id: true, ordem:true, previsto:true, ingredientes:{select: { id: true, codigoIngrediente:true, descricaoIngrediente:true }}}} }
    });
    return { recipeFound };
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

  public addIngredient = async (ingredient: IAddIngredient) => {
    const {receitasCodigoReceita, ingredientesCodigoIngrediente, previsto, ordem} = ingredient;
    const ingredientData = await prismaClient.receitasTemIngredientes.create({
      data: {
        receitasCodigoReceita,
        ingredientesCodigoIngrediente,
        previsto,
        ordem,
      },
    });
    return { ingredientData };
  };

  public removeIngredient = async (id:  number ) => {
    const removedIngredient = await prismaClient.receitasTemIngredientes.delete({
      where: { id },
    });
    return { removedIngredient };
  };

  public updateIngredient = async (id:  number, ingredient: IAddIngredient) => {
    const {receitasCodigoReceita, ingredientesCodigoIngrediente, previsto} = ingredient;
    const ingredientData = await prismaClient.receitasTemIngredientes.update({
      where: { id },
      data: {
        receitasCodigoReceita,
        ingredientesCodigoIngrediente,
        previsto,
      },
    });
    return { ingredientData };
  };

  public swapIngredients = async (ingredients: Array<ISwapIngredient>) => {

    const updateFirst = prismaClient.receitasTemIngredientes.update({
      where: { id: ingredients[0].id },
      data: {
        ordem: ingredients[0].ordem,
      },
    });

    const updateSecond = prismaClient.receitasTemIngredientes.update({
      where: { id: ingredients[1].id },
      data: {
        ordem: ingredients[1].ordem,
      },
    });

    await prismaClient.$transaction([updateFirst, updateSecond])

    return [updateFirst, updateSecond];
  };

}


