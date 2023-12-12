import db from "../config/db.js";

const recipeModel = {
  selectAll: () => {
    try { return db.query("SELECT * FROM recipes"); }
    catch(err) { console.log(err.message); }     
  },

  selectById: (id) => {
    try { return db.query(`SELECT * FROM recipes WHERE id = '${id}'`); }
    catch(err) { console.log(err.message); }     
  },

  search: (keyword) => {
    try { return db.query(`SELECT * FROM recipes WHERE title ILIKE '%${keyword}%'`); }
    catch(err) { console.log(err.message); }     
  },

  selectPaginate: () => {
    try { return db.query("SELECT COUNT(*) AS total FROM recipes"); }
    catch(err) { console.log(err.message); }     
  },

  pagination: (limit, offset, sort) => {
    try {
      let query = `SELECT * FROM recipes ORDER BY id DESC LIMIT ${limit} OFFSET ${offset}`;
      if (sort) {
        sort = sort.toUpperCase();
        if (sort == "ASC" || sort == "DESC")
          query = `SELECT * FROM recipes ORDER BY title ${sort} LIMIT ${limit} OFFSET ${offset}`;
      }
      return db.query(query); 
    } catch(err) { console.log(err.message); }     
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