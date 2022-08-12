export default class IngredientsService {
  public getAll = async () => {
    const ingredientsData = {
      codigo: 2235,
      descricao: "Milho de teste",
    }
    return { ingredientsData };
  };
}