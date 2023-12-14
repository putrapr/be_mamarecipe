import commentModel from "../model/comment.model.js";

const commentController = {  
  getByRecipeId: async (req, res) => {
    try {
      const { recipe_id } = req.params;
      const result = await commentModel.selectByRecipeId(recipe_id);
      res.status(200);
      res.json({
        message: "Get comment by recipe id success",
        data: result
      });
    } catch(err) {
      res.json({ message: err.message });
    }
  },

  pagination: async (req, res) => {
    try {
      const { recipe_id } = req.params;
      const {limit, page, sort} = req.query;
      const pageValue = page ? Number(page) : 1;
      const limitValue = limit ? Number(limit) : 4;
      const offsetValue = pageValue === 1 ? 0 : (pageValue-1) * limitValue;
  
      // total page
      const allData = await commentModel.selectPaginate();
      const totalData = Number(allData.rows[0].total);

      const result = await commentModel.pagination(recipe_id, limitValue, offsetValue, sort);
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
      const { user_id, recipe_id, comment } = req.body;
      const result = await commentModel.insert(user_id, recipe_id, comment);      
      res.status(200);
      res.json({
        message: "Add comment success",
        data: result
      });
    } catch(err) {
      res.json({ message: err.message });
    }
  },

  destroy: async (req, res) => {
    try {
      const { id } = req.params;
      const result = await commentModel.delete(id);
      res.status(200);
      res.json({
        message: "Delete comment success",
        data: result
      });
    } catch(err) {
      res.json({ message: err.message });
    }
  },
};

export default commentController;