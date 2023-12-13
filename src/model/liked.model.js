/* eslint-disable quotes */
import db from "../config/db.js";

const likedModel = {
  selectAll: () => {
    try { 
      return db.query(`SELECT id_liked, name, title FROM liked_recipes 
        JOIN users   ON liked_recipes.user_id   = users.id 
        JOIN recipes ON liked_recipes.recipe_id = recipes.id`); 
    }
    catch(err) { console.log(err.message); }     
  },
};

export default likedModel;