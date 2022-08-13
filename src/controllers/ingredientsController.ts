

import { NextFunction, request, Request, Response } from 'express';
import IngredientsService from '../services/ingredientsService';

export default class IngredientsController {
  public service = new IngredientsService();

  public getAll = async (_req: Request, res: Response, next: NextFunction) => {
    try {
         const ingredientsData = await this.service.getAll();

        return res.status(200).json(ingredientsData);
    } catch (error) {
      next(error);
    }
  }
}