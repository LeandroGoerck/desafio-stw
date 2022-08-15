import express from 'express';

import IngredientsController from '../controllers/ingredientsController';

const ingredientsController = new IngredientsController();

const router = express.Router();

router.post('/', ingredientsController.create);
router.get('/', ingredientsController.getAll);
router.get('/:id', ingredientsController.getById);
router.put('/', ingredientsController.updateById);
router.delete('/', ingredientsController.deleteById);

export default router;