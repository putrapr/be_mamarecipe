/* eslint-disable no-undef */
import "dotenv/config";
import jwt from "jsonwebtoken";
const dataToken = process.env.SECRET_KEY;

export default (req, res, next) => {
  try {
    const {token} = req.headers;
    const decode = jwt.verify(token, dataToken);

    // request custom
    req.APP_DATA = {
      tokenDecode: decode
    };
    console.log(req.APP_DATA);
    
    next();
  } catch (err) {
    res.json({
      message: err.message
    });
  }
};