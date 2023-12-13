import likedModel from "../model/liked.model.js";

const likedController = {  
  getAll: async (req, res) => {
    try {
      const result = await likedModel.selectAll();
      res.status(200);
      res.json({
        message: "Get all liked recipe success",
        data: result
      });
    } catch(err) {
      res.json({ message: err.message });
    }
  },
};

export default likedController;