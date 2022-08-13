import { prismaClient } from "../database/prismaClient";
import IIngredient from "../interfaces/IIngredient";

export default class IngredientsService {

  public create = async (ingredient: IIngredient) => {
    const {codigoIngrediente, descricaoIngrediente} = ingredient;
    const ingredientsData = await prismaClient.ingredientes.create({
      data: {
        codigoIngrediente,
        descricaoIngrediente,
      }
    });
    return { ingredientsData };
  };

  public getAll = async () => {
    const ingredientsData = await prismaClient.ingredientes.findMany();
    return { ingredientsData };
  };
}