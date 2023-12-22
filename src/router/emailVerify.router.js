import express from "express";
const router = express.Router();
import eVerifyController from "../controller/emailVerify.controller.js";
const { getByEmail, addOtp, checkOtp } = eVerifyController;

router
  .get("/e-verify/:email", getByEmail)  
  .post("/e-verify", addOtp)
  .post("/e-verify-check", checkOtp )


export default router;