/* eslint-disable no-unused-vars */
import express from 'express';
const router = express.Router();
import userController from '../controller/user.controller.js';
const { getAll, getById, register, login, update, updateName, updateImage, destroy } = userController;
import upload from '../middleware/uploadMiddleware.js';
import auth from '../middleware/authMiddleware.js';

router
  .get('/users', auth, getAll)
  .get('/user', auth, getById)
  .post('/user', register)
  .post('/user-login', login)
  .put('/user/:id', update)
  .put('/user-name/:id', updateName)
  .put('/user-image/:id', upload, updateImage)
  .delete('/user/:id', destroy);

export default router;