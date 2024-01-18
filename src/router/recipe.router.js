import express from 'express';
const router = express.Router();
import recipeController from '../controller/recipe.controller.js';
const { getAll, getById, getByUserId, getOne, search, pagination, insert, update, destroy } = recipeController;
import upload from '../middleware/uploadMiddleware.js';
import auth from '../middleware/authMiddleware.js';

router
  .get('/recipes', getAll)
  .get('/recipes-pagination', pagination)
  .get('/recipe/:id', getById)  
  .get('/recipe-user', auth, getByUserId)
  .get('/recipe-one', getOne)
  .get('/recipe-search', search)  
  .post('/recipe', auth, upload, insert)
  .put('/recipe/:id', upload, update)
  .delete('/recipe/:id', destroy);

export default router;