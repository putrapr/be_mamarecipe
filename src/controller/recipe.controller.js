import recipeModel from '../model/recipe.model.js';
import cloudinary from '../helper/cloudinary.js';
import getPublicId from '../helper/getPublicId.js';

const recipeController = {
  getAll: async (req, res) => {
    try {
      const result = await recipeModel.selectAll();
      res.status(200);
      res.json({
        message: 'Get all recipe success',
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
        message: 'Get recipe by id success',
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
        message: 'Search success',
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
        message: 'Pagination success',
        data: pagination
      });
    } catch(err) {
      res.json({ message: err.message });
    }
  },

  insert: async (req, res) => {
    try {    
      const {user_id, title, ingredient, video_link} = req.body;
      const image = await cloudinary.uploader.upload(req.file.path, {folder: 'mamarecipe/recipes'});
      const result = await recipeModel.insert(user_id, title, ingredient, image.url, video_link);
      res.status(200);
      res.json({
        message: 'Insert success',
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
      user_id,
      title,
      image,
      ingredient, 
      video_link,
      id
    };

    try {
      if (req.file) { // if image uploaded
        const recipe = await recipeModel.selectById(id);
        const imageUrl = recipe.rows[0].image;
        cloudinary.uploader.destroy('mamarecipe/recipes/'+getPublicId(imageUrl));
        image = await cloudinary.uploader.upload(req.file.path, {folder: 'mamarecipe/recipes'});

        // update imageUrl
        newData = {
          ...newData,
          image : image.url,
        };
      }
      const result = await recipeModel.update(newData);
      res.status(200);
      res.json({
        message: 'Update success',
        data: result
      });

    } catch(err) { 
      res.json({ message: err.message });
    }    
  },

  destroy: async (req, res) => {
    try {
      const { id } = req.params;      
      const recipe = await recipeModel.selectById(id);
      const imageUrl = recipe.rows[0].image;
      cloudinary.uploader.destroy('mamarecipe/recipes/'+getPublicId(imageUrl));

      const result = await recipeModel.delete(id);
      res.status(200);
      res.json({
        message: 'Delete recipe success',
        data: result
      });
    } catch(err) {
      res.json({ message: err.message });
    }
  },
};

export default recipeController;