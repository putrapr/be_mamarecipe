import db from "../config/db.js";

const userModel = {
  selectAll: () => {
    try { return db.query("SELECT * FROM users"); }
    catch(err) { console.log(err.message); }     
  },

  selectById: (id) => {
    try { return db.query(`SELECT * FROM users WHERE id = '${id}'`); }
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

  delete: (id) => {
    try { return db.query(`DELETE FROM users WHERE id=${id}`); }
    catch(err) { console.log(err.message); }
  },
  

  // update: (id, email, password, name, phone, image) => {
  //   return new Promise((resolve, reject) => {
  //     db.query(`UPDATE users SET email='${email}', password='${password}', name='${name}', phone='${phone}', image='${image}' WHERE id=${id}`, (err, res) => {
  //       if (err) reject(err);
  //       else resolve(res);
  //     });
  //   });
  // },

  // updateImage: (id, image) => {
  //   return new Promise((resolve, reject) => {
  //     db.query(`UPDATE users SET image='${image}' WHERE id='${id}'`, (err, res) => {
  //       if (err) reject(err);
  //       else resolve(res);
  //     });
  //   });
  // },

  // delete: (id) => {
  //   return new Promise((resolve, reject) => {
  //     db.query(`DELETE FROM users WHERE id=${id}`, (err, res) => {
  //       if (err) reject(err);
  //       else resolve(res);
  //     });
  //   });
  // },

  // login: (email) => {
  //   return new Promise((resolve, reject) => {
  //     db.query(`SELECT * FROM users WHERE email = '${email}'`, (err, res) => {
  //       if (err) reject(err);
  //       else resolve(res);
  //     });
  //   });
  // },
};



export default userModel;