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

// Netlify function to send email
exports.handler = async (event, context) => {


    const sendEmail = async (email, subject, content, cb) => {

        var transporter = nodemailer.createTransport({
          name: "www.pavo.dating.com",
          port:465,
          host: "email-smtp.us-west-1.amazonaws.com",
      
          auth: {
            user: "AKIARELRLWWHW5PBOUVS",
            pass: "BKIJNrBAR0wNm3IdgYWljpOo0NiNmeP3cgReGspXNOgE"
          },
          secure: true
        });
      
        // setup e-mail data with unicode symbols
        var mailOptions = {
          from: "Pavo <hello@pavo.dating>", // sender address
          to: email, // list of receivers
          // bcc:"selvakumar@codeglo.com",
          subject: subject, // Subject line
          html: content
        };
      
        transporter.sendMail(mailOptions, function(error, info) {
          if (error) {
            
            
    return {
        statusCode: 500,
        body: JSON.stringify({ message: 'Error sending email', error }),
      };
          }
          else{
           console.log("success")
           return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Email sent successfully' }),
          };
          }
        });
      };


      const { firstname, lastname, companySize, email, message } = JSON.parse(event.body);
      sendEmail(firstname, lastname, companySize, email, message)

};

// The following line is important to make the app work on Netlify
module.exports = app;
