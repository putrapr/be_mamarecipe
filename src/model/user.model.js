import db from '../config/db.js';

const userModel = {
  selectAll: () => {
    try { return db.query('SELECT * FROM users'); }
    catch(err) { console.log(err.message); }     
  },

  selectById: (id) => {
    try { return db.query(`SELECT * FROM users WHERE id = ${id}`); }
    catch(err) { console.log(err.message); }     
  },

  login: (email) => {
    try { return db.query(`SELECT * FROM users WHERE email = '${email}'`); }
    catch(err) { console.log(err.message); }
  },

  register: (email, password, name, phone, image) => {
    try { return db.query(`INSERT INTO users (email, password, name, phone, image)
      VALUES ('${email}', '${password}', '${name}', '${phone}', '${image}')`); }
    catch(err) { console.log(err.message); }
  },

  update: (email, password, name, phone, id) => {
    try { 
      return db.query(`UPDATE users SET 
        email='${email}', password='${password}', name='${name}', 
        phone='${phone}' WHERE id=${id}`); 
    } catch(err) { console.log(err.message); }
  },

  updateImage: (image, id) => {
    try { 
      return db.query(`UPDATE users SET image='${image}' WHERE id=${id}`); 
    } catch(err) { console.log(err.message); }
  },

  delete: (id) => {
    try { return db.query(`DELETE FROM users WHERE id=${id}`); }
    catch(err) { console.log(err.message); }
  },
};



export default userModel;