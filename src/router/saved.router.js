import express from 'express';
const router = express.Router();
import savedController from '../controller/saved.controller.js';
const { getAll, getByUserId, isSave, saveRecipe, unSave } = savedController;

router
  .get('/saved', getAll)
  .get('/saved/:user_id', getByUserId)
  .post('/saved-check', isSave)
  .post('/saved', saveRecipe)
  .delete('/saved', unSave);

export default router;