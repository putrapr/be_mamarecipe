import recipeModel from "../model/recipe.model.js";
import cloudinary from "../helper/cloudinary.js";

const recipeController = {
  getAll: async (req, res) => {
    try {
      const result = await recipeModel.selectAll();
      res.status(200);
      res.json({
        message: "Get all recipe success",
        data: result
      });
    } catch(err) {
      console.log(err.message);
    }
  },
  
  getById: async (req, res) => {
    try {
      const { id } = req.params;
      const result = await recipeModel.selectById(id);
      res.status(200);
      res.json({
        message: "Get recipe by id success",
        data: result
      });
    } catch(err) {
      console.log(err.message);
    }
  },

  search: async (req, res) => {
    try {
      const { keyword } = req.query;
      const result = await recipeModel.search(keyword);
      res.status(200);
      res.json({
        message: "Search success",
        data: result
      });
    } catch(err) {
      console.log(err.message);
    }
  },

  pagination: async (req, res) => {
    try {
      const {limit, page, sort} = req.query;
      const pageValue = page ? Number(page) : 1;
      const limitValue = limit ? Number(limit) : 2;
      const offsetValue = pageValue === 1 ? 0 : (pageValue-1) * limitValue;
  
      // total page
      const allData = await recipeModel.selectPaginate();
      const totalData = Number(allData.rows[0].total);

      const result = await recipeModel.pagination(limitValue, offsetValue, sort);
      const pagination = {        
        currentPage: pageValue,
        dataperPage: limitValue,
        totalPage: Math.ceil(totalData/limitValue),
        totalData,
        DataPagination: result.rows
      };
      res.status(200);
      res.json({
        message: "Pagination success",
        data: pagination
      });
    } catch(err) {
      console.log(err.message);
    }
  },

  // pagination: async (req, res) => {
  //   const {limit, page} = req.query;
  //   const pageValue = page ? Number(page) : 1;
  //   const limitValue = limit ? Number(limit) :2;
  //   const offsetValue = pageValue === 1 ? 0 : (pageValue-1) * limitValue;

  //   // total page
  //   const allData = await userModel.selectPaginate();
  //   console.log(allData);
  //   const totalData = Number(allData.rows[0].total);

  //   userModel.pagination(limitValue, offsetValue)
  //   .then((result) => {
  //     console.log(result);
  //     const pagination = {        
  //       currentPage: pageValue,
  //       dataperPage: limitValue,
  //       totalPage: Math.ceil(totalData/limitValue),
  //       totalData,
  //       DataPagination: result.rows
  //     };
  //     res.json({
  //       message: "OK",
  //       result: pagination
  //     });
  //   })
  //   .catch((err) => 
  //   res.json({message: err.message}));
  // },

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