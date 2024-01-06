import likedModel from '../model/liked.model.js';

const likedController = {  
  getAll: async (req, res) => {
    try {
      const result = await likedModel.selectAll();
      res.status(200);
      res.json({
        message: 'Get all liked recipe success',
        data: result
      });
    } catch(err) {
      res.json({ message: err.message });
    }
  },

  getByUserId: async (req, res) => {
    try {
      const { user_id } = req.params;
      const result = await likedModel.selectByUserId(user_id);
      res.status(200);
      res.json({
        message: 'Get liked recipe by user id success',
        data: result
      });
    } catch(err) {
      res.json({ message: err.message });
    }
  },

  isLike: async (req, res) => {
    try {
      const { user_id, recipe_id } = req.body;
      const result = await likedModel.isLike(user_id, recipe_id);
      res.status(200);
      (result.rowCount) ? res.json({ message: true }) : res.json({ message: false });            
    } catch(err) {
      res.json({ message: err.message });
    }
  },

  addLike: async (req, res) => {
    try {
      const { user_id, recipe_id } = req.body;
      const result = await likedModel.insert(user_id, recipe_id);
      res.status(200);
      res.json({
        message: 'Like recipe success',
        data: result
      });           
    } catch(err) {
      res.json({ message: err.message });
    }
  },

  unLike: async (req, res) => {
    try {
      const { user_id, recipe_id } = req.body;
      const result = await likedModel.delete(user_id, recipe_id);
      res.status(200);
      res.json({
        message: 'Unlike success',
        data: result
      });           
    } catch(err) {
      res.json({ message: err.message });
    }
  },
};

export default likedController;