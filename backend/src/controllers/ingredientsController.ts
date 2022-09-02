import { NextFunction, Request, Response } from "express";
import IngredientsService from "../services/ingredientsService";

export default class IngredientsController {
  public service = new IngredientsService();

  public create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { codigoIngrediente, descricaoIngrediente } = req.body;
      const createdIngredients = await this.service.create({
        codigoIngrediente,
        descricaoIngrediente,
      });

      return res.status(201).json(createdIngredients);
    } catch (error) {
      next(error);
    }
  };

  public getAll = async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const ingredientsData = await this.service.getAll();

      return res.status(200).json(ingredientsData);
    } catch (error) {
      next(error);
    }
  };

  public getById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const ingredientFound = await this.service.getById(id as string);

      return res.status(200).json(ingredientFound);
    } catch (error) {
      next(error);
    }
  };

  public updateById = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { id } = req.params;
      const { codigoIngrediente, descricaoIngrediente } = req.body;
      const updatedIngredient = await this.service.updateById(id as string, {
        codigoIngrediente,
        descricaoIngrediente,
      });

      return res.status(200).json(updatedIngredient);
    } catch (error) {
      next(error);
    }
  };

  public deleteById = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { id } = req.body;
      const deletedData = await this.service.deleteById(id as string);

      return res.status(200).json(deletedData);
    } catch (error) {
      next(error);
    }
  };
}
