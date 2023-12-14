/* eslint-disable quotes */
import db from "../config/db.js";

const likedModel = {
  selectAll: () => {
    try { 
      return db.query(`SELECT 
        id_liked, 
        name AS username, 
        title AS recipe 
          FROM liked_recipes 
          JOIN users   ON liked_recipes.user_id   = users.id 
          JOIN recipes ON liked_recipes.recipe_id = recipes.id
          ORDER BY name`); 
    }
    catch(err) { console.log(err.message); }     
  },

  selectByUserId: (user_id) => {
    try { 
      return db.query(`SELECT 
        id_liked, 
        liked_recipes.user_id, 
        recipe_id, 
        title, 
        image 
          FROM liked_recipes 
          JOIN recipes ON liked_recipes.recipe_id = recipes.id
          WHERE liked_recipes.user_id = ${user_id}
          ORDER BY recipe_id DESC`); 
    }
    catch(err) { console.log(err.message); }     
  },

  isLike: ( user_id, recipe_id ) => {
    try { return db.query(`SELECT * FROM liked_recipes 
      WHERE user_id = ${user_id} AND recipe_id = ${recipe_id}`); }
    catch(err) { console.log(err.message); }     
  },

  insert: ( user_id, recipe_id ) => {
    try { return db.query(`INSERT INTO liked_recipes (user_id, recipe_id)
      VALUES (${user_id}, ${recipe_id})`); }
    catch(err) { console.log(err.message); }     
  },

  delete: ( user_id, recipe_id ) => {
    try { return db.query(`DELETE FROM liked_recipes 
      WHERE user_id = ${user_id} AND recipe_id = ${recipe_id}`); }
    catch(err) { console.log(err.message); }     
  },

};

export default likedModel;