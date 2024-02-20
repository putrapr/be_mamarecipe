import db from '../config/db.js';

const recipeModel = {
  selectAll: (fieldSort, sortBy, limit) => {
    try {
      let sort='';
      if (fieldSort) {
        if (!sortBy) sortBy = 'ASC';
        else sortBy = sortBy.toUpperCase();
               
        if (sortBy == 'ASC' || sortBy == 'DESC')
          sort = ` ORDER BY ${fieldSort} ${sortBy}`;
      }
      const lim = (limit)? ` LIMIT ${limit}`: '';
      return db.query('SELECT * FROM recipes'+sort+lim); 
    } catch(err) { console.log(err.message); }     
  },

  selectById: (id) => {
    try { return db.query(`SELECT * FROM recipes WHERE id = ${id}`); }
    catch(err) { console.log(err.message); }     
  },

  selectByUserId: (user_id) => {
    try { return db.query(`SELECT * FROM recipes WHERE user_id = ${user_id}`); }
    catch(err) { console.log(err.message); }     
  },

  selectOne: (sortBy = 'DESC') => {
    try { return db.query(`SELECT * FROM recipes ORDER BY id ${sortBy} LIMIT 1`); }
    catch(err) { console.log(err.message); }  
  },

  search: (keyword) => {
    try { return db.query(`SELECT * FROM recipes WHERE title ILIKE '%${keyword}%'`); }
    catch(err) { console.log(err.message); }     
  },

  selectPaginate: () => {
    try { return db.query('SELECT COUNT(*) AS total FROM recipes'); }
    catch(err) { console.log(err.message); }     
  },

  pagination: (limit, offset, sort, sortBy) => {
    try {
      let query = `SELECT * FROM recipes ORDER BY id DESC LIMIT ${limit} OFFSET ${offset}`;
      if (sort) {
        if (!sortBy) sortBy = 'ASC'
        else sortBy = sortBy.toUpperCase()
               
        if (sortBy == 'ASC' || sortBy == 'DESC')
          query = `SELECT * FROM recipes ORDER BY ${sort} ${sortBy} LIMIT ${limit} OFFSET ${offset}`;
      }
      return db.query(query); 
    } catch(err) { console.log(err.message); }     
  },

  insert: (user_id, title, ingredient, image, video_link) => {
    try { return db.query(`INSERT INTO recipes (user_id, title, ingredient, image, video_link) 
      VALUES ('${user_id}', '${title}', '${ingredient}', '${image}', '${video_link}')`); }
    catch(err) { console.log(err.message); }
  },

  update: ({ user_id, title, ingredient, image, video_link, id }) => {
    try {
      let query = `UPDATE recipes SET 
        user_id='${user_id}', title='${title}', ingredient='${ingredient}', 
        video_link='${video_link}' 
        WHERE id=${id}`;
      if (image)
        query = `UPDATE recipes SET 
          user_id='${user_id}', title='${title}', ingredient='${ingredient}', 
          image='${image}', video_link='${video_link}' 
          WHERE id=${id}`; 
      return db.query(query);
    } catch(err) { console.log(err.message); }
  },

  delete: (id) => {
    try { return db.query(`DELETE FROM recipes WHERE id='${id}'`); }
    catch(err) { console.log(err.message); }   
  },
};

export default recipeModel;