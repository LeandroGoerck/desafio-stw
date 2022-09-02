import { prismaClient } from "../database/prismaClient";
import ICreateRecipe from "../interfaces/ICreateRecipe";
import ERR from "./errors";
import ICreateOrUpdateRecipe from "../interfaces/ICreateOrUpdateRecipe";

export default class RecipesService {
  public create = async (recipe: ICreateRecipe) => {
    const { codigoReceita, descricaoReceita, ingredientes } = recipe;
    const recipesData = await prismaClient.receitas.create({
      data: {
        codigoReceita,
        descricaoReceita,
        ingredientes: { create: ingredientes },
      },
    });
    return { recipesData };
  };

  public getAll = async () => {
    const recipesData = await prismaClient.receitas.findMany({
      include: {
        ingredientes: {
          select: {
            id: true,
            ordem: true,
            previsto: true,
            ingredientes: {
              select: {
                id: true,
                codigoIngrediente: true,
                descricaoIngrediente: true,
              },
            },
          },
        },
      },
    });
    return { recipesData };
  };

  public getById = async (id: string) => {
    console.log(id);
    const recipeFound = await prismaClient.receitas.findFirst({
      where: { id: parseInt(id) },
      include: {
        ingredientes: {
          select: {
            id: true,
            ordem: true,
            previsto: true,
            ingredientes: {
              select: {
                id: true,
                codigoIngrediente: true,
                descricaoIngrediente: true,
              },
            },
          },
        },
      },
    });
    return { recipeFound };
  };

  public updateById = async (id: string, recipe: ICreateRecipe) => {
    const foundRecipe = this.getById(id);
    if (!foundRecipe) throw ERR.thisIdDoesNotExist;
    const { codigoReceita, descricaoReceita, ingredientes } = recipe;
    const updatedIngredient = await prismaClient.receitas.update({
      where: { id: parseInt(id) },
      data: {
        codigoReceita,
        descricaoReceita,
        ingredientes: {},
      },
      include: { ingredientes: true },
    });
    return { updatedIngredient };
  };

  public deleteById = async (id: string) => {
    const recipeFound = await prismaClient.receitas.findUnique({
      where: { id: parseInt(id) },
    });

    if (recipeFound?.id !== null) {
      await prismaClient.receitasTemIngredientes.deleteMany({
        where: { receitasCodigoReceita: recipeFound?.codigoReceita },
      });
      const deletedData = await prismaClient.receitas.delete({
        where: { id: parseInt(id) },
      });

      return { deletedData };
    }
  };

  public createOrUpdate = async (id: number, recipe: ICreateOrUpdateRecipe) => {
    const { codigoReceita, descricaoReceita, ingredientes } = recipe;

    if (id > 0) {
      const recipeFound = await prismaClient.receitas.findUnique({
        where: { id },
      });

      if (recipeFound?.id !== null) {
        await prismaClient.receitasTemIngredientes.deleteMany({
          where: { receitasCodigoReceita: codigoReceita },
        });
        await prismaClient.receitas.delete({
          where: { codigoReceita },
        });

        const createdRecipeData = await prismaClient.receitas.create({
          data: {
            id: id,
            codigoReceita,
            descricaoReceita,
            ingredientes: { create: ingredientes },
          },
        });

        return { recipesData: createdRecipeData };
      }
    } else {
      const createdRecipeData = await prismaClient.receitas.create({
        data: {
          codigoReceita,
          descricaoReceita,
          ingredientes: { create: ingredientes },
        },
      });
      return { recipesData: createdRecipeData };
    }
  };
}
