import savedModel from '../model/saved.model.js';

const savedController = {  
  getAll: async (req, res) => {
    try {
      const result = await savedModel.selectAll();
      res.status(200);
      res.json({
        message: 'Get all saved recipe success',
        data: result
      });
    } catch(err) {
      res.json({ message: err.message });
    }
  },

  getByUserId: async (req, res) => {
    try {
      const { user_id } = req.params;
      const result = await savedModel.selectByUserId(user_id);
      res.status(200);
      res.json({
        message: 'Get saved recipe by user id success',
        data: result
      });
    } catch(err) {
      res.json({ message: err.message });
    }
  },

  isSave: async (req, res) => {
    try {
      const { user_id, recipe_id } = req.body;
      const result = await savedModel.isSave(user_id, recipe_id);
      res.status(200);
      (result.rowCount) ? res.json({ message: true }) : res.json({ message: false });            
    } catch(err) {
      res.json({ message: err.message });
    }
  },

  saveRecipe: async (req, res) => {
    try {
      const { user_id, recipe_id } = req.body;
      const result = await savedModel.insert(user_id, recipe_id);
      res.status(200);
      res.json({
        message: 'Save recipe success',
        data: result
      });           
    } catch(err) {
      res.json({ message: err.message });
    }
  },

  unSave: async (req, res) => {
    try {
      const { user_id, recipe_id } = req.body;
      const result = await savedModel.delete(user_id, recipe_id);
      res.status(200);
      res.json({
        message: 'Unsave success',
        data: result
      });           
    } catch(err) {
      res.json({ message: err.message });
    }
  },
};

export default savedController;