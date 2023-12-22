import emailVerifyModel from "../model/emailVerify.model.js";
import sendEmail from "../helper/sendEmail.js";

const emailVerifyController = {
  getAll: async (req, res) => {
    try {
      const result = await emailVerifyModel.selectAll();
      res.status(200);
      res.json({
        message: "Get all recipe success",
        data: result
      });
    } catch(err) {
      res.json({ message: err.message });
    }
  },
  
  getByEmail: async (req, res) => {
    try {
      const { email } = req.params;
      const result = await emailVerifyModel.selectByEmail(email);
      res.status(200);
      res.json({
        message: "Get e-verify by email success",
        data: result
      });
    } catch(err) {
      res.json({ message: err.message });
    }
  },  

  addOtp : async (req, res) => {
    try {
      const { email } = req.body;
      // Check email pattern
      const emailPattern =  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/; 
      const isValid = emailPattern.test(email); 
      if (!isValid)
        return res.json({ error: "email invalid" });

      const otp = Math.floor(100000 + Math.random() * 900000);        
      sendEmail(email, otp);
      
      const result = await emailVerifyModel.insert(email, otp);
      res.status(200).json({
        message: `Success ! Check your otp in email: ${email}`,
        data: result
      });
    } catch (err) { res.json({ message: err.message }); }
  },

  checkOtp: async (req, res) => {
    try {
      const { email, otp } = req.body
      const result = await emailVerifyModel.selectByEmail(email);      
      if (result.rowCount) {
        const timeExpired = result.rows[0].expired;
        const otpInDb =  result.rows[0].otp;
        if (new Date() > new Date(timeExpired)) { // When Expired    
          res.json({ message: 'OTP expired'})
        } else {
          (otp == otpInDb) ? 
            res.json({ message: 'email valid', data: email }) :
            res.json({ message: 'Wrong email / otp' });
        }
      } else {
        res.json({ message: "Wrong email / otp"})
      }
    } catch (err) {
      res.json({ message: err.message })
    }
  },
};

export default emailVerifyController;