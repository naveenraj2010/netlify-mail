const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const app = express();

// Enable CORS (Cross-Origin Resource Sharing)
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Function to send email
const sendEmail = async (email, subject, content) => {
  try {
    const transporter = nodemailer.createTransport({
      name: "www.pavo.dating.com",
      port: 465,
      host: "email-smtp.us-west-1.amazonaws.com",
      auth: {
        user: "AKIARELRLWWHW5PBOUVS",
        pass: "BKIJNrBAR0wNm3IdgYWljpOo0NiNmeP3cgReGspXNOgE"
      },
      secure: true
    });

    const mailOptions = {
      from: "Pavo <hello@pavo.dating>",
      to: 'naveenraj@codeglo.com',
      subject: subject,
      html: content
    };

    const info = await transporter.sendMail(mailOptions);

    console.log("success");
    return info;
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};

// Netlify function to handle the form submission and send email
exports.handler = async (event, context) => {
  try {
    const { firstname, lastname, companySize, email, message } = JSON.parse(event.body);
    const content = `<p>First Name: ${firstname}</p>
                     <p>Last Name: ${lastname}</p>
                     <p>Company Size: ${companySize}</p>
                     <p>Email: ${email}</p>
                     <p>Message: ${message}</p>`;

    const info = await sendEmail(email, 'New Form Submission', content);

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Email sent successfully', info }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Error sending email', error }),
    };
  }
};

// The following line is important to make the app work on Netlify
module.exports = app;
