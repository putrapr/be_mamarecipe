/* eslint-disable no-undef */
// require("dotenv").config();
import "dotenv/config";
import jwt from "jsonwebtoken";
const tokenData = process.env.SECRET_KEY;

const generateToken = async (payload) => {
  const token = await jwt.sign(payload, tokenData, {
    expiresIn: "1h"
  });
  // console.log(token);
  return token;
};

export default generateToken;