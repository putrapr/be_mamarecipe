import db from "../config/db.js";

const commentModel = {
  selectByRecipeId: (recipe_id) => {
    try { return db.query(`SELECT * FROM comments JOIN users ON comments.user_id=users.id 
      WHERE recipe_id = ${recipe_id} ORDER BY id_comment DESC`); }
    catch(err) { console.log(err.message); }     
  },

  selectPaginate: () => {
    try { return db.query("SELECT COUNT(*) AS total FROM comments"); }
    catch(err) { console.log(err.message); }     
  },

  pagination: (recipe_id, limit, offset, sort) => {
    try {
      let query = `SELECT id_comment, recipe_id, user_id, name, comment, timestamp 
        FROM comments 
        JOIN users ON comments.user_id=users.id
        WHERE recipe_id = ${recipe_id} 
        ORDER BY id_comment DESC 
        LIMIT ${limit} OFFSET ${offset}`;
      if (sort) {
        sort = sort.toUpperCase();
        if (sort == "ASC" || sort == "DESC")
          query = `SELECT id_comment, recipe_id, user_id, name, comment, timestamp 
            FROM comments 
            JOIN users ON comments.user_id=users.id
            WHERE recipe_id = ${recipe_id} 
            ORDER BY timestamp ${sort} 
            LIMIT ${limit} OFFSET ${offset}`;
      }
      return db.query(query); 
    } catch(err) { console.log(err.message); }     
  },

  insert: (user_id, recipe_id, comment) => {
    try { return db.query(`INSERT INTO comments (user_id, recipe_id, comment, timestamp) 
      VALUES (${user_id}, ${recipe_id}, '${comment}', current_timestamp)`); }
    catch(err) { console.log(err.message); }
  },

  delete: (id) => {
    try { return db.query(`DELETE FROM comments WHERE id_comment='${id}'`); }
    catch(err) { console.log(err.message); }   
  },
};

export default commentModel;