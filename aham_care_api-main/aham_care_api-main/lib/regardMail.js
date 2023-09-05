const nodemailer = require("nodemailer");

// Create a new transporter
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  service: "gmail",
  port: 587,
  secure: true,
  auth: {
    user: process.env.EMAIL_ADDRESS,
    pass: process.env.EMAIL_PASSWORD,
  },
});

const sendMail = async (toEmail, subject, userName, amount, type, id) => {
  
 const url =  `${process.env.BASE_URL_CLIENT}invoice/${type}/${id}`



  const htmlContent = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      /* Inline CSS */
      body {
        font-family: Arial, sans-serif;
        line-height: 1.6;
      }

      .container {
        max-width: 700px;
        margin: 0 auto;
        padding: 20px;
      }

      h1 {
        color: #333;
        font-size: 24px;
        margin-bottom: 20px;
        text-align: center;
      }

      p {
        margin-bottom: 20px;
      }

      .donate-button {
        display: inline-block;
        background-color: #4caf50;
        color: #fff;
        text-decoration: none;
        padding: 10px 20px;
        border-radius: 5px;
      }

      .donate-button:hover {
        background-color: #45a049;
      }

      .footer {
        margin-top: 20px;
        text-align: left;
      }

      .footer p {
        font-size: 14px;
      }

      .header {
        width: 100%;
      }

      .header-left img {
        width: 300px;
      }

      .header-left p {
        margin: 0;
        margin-left: 2px;
      }

      .divider {
        width: 100%;
        background: linear-gradient(to left, #db1c78, #7d2b87);
        height: 1px;
        margin-top: 10px;
      }
    </style>
  </head>
  <body>
    <body>
      <div class="container">
        <div class="header">
          <div class="header-left">
            <img
              src="https://storage.googleapis.com/aahamcare/logo/aahamcare-logo.png"
              alt=""
            />
            <div class="divider"></div>
          </div>
        </div>
        <h1>Support Our Cause</h1>
        <p>Dear ${userName} ,</p>
        <p>
          We hope this email finds you in good health and high spirits. On
          behalf of AahamCare, we want to express our sincere gratitude for your
          recent donation of ₹ ${amount}. Your support and generosity mean the
          world to us and will go a long way in assisting our mission to provide
          essential care and support to those in need.
        </p>
        <p>
          We are immensely grateful that you chose to contribute through the
          AahamCare mobile application. Your donation will directly impact the
          lives of individuals and families who rely on our services for their
          well-being and quality of life.
        </p>
        <p>
          At AahamCare, we strive to make a positive difference by offering
          comprehensive assistance, medical aid, and essential resources to
          underserved communities. Your contribution will enable us to continue
          providing vital healthcare services, promoting education, and
          improving the overall well-being of those we serve.
        </p>
        <p>
          WOnce again, please accept our deepest gratitude for your
          contribution. Your support helps us make a meaningful difference in
          the lives of those who depend on us. We are proud to have you as a
          valued member of our compassionate community.
        </p>
        <p>
          If you have any questions, feedback, or would like to learn more about
          the impact of your donation, please don't hesitate to reach out to us
          through the AahamCare app or contact our support team directly. <br />
          Thank you for being an integral part of our journey and for your
          unwavering support.
        </p>
        <p>
          <a href=${url} class="donate-button"
            >Download your invoice</a
          >
        </p>
        <p>Thank you for your support!</p>
        <div class="divider"></div>

        <div class="footer">
          <p>
            If you wish to learn more about our service, please visit our
            website: <a href="https://aahamcare.com/">www.aahamcare.com</a>
            <br />

            If you have any questions or need further assistance, feel free to
            contact us at <br />
            <a href="mailto:info@aahamcare.com"> info@aahamcare.com</a> or +91 9035
            9477 04
          </p>
        </div>
      </div>
    </body>
  </body>
</html>
`;
  // Create a new message
  const message = {
    from: "nahasapofficial@gmail.com",
    to: toEmail,
    subject: subject,
    secure: true,
    html: htmlContent,
  };

  // Send The message
  transporter.sendMail(message, (err, info) => {
    if (err) {
      console.log("err->", err);
      throw err;
    }
    console.log("Message sent: ", info.messageId);
  });
  
  return true;
};

module.exports = { sendMail,transporter };
