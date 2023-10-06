const db = require("../config/db");

const userModel = {
  selectAll: () => {
    return new Promise((resolve, reject) => {
      db.query("SELECT * FROM users", (err, res) => {
        if (err) reject(err);
        else resolve(res);
      });
    });
  },

  insert: ({email, password, name, phone, photo, level}) => {
    return new Promise((resolve, reject) => {
      db.query(`INSERT INTO users (email, password, name, phone, photo, level) VALUES ( '${email}', '${password}', '${name}', '${phone}', '${photo}', '${level}')`, (err, res) => {
        if (err) reject(err);
        else resolve(res);
      });
    });
  },

  update: (id, email, password, name, phone, photo) => {
    return new Promise((resolve, reject) => {
      db.query(`UPDATE users SET email='${email}', password='${password}', name='${name}', phone='${phone}', photo='${photo}' WHERE id=${id}`, (err, res) => {
        if (err) reject(err);
        else resolve(res);
      });
    });
  },

  delete: (id) => {
    return new Promise((resolve, reject) => {
      db.query(`DELETE FROM users WHERE id=${id}`, (err, res) => {
        if (err) reject(err);
        else resolve(res);
      });
    });
  },

  login: (email) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM users WHERE email = '${email}'`, (err, res) => {
        if (err) reject(err);
        else resolve(res);
      });
    });
  },

  selectById: (id) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM users WHERE id = '${id}'`, (err, res) => {
        if (err) reject(err);
        else resolve(res);
      });
    });
  }
};



module.exports = userModel;