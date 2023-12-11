/* eslint-disable no-undef */
import "dotenv/config";
import pg from "pg";

const db = new pg.Pool({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  port: process.env.PORT
});

db.connect((err) => {
  if (err) console.log(err);
});

export default db;