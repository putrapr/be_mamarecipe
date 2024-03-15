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
        rowCount: result.rowCount,
        data: result.rows
      });
    } catch(err) {
      res.json({ message: err.message });
    }
  },

  getById: async (req, res) => {
    try {
      const result = await userModel.selectById(req.userId);
      res.status(200);
      res.json({
        message: 'Get user by id success',
        rowCount: result.rowCount,
        data: result.rows[0]
      });
    } catch(err) {
      res.json({ message: err.message });
    }
  },

  login: async (req, res) => {
    try {
      const {email, password} = req.body;      
      const result = await userModel.findByEmail(email);
      if (result.rowCount != 0) {
        const userPass = result.rows[0].password;
        compare(password, userPass, function(err, resultCompare) {
          if (resultCompare) {
            res.status(200);
            const id = result.rows[0].id
            const token = jwt.sign(
              { id }, 
              process.env.SECRET_KEY, 
              { expiresIn: '1h' }
            );
            res.json({
              message: 'Login success',
              id,
              token
            });
          } else {     
            res.status(401)
            res.json({ message: 'Wrong email / password' })
          }        
        });
      } else {
        res.status(401)
        res.json({ message: 'Wrong email / password' })
      }      
    } catch(err) {
      res.status(500)
      res.json({ message: err.message });
    }
  },

  register: async (req, res) => {
    try {
      const { email, password, name, phone, image} = req.body;
      const { rowCount } = await userModel.findByEmail(email);
      if (rowCount)
        return res.status(401).json({message: 'Email is registered'})

      hash(password, 10, async function (error, hash) {
        if (error) {
          res.status(500);
          res.json({ message: error.message });
        } else {
          const result = await userModel.register(email, hash, name, phone, image);
          res.status(200);
          res.json({
            message: 'Create User Success',
            data: result
          });
        }
      });      
    } catch(err) {
      res.status(500)
      res.json({ message: err.message });
    }
  },

  update: async (req, res) => {
    try {
      const { id } = req.params;
      const { email, password, name, phone } = req.body;
      hash(password, 10, async function (error, hash) {
        if (error)
          res.json({ message: 'error hash password' });
        else {
          const result = await userModel.update(email, hash, name, phone, id);
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

  updateName: async (req, res) => {
    try {
      const { id } = req.params;
      const { name } = req.body;
      await userModel.updateName(name, id)
      res.status(200)
      res.json({
        message: 'Change name success',        
      })
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
      await userModel.updateImage(image.url, id);
      res.status(200);
      res.json({
        message: 'Update image success'
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