import db from "../config/db.js";

const recipeModel = {
  selectAll: () => {
    try { return db.query("SELECT * FROM email_verify"); }
    catch(err) { console.log(err.message); }     
  },

  selectByEmail: (email) => {
    try { return db.query(`SELECT * FROM email_verify 
      WHERE email = '${email}'
      ORDER BY id DESC LIMIT 1`); }
    catch(err) { console.log(err.message); }     
  },

  insert: (email, otp) => {
    try {
      return db.query(`INSERT INTO email_verify (email, otp, expired)
        VALUES ('${email}', '${otp}', current_timestamp + interval '5 minute')`);
    } catch (err) { console.log(err.message); }
  },
};

export default recipeModel;