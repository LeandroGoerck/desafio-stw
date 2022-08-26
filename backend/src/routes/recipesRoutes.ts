import express from 'express';

import RecipesController from '../controllers/recipesController';

const recipesController = new RecipesController();

const router = express.Router();

router.post('/', recipesController.create);
router.get('/', recipesController.getAll);
router.get('/:id', recipesController.getById);
router.put('/', recipesController.updateById);
router.delete('/', recipesController.deleteById);

router.post('/ingredient', recipesController.addIngredient);
router.delete('/ingredient', recipesController.removeIngredient);
router.put('/ingredient/:id', recipesController.updateIngredientById);

export default router;