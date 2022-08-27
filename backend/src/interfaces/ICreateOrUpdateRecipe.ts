import IRecipe from "./IRecipe";

interface ICreateOrUpdateRecipe extends IRecipe{
  ingredientes: [ {ingredientesCodigoIngrediente: string, ordem: number, previsto: number, id: number} ]
}

export default ICreateOrUpdateRecipe;