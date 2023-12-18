/* eslint-disable no-unused-vars */
import userModel from "../model/user.model.js";
import bcrypt from "bcrypt";
const { hash, compare } = bcrypt;
import cloudinary from "../helper/cloudinary.js";
import getPublicId from "../helper/getPublicId.js";
// import generateToken from "../helper/jwt.js";
// import redis from "../config/redis.js";


const userController = {
  getAll: async (req, res) => {
    try {
      const result = await userModel.selectAll();
      res.status(200);
      res.json({
        message: "Get all user success",
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
        message: "Get user by id success",
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
            res.json({
              message: "Login success",
              data: result
            });
          } else res.json({ message: "Wrong email / password" });          
        });
      } else res.json({ message: "Wrong email / password" });      
    } catch(err) {
      res.json({ message: err.message });
    }
  },

  register: async (req, res) => {
    try {
      const { email, password, name, phone, image, role } = req.body;
      hash(password, 10, async function (error, hash) {
        if (error)
          res.json({ message: "error hash password" });
        else {
          const result = await userModel.register(email, hash, name, phone, image, role);
          res.status(200);
          res.json({
            message: "Create User Success",
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
          res.json({ message: "error hash password" });
        else {
          const result = await userModel.update(email, hash, name, phone, role, id);
          res.status(200);
          res.json({
            message: "Update User Success",
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
      // console.log(req.file.path);
      const recipe = await userModel.selectById(id);
      const imageUrl = recipe.rows[0].image;
      if (imageUrl != "default.jpg") 
        cloudinary.uploader.destroy("mamarecipe/users/"+getPublicId(imageUrl));        
      
      image = await cloudinary.uploader.upload(req.file.path, {folder: "mamarecipe/users"});
      const result = await userModel.updateImage(image.url, id);
      res.status(200);
      res.json({
        message: "Update image success",
        data: result
      });

    } catch(err) { 
      res.json({ message: err.message });
    }    
  },

  destroy: async (req, res) => {
    try {
      const { id } = req.params;
      const result = await userModel.delete(id);
      res.status(200);
      res.json({
        message: "Delete user success",
        data: result
      });
    } catch(err) {
      res.json({ message: err.message });
    }
  },


  // register: async (req, res) => {
  //   const {email, password, name, phone, level} = req.body;
  //   // const photo = req.file.filename;
  //   const image = await cloudinary.uploader.upload(req.file.path);
  //   hash(password, 10, function (err, hash) {
  //     // store hash password in your DB
  //     if (err) {
  //       res.json({message: "error hash password"});
  //     } else {
  //       const data = {          
  //         email,
  //         password: hash,
  //         name,
  //         phone,
  //         image: image.url,
  //         level          
  //       };

  //       userModel.insert(data)
  //         .then((result) => {
  //           res.json({
  //             Data: result, 
  //             message : "Data berhasil di input"
  //           });
  //         })
  //         .catch((err) => {
  //           res.json({ message: err.message});
  //         });
  //     }
  //   });
  // },

  // update: (req, res) => {
  //   const {id} = req.params;
  //   const {email, password, name, phone, image} = req.body;
  //   userModel.update(id, email, password, name, phone, image)
  //     .then((result) => {
  //       res.json({
  //         Data: result, 
  //         message : "Data berhasil di ubah"
  //       });
  //     })
  //     .catch((err) => {
  //       res.json({ message: err.message});
  //     });
  // },

  // updateImage: async (req, res) => {
  //   const id = req.params.id;
  //   const image = await cloudinary.uploader.upload(req.file.path);
    
  //   try {
  //     userModel.updateImage(id, image.url)
  //       .then((result) => {
  //         res.json({
  //           Data: result, 
  //           message : "Image updated!"
  //         });
  //       })
  //       .catch((err) => {
  //         res.json({ message: err.message});
  //       });
  //   } catch(err) {
  //     console.log(err.message);
  //   }
  // },

  // destroy : (req,res) => {
  //   const {id} = req.params;
  //   // delete image in cloudinary
  //   userModel.selectById(id)
  //     .then((data) => {
  //       // Mengambil public_id dari image_url
  //       const imageUrl = data.rows[0].image;  // http://res.cloudinary.com/dzpf9unc5/image/upload/v1696776828/fcsedax625wudqmfvxfd.jpg      
  //       let tempArray = imageUrl.split("/");
  //       const image = tempArray[tempArray.length - 1].toString(); // fcsedax625wudqmfvxfd.jpg
  //       tempArray = image.split(".");
  //       const public_id = tempArray[0]; // fcsedax625wudqmfvxfd

  //       cloudinary.uploader.destroy(public_id, function(result) { console.log(result); });

  //       userModel.delete(id)
  //         .then((result) => {
  //           res.json({
  //             Data: result, 
  //             message : "Data berhasil di hapus"
  //           });
  //         })
  //         .catch((err) => {
  //           res.json({ message: err.message});
  //         });
  //     })
  //     .catch((err) => {    
  //       res.json({message: err.message});
  //     });
  // },

  // login: (req, res) => {
  //   const { email, password } = req.body;
  //   userModel.login(email)
  //     .then((data) => {
  //       if (data.rowCount > 0) {
  //         const userPassword = data.rows[0].password;
  //         const userLevel = data.rows[0].level;
  //         compare(password, userPassword)
  //           .then(async (result) => {
  //             if (result) {             
  //               const token = await generateToken({
  //                 userLevel
  //               });
  //               res.json({            
  //                 message: "LOGIN BERHASIL",
  //                 generateToken: token
  //               });                
  //             } else {
  //               res.json({
  //                 message: "LOGIN GAGAL"
  //               });
  //             }
  //           });
  //       } else {
  //         res.json({
  //           message: "LOGIN GAGAL"
  //         });
  //       }      
  //     });
  // },

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