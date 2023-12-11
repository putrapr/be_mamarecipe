import recipeModel from "../model/recipe.model.js";
import cloudinary from "../helper/cloudinary.js";

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
    const {user_id, title, ingredient, video_link} = req.body;
    const image = await cloudinary.uploader.upload(req.file.path);
    recipeModel.insert(user_id, title, ingredient, image.url, video_link)
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
    const { user_id, title, ingredient, video_link } = req.body;
    let image;
    try {
      image = req.file.path;
      // Jika ada inputan image
      recipeModel.selectById(id)
      .then( async (oldData) => {
        const imageUrl = oldData.rows[0].image;  // http://res.cloudinary.com/dzpf9unc5/image/upload/v1696776828/fcsedax625wudqmfvxfd.jpg      
        let tempArray = imageUrl.split("/");
        image = tempArray[tempArray.length - 1].toString(); // fcsedax625wudqmfvxfd.jpg
        tempArray = image.split(".");
        const public_id = tempArray[0]; // fcsedax625wudqmfvxfd        
        cloudinary.uploader.destroy(public_id, function(result) { console.log(result); });
        image = await cloudinary.uploader.upload(req.file.path);
        const newData = {
          id,
          user_id,
          title,
          image : image.url,
          ingredient, 
          video_link
        };

        recipeModel.update(newData)
          .then((result) => {
            res.json({
              Data: result, 
              message : "Data berhasil diubah"
            });
          })
          .catch((err) => {
            res.json({ message: err.message});
          });
      })
      .catch((err) => {    
        res.json({message: err.message});
      });

    } catch (e) {
      image = null;

      const newData = {
        id,
        user_id,
        title,
        image,
        ingredient, 
        video_link
      };

      recipeModel.update(newData)
          .then((result) => {
            res.json({
              Data: result, 
              message : "Data berhasil diubah"
            });
          })
          .catch((err) => {
            res.json({ message: err.message});
          });
    }
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

export default recipeController;