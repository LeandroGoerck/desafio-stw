import express from 'express';

import RecipesController from '../controllers/recipesController';

const recipesController = new RecipesController();

const router = express.Router();

router.post('/', recipesController.create);
router.get('/', recipesController.getAll);
router.get('/:id', recipesController.getById);
router.put('/', recipesController.updateById);
router.delete('/', recipesController.deleteById);

export default router;