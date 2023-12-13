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
      res.json({ message: err.message });
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
      res.json({ message: err.message });
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
      res.json({ message: err.message });
    }
  },

  pagination: async (req, res) => {
    try {
      const {limit, page, sort} = req.query;
      const pageValue = page ? Number(page) : 1;
      const limitValue = limit ? Number(limit) : 4;
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
      res.json({ message: err.message });
    }
  },

  insert: async (req, res) => {
    try {    
      const {user_id, title, ingredient, video_link} = req.body;
      const image = await cloudinary.uploader.upload(req.file.path, {folder: "mamarecipe/recipes"});
      const result = await recipeModel.insert(user_id, title, ingredient, image.url, video_link);
      res.status(200);
      res.json({
        message: "Insert success",
        data: result
      });
    } catch(err) {
      res.json({ message: err.message });
    }
  },

  update: async (req, res) => {
    const { id } = req.params;
    const { user_id, title, ingredient, video_link } = req.body;
    let image;
    let newData = {
      id,
      user_id,
      title,
      image,
      ingredient, 
      video_link
    };    

    try {
      if (req.file) { // if image uploaded
        image = req.file.path;
        const recipe = await recipeModel.selectById(id);

        // update image in cloudinary
        const imageUrl = recipe.rows[0].image;  // http://res.cloudinary.com/dzpf9unc5/image/upload/v1696776828/fcsedax625wudqmfvxfd.jpg      
        let tempArray = imageUrl.split("/");
        image = tempArray[tempArray.length - 1].toString(); // fcsedax625wudqmfvxfd.jpg
        tempArray = image.split(".");
        const public_id = tempArray[0]; // fcsedax625wudqmfvxfd
        cloudinary.uploader.destroy("mamarecipe/recipes/"+public_id);
        image = await cloudinary.uploader.upload(req.file.path, {folder: "mamarecipe/recipes"});

        // update image in database
        newData = {
          ...newData,
          image : image.url,
        };
        const result = await recipeModel.update(newData);
        res.status(200);
        res.json({
          message: "Update success",
          data: result
        });

      } else { // if image not uploaded
        const result = await recipeModel.update(newData);
        res.status(200);
        res.json({
          message: "Update success",
          data: result
        });
      }    

    } catch(err) { 
      res.json({ message: err.message });
    }    
  },

  destroy: async (req, res) => {
    try {
      const { id } = req.params;
      const result = await recipeModel.delete(id);
      res.status(200);
      res.json({
        message: "Delete recipe success",
        data: result
      });
    } catch(err) {
      res.json({ message: err.message });
    }
  },
};

export default recipeController;