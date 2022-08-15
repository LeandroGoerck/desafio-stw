import IRecipe from "./IRecipe";

interface ICreateRecipe extends IRecipe{
  ingredientes: [ {ingredientesCodigoIngrediente: string, ordem: number, previsto: number } ]
}

export default ICreateRecipe;