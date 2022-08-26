

import { NextFunction, request, Request, Response } from 'express';
import RecipesService from '../services/recipesService';

export default class RecipesController {
  public service = new RecipesService();

  public create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { codigoReceita, descricaoReceita, ingredientes } = req.body;
      const createdRecipes = await this.service.create({codigoReceita, descricaoReceita, ingredientes});

      return res.status(201).json(createdRecipes);
    } catch (error) {
      next(error);
    }
  }

  public getAll = async (_req: Request, res: Response, next: NextFunction) => {
    try {
         const recipesData = await this.service.getAll();

        return res.status(200).json(recipesData);
    } catch (error) {
      next(error);
    }
  }

  public getById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const ingredientFound = await this.service.getById(id as string);

      return res.status(200).json(ingredientFound);
    } catch (error) {
      next(error);
    }
  }

  public updateById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id, codigoReceita, descricaoReceita, ingredientes } = req.body;
      const updatedIngredient = await this.service.updateById(id as string, {codigoReceita, descricaoReceita, ingredientes});

      return res.status(200).json(updatedIngredient);
    } catch (error) {
      next(error);
    }
  }

  public deleteById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.body;
      const deletedData = await this.service.deleteById(id as string);

      return res.status(200).json(deletedData);
    } catch (error) {
      next(error);
    }
  }

  public addIngredient = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const {receitasCodigoReceita, ingredientesCodigoIngrediente, previsto, ordem} = req.body;
      const createdIngredient = await this.service.addIngredient({receitasCodigoReceita, ingredientesCodigoIngrediente, previsto, ordem});

      return res.status(201).json(createdIngredient);
    } catch (error) {
      next(error);
    }
  }

  public removeIngredient = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const {id} = req.body;
      const removedIngredient = await this.service.removeIngredient(id);

      return res.status(200).json(removedIngredient);
    } catch (error) {
      next(error);
    }
  }  

  public updateIngredientById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const {receitasCodigoReceita, ingredientesCodigoIngrediente, previsto, ordem} = req.body;
      const updatedIngredient = await this.service.updateIngredient( parseInt(id), {receitasCodigoReceita, ingredientesCodigoIngrediente, previsto, ordem});

      return res.status(200).json(updatedIngredient);
    } catch (error) {
      next(error);
    }
  }  
}