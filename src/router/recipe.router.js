import express from 'express';
const router = express.Router();
import recipeController from '../controller/recipe.controller.js';
const { getAll, getById, getByUserId, search, pagination, insert, update, destroy } = recipeController;
import upload from '../middleware/uploadMiddleware.js';

router
  .get('/recipe', getAll)
  .get('/recipe/:id', getById)
  .get('/recipeByUserId/:user_id', getByUserId)
  .get('/recipe-search', search)
  .get('/recipe-pagination', pagination)
  .post('/recipe', upload, insert)
  .put('/recipe/:id', upload, update)
  .delete('/recipe/:id', destroy);

export default router;