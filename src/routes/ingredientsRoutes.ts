import express from 'express';

import IngredientsController from '../controllers/ingredientsController';

const ingredientsController = new IngredientsController();

const router = express.Router();

router.get('/', ingredientsController.getAll);
router.post('/', ingredientsController.create);

export default router;