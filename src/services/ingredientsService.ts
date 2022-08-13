import { prismaClient } from "../database/prismaClient";

export default class IngredientsService {
  public getAll = async () => {
    const ingredientsData = await prismaClient.ingredientes.findMany();
    return { ingredientsData };
  };
}