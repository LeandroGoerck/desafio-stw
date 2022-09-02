import { prismaClient } from "../database/prismaClient";
import IIngredient from "../interfaces/IIngredient";
import ERR from "./errors";

export default class IngredientsService {
  public create = async (ingredient: IIngredient) => {
    const { codigoIngrediente, descricaoIngrediente } = ingredient;
    const ingredientsData = await prismaClient.ingredientes.create({
      data: {
        codigoIngrediente,
        descricaoIngrediente,
      },
    });
    return { ingredientsData };
  };

  public getAll = async () => {
    const ingredientsData = await prismaClient.ingredientes.findMany();
    return { ingredientsData };
  };

  public getById = async (id: string) => {
    const ingredientFound = await prismaClient.ingredientes.findFirst({
      where: { id: parseInt(id) },
    });
    return { ingredientFound };
  };

  public updateById = async (id: string, ingredient: IIngredient) => {
    const foundIngredient = this.getById(id);
    if (!foundIngredient) throw ERR.thisIdDoesNotExist;
    const { codigoIngrediente, descricaoIngrediente } = ingredient;
    const updatedIngredient = await prismaClient.ingredientes.update({
      where: { id: parseInt(id) },
      data: {
        codigoIngrediente,
        descricaoIngrediente,
      },
    });
    return { updatedIngredient };
  };

  public deleteById = async (id: string) => {
    const deletedData = await prismaClient.ingredientes.delete({
      where: { id: parseInt(id) },
    });
    return { deletedData };
  };
}
