/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import userModel from '../model/user.model.js';
import bcrypt from 'bcrypt';
const { hash, compare } = bcrypt;
import cloudinary from '../helper/cloudinary.js';
import getPublicId from '../helper/getPublicId.js';
import jwt from 'jsonwebtoken';
import 'dotenv/config';
// import redis from "../config/redis.js";


const userController = {
  getAll: async (req, res) => {
    try {
      const result = await userModel.selectAll();
      res.status(200);
      res.json({
        message: 'Get all user success',
        data: result
      });
    } catch(err) {
      res.json({ message: err.message });
    }
  },

  getById: async (req, res) => {
    try {
      const { id } = req.params;
      const result = await userModel.selectById(id);
      res.status(200);
      res.json({
        message: 'Get user by id success',
        data: result
      });
    } catch(err) {
      res.json({ message: err.message });
    }
  },

  login: async (req, res) => {
    try {
      const {email, password} = req.body;      
      const result = await userModel.login(email);
      res.status(200);
      if (result.rowCount != 0) {
        const userPass = result.rows[0].password;
        compare(password, userPass, function(err, resultCompare) {
          if (resultCompare) {
            const token = jwt.sign(
              { id: result.rows[0].id }, 
              process.env.SECRET_KEY, 
              { expiresIn: '1h' }
            );
            res.json({
              message: 'Login success',
              token
            });
          } else res.json({ message: 'Wrong email / password' });          
        });
      } else res.json({ message: 'Wrong email / password' });      
    } catch(err) {
      res.json({ message: err.message });
    }
  },

  register: async (req, res) => {
    try {
      const { email, password, name, phone, image, role } = req.body;
      hash(password, 10, async function (error, hash) {
        if (error)
          res.json({ message: 'error hash password' });
        else {
          const result = await userModel.register(email, hash, name, phone, image, role);
          res.status(200);
          res.json({
            message: 'Create User Success',
            data: result
          });
        }
      });      
    } catch(err) {
      res.json({ message: err.message });
    }
  },

  update: async (req, res) => {
    try {
      const { id } = req.params;
      const { email, password, name, phone, role } = req.body;
      hash(password, 10, async function (error, hash) {
        if (error)
          res.json({ message: 'error hash password' });
        else {
          const result = await userModel.update(email, hash, name, phone, role, id);
          res.status(200);
          res.json({
            message: 'Update User Success',
            data: result
          });
        }
      });      
    } catch(err) {
      res.json({ message: err.message });
    }
  },

  updateImage: async (req, res) => {
    const { id } = req.params;
    let image;
    try {
      const recipe = await userModel.selectById(id);
      const imageUrl = recipe.rows[0].image;
      if (imageUrl != 'default.jpg') 
        cloudinary.uploader.destroy('mamarecipe/users/'+getPublicId(imageUrl));        
      
      image = await cloudinary.uploader.upload(req.file.path, {folder: 'mamarecipe/users'});
      const result = await userModel.updateImage(image.url, id);
      res.status(200);
      res.json({
        message: 'Update image success',
        data: result
      });

    } catch(err) { 
      res.json({ message: err.message });
    }    
  },

  destroy: async (req, res) => {
    try {
      const { id } = req.params;
      const user = await userModel.selectById(id);
      const imageUrl = user.rows[0].image;
      if (imageUrl != 'default.jpg')
        cloudinary.uploader.destroy('mamarecipe/users/'+getPublicId(imageUrl));

      const result = await userModel.delete(id);
      res.status(200);
      res.json({
        message: 'Delete user success',
        data: result
      });
    } catch(err) {
      res.json({ message: err.message });
    }
  },
  
  // getByIdRedis: (req, res) => {
  //   const id = req.params.id;
  //   userModel.selectById(id)
  //     .then((result) => {
  //       const dataRedis = redis.set(`getFromRedis/${id}`, JSON.stringify(result), {
  //         EX: 180,
  //         NX: true
  //       });
  //       res.send({
  //         fromCache: false,
  //         data: dataRedis
  //       });
  //     })
  //     .catch((err) => {
  //       res.json({message: err.message});
  //     });
  // }
};

export default userController;