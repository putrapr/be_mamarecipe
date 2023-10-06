const db = require("../config/db");

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

  insert: (user_id, title, ingredient, image_id, image_url) => {
    return new Promise((resolve, reject) => {
      db.query(`INSERT INTO recipes (user_id, title, ingredient, image_id, image_url) VALUES ('${user_id}', '${title}', '${ingredient}', '${image_id}', '${image_url}')`, (err, res) => {
        if (err) reject(err);
        else resolve(res);
      });
    });
  },

  update: (id, user_id, title, image, ingredient) => {
    return new Promise((resolve, reject) => {
      db.query(`UPDATE recipes SET user_id='${user_id}', title='${title}', image='${image}', ingredient='${ingredient}' WHERE id=${id}`, (err, res) => {
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



module.exports = recipeModel;