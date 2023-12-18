import db from "../config/db.js";

const userModel = {
  selectAll: () => {
    try { return db.query("SELECT * FROM users"); }
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

  register: (email, password, name, phone, image, role) => {
    try { return db.query(`INSERT INTO users (email, password, name, phone, image, role)
      VALUES ('${email}', '${password}', '${name}', '${phone}', '${image}', '${role}')`); }
    catch(err) { console.log(err.message); }
  },

  update: (email, password, name, phone, role, id) => {
    try { 
      return db.query(`UPDATE users SET 
        email='${email}', password='${password}', name='${name}', 
        phone='${phone}', role='${role}' WHERE id=${id}`); 
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

  // updateImage: (id, image) => {
  //   return new Promise((resolve, reject) => {
  //     db.query(`UPDATE users SET image='${image}' WHERE id='${id}'`, (err, res) => {
  //       if (err) reject(err);
  //       else resolve(res);
  //     });
  //   });
  // },
};



export default userModel;