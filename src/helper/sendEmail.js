import { createTransport } from 'nodemailer';

const sendEmail = (email, otp) => {
  const transporter = createTransport({
    service: 'gmail',
    auth: {
      user: 'ancpho@gmail.com',
      pass: 'dxnrsiquyvxtdkdt'
    }
  });
  
  const mailOptions = {
    from: 'Mama Recipe <ancpho@gmail.com>',
    to: email,
    subject: 'Email Verification for MamaRecipe Account',
    text: 'Your OTP code is : '+otp
  };
  
  transporter.sendMail(mailOptions, function(error, info){
    if (error) console.log(error);
    else console.log('Email sent: ' + info.response);    
  });
};

export default sendEmail;