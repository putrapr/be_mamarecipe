/* eslint-disable quotes */
import db from "../config/db.js";

const savedModel = {
  selectAll: () => {
    try { 
      return db.query(`SELECT 
        id_saved, 
        name AS username, 
        title AS recipe 
          FROM saved_recipes 
          JOIN users   ON saved_recipes.user_id   = users.id 
          JOIN recipes ON saved_recipes.recipe_id = recipes.id
          ORDER BY name`); 
    }
    catch(err) { console.log(err.message); }     
  },

  selectByUserId: (user_id) => {
    try { 
      return db.query(`SELECT 
        id_saved, 
        saved_recipes.user_id, 
        recipe_id, 
        title, 
        image 
          FROM saved_recipes 
          JOIN recipes ON saved_recipes.recipe_id = recipes.id
          WHERE saved_recipes.user_id = ${user_id}
          ORDER BY recipe_id DESC`); 
    }
    catch(err) { console.log(err.message); }     
  },

  isSave: ( user_id, recipe_id ) => {
    try { return db.query(`SELECT * FROM saved_recipes 
      WHERE user_id = ${user_id} AND recipe_id = ${recipe_id}`); }
    catch(err) { console.log(err.message); }     
  },

  insert: ( user_id, recipe_id ) => {
    try { return db.query(`INSERT INTO saved_recipes (user_id, recipe_id)
      VALUES (${user_id}, ${recipe_id})`); }
    catch(err) { console.log(err.message); }     
  },

  delete: ( user_id, recipe_id ) => {
    try { return db.query(`DELETE FROM saved_recipes 
      WHERE user_id = ${user_id} AND recipe_id = ${recipe_id}`); }
    catch(err) { console.log(err.message); }     
  },
};

export default savedModel;