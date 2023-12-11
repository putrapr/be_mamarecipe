import db from "../config/db.js";

const recipeModel = {
  selectAll: () => {
    return new Promise((resolve, reject) => {
      db.query("SELECT * FROM recipes ORDER BY title", (err, res) => {
        if (err) reject(err);
        else resolve(res);
      });
    });
  },

  selectById: (id) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM recipes WHERE id = '${id}'`, (err, res) => {
        if (err) reject(err);
        else resolve(res);
      });
    });
  },

  search: (keyword) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM recipes WHERE title ILIKE '%${keyword}%'`, (err, res) => {
        if (err) reject(err);
        else resolve(res);
      });
    });
  },

  insert: (user_id, title, ingredient, image, video_link) => {
    return new Promise((resolve, reject) => {
      db.query(`INSERT INTO recipes (user_id, title, ingredient, image, video_link) VALUES ('${user_id}', '${title}', '${ingredient}', '${image}', '${video_link}')`, (err, res) => {
        if (err) reject(err);
        else resolve(res);
      });
    });
  },

  update: ({id, user_id, title, ingredient, image, video_link}) => {
    let query;
    ( image == null ) ?
    query = `UPDATE recipes SET user_id='${user_id}', title='${title}',ingredient='${ingredient}', video_link='${video_link}' WHERE id=${id}`
    :
    query = `UPDATE recipes SET user_id='${user_id}', title='${title}',ingredient='${ingredient}', image='${image}', video_link='${video_link}' WHERE id=${id}` ; 
    return new Promise((resolve, reject) => {      
      db.query(query, (err, res) => {
        if (err) reject(err);
        else resolve(res);
      });
    });
  },

  delete: (id) => {
    return new Promise((resolve, reject) => {
      db.query(`DELETE FROM recipes WHERE id=${id}`, (err, res) => {
        if (err) reject(err);
        else resolve(res);
      });
    });
  },

  
};



export default recipeModel;