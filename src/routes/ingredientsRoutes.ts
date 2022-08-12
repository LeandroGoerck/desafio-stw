import express from 'express';

import IngredientsController from '../controllers/ingredientsController';

const ingredientsController = new IngredientsController();

const router = express.Router();

router.get('/', ingredientsController.getAll);

export default router;