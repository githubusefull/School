

module.exports = function acceptingTemplate({ name, email}) {
    return `
  <html>
    <head>
      <style>
        body {
          margin: 0;
          padding: 0;
          background-color: black;
          font-family: 'Raleway', sans-serif;
        }
        .container {
          width: 100%;
          max-width: 600px;
          margin: 0 auto;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        .header {
          background-color: black;
          color: #E0E0E0;
          padding: 20px;
          text-align: center;
          font-family: 'Raleway', sans-serif;
        }
        .content {
          padding: 20px;
          background-color: #E0E0E0;
          border-radius: 5px;
        }
        .content h4, li {
          color: black;


        }
        .content p {
          font-size: 15px;
          font-weight: 500;
        }
        .footer {
          background-color: black;
          color: #E0E0E0;
          text-align: center;
          padding: 10px;
        }
        @media (max-width: 600px) {
          .container {
            width: 100%;
            padding: 20px 20px 1px;
            border-radius: 0;
          }
          .header, .content, .footer {
            padding: 10px;
           

          }
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h2>Admission Form Submission</h2>
        </div>
        <div class="content">
          <h4>Hello ${name},</h4>
          <h4>Thank you for submitting your admission form. Here are your details:</h4>
          <ul>
            <li><strong>Name:</strong> ${name}</li>
            <li><strong>Email:</strong> ${email}</li>
                  

          </ul>
          <h4>Best regards,</h4>
          <h4>MySchool</h4>
        </div>
        <div class="footer">
          <p>&copy; 2024 MySchool. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>

    `;
  };
  
