const recipeModel = require("../model/recipe.model");
const cloudinary = require("../helper/cloudinary");

const recipeController = {
  selectAll: (req, res) => {
    recipeModel.selectAll()
      .then((result) => {
        res.json({message: result});
      })
      .catch((err) => {
        res.json({message: err.message});
      });
  },

  getById: (req, res) => {
    const id = req.params.id;
    
    recipeModel.selectById(id)
    .then((result) => {
      res.json({message: result});
    })
    .catch((err) => {
      res.json({message: err.message});
    });
  },

  search: (req, res) => {
    const keyword = req.params.keyword;
    console.log(keyword);
    recipeModel.search(keyword)
    .then((result) => {
      res.json({message: result});
    })
    .catch((err) => {
      res.json({message: err.message});
    });
  },

  insert: async (req, res) => {
    const {user_id, title, ingredient} = req.body;
    const image = await cloudinary.uploader.upload(req.file.path);
    const image_id = image.public_id;
    const image_url = image.url;
    recipeModel.insert(user_id, title, ingredient, image_id, image_url)
      .then((result) => {
        res.json({
          Data: result, 
          message : "Data berhasil di input"
        });
      })
      .catch((err) => {
        res.json({ message: err.message});
      });
  },

  // insert: (req, res) => {
  //   const {id, user_id, title, image, ingredient} = req.body;
  //   recipeModel.insert(id, user_id, title, image, ingredient)
  //     .then((result) => {
  //       res.json({
  //         Data: result, 
  //         message : "Data berhasil di input"
  //       });
  //     })
  //     .catch((err) => {
  //       res.json({ message: err.message});
  //     });
  // },

  update: (req, res) => {
    const {id} = req.params;
    const {user_id, title, image, ingredient} = req.body;
    recipeModel.update(id, user_id, title, image, ingredient)
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
    recipeModel.delete(id)
      .then((result) => {
        res.json({
          Data: result, 
          message : "Data berhasil di hapus"
        });
      })
      .catch((err) => {
        res.json({ message: err.message});
      });
  }
};

module.exports = recipeController;