const userModel = require("../model/user.model");
const generateToken = require("../helper/jwt");
const bcrypt = require("bcrypt");
const redis = require("../config/redis");
const cloudinary = require("../helper/cloudinary");

const userController = {
  selectAll: (req, res) => {
    userModel.selectAll()
      .then((result) => {
        res.json({message: result});
      })
      .catch((err) => {
        res.json({message: err.message});
      });
  },

  register: async (req, res) => {
    const {id, email, password, name, phone, level} = req.body;
    // const photo = req.file.filename;
    const photo = await cloudinary.uploader.upload(req.file.path);
    bcrypt.hash(password, 10, function (err, hash) {
      // store hash password in your DB
      if (err) {
        res.json({message: "error hash password"});
      } else {
        const data = {
          id, 
          email,
          password: hash,
          name,
          phone,
          photo: photo.public_id,
          level          
        };

        userModel.insert(data)
          .then((result) => {
            res.json({
              Data: result, 
              message : "Data berhasil di input"
            });
          })
          .catch((err) => {
            res.json({ message: err.message});
          });
      }
    });
  },

  insert: (req, res) => {
    const {email, password, name, phone, photo, level} = req.body;
    bcrypt.hash(password, 10, function (err, hash) {
      // store hash password in your DB
      // console.log(err.message);
      if (err) {
        res.json({message: "error hash password"});
      } else {
        const data = {
          email,
          password: hash,
          name,
          phone,
          photo,
          level          
        };

        userModel.insert(data)
          .then((result) => {
            res.json({
              Data: result, 
              message : "Data berhasil di input"
            });
          })
          .catch((err) => {
            res.json({ message: err.message});
          });
      }
    });
  },

  update: (req, res) => {
    const {id} = req.params;
    const {email, password, name, phone, photo} = req.body;
    userModel.update(id, email, password, name, phone, photo)
      .then((result) => {
        res.json({
          Data: result, 
          message : "Data berhasil di ubah"
        });
      })
      .catch((err) => {
        res.json({ message: err.message});
      });
  },

  destroy : (req,res) => {
    const {id} = req.params;
    // delete image in cloudinary
    userModel.selectById(id)
      .then((data) => {
        const photo = data.rows[0].photo;
        cloudinary.uploader.destroy(photo, function(result) { console.log(result); });
        // res.json({message: data});
      })
      .catch((err) => {
        // res.json({message: err.message});
      });

    userModel.delete(id)
      .then((result) => {
        res.json({
          Data: result, 
          message : "Data berhasil di hapus"
        });
      })
      .catch((err) => {
        res.json({ message: err.message});
      });
  },

  login: (req, res) => {
    const { email, password } = req.body;
    userModel.login(email)
      .then((data) => {
        if (data.rowCount > 0) {
          const userPassword = data.rows[0].password;
          const userLevel = data.rows[0].level;
          bcrypt.compare(password, userPassword)
            .then(async (result) => {
              if (result) {             
                const token = await generateToken({
                  userLevel
                });
                res.json({            
                  message: "LOGIN BERHASIL",
                  generateToken: token
                });                
              } else {
                res.json({
                  message: "LOGIN GAGAL"
                });
              }
            });
        } else {
          res.json({
            message: "LOGIN GAGAL"
          });
        }      
      });
  },

  getById: (req, res) => {
    const id = req.params.id;
    userModel.selectById(id)
      .then((result) => {
        const dataRedis = redis.set(`getFromRedis/${id}`, JSON.stringify(result), {
          EX: 180,
          NX: true
        });
        res.send({
          fromCache: false,
          data: dataRedis
        });
      })
      .catch((err) => {
        res.json({message: err.message});
      });
  }  
};

module.exports = userController;