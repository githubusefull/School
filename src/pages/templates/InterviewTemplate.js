

module.exports = function interviewTemplate({ name, position, interviewDate, interviewTime, location }) {
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
          border-radius: 5px;
          background-color: #E0E0E0;
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
            margin: 0;
            border-radius: 0;
          }
          .header, .content, .footer {
            padding: 15px;
          }
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
         <h2>Interview Invitation</h2>
          </div>
        <div class="content">
          <h4>Hello ${name},</h4>
                <h4>We are pleased to invite you for an interview for the position of ${position}. Below are the details:</h4>

         <ul>
        <li><strong>Date:</strong> ${interviewDate}</li>
        <li><strong>Time:</strong> ${interviewTime}</li>
        <li><strong>Location:</strong> ${location}</li>
      </ul>
      <p>We look forward to discussing how you can contribute to our team.</p>
      <h4>Best regards,</h4>
      <h4>MySchool Team</h4>
        </div>
        <div class="footer">
          <p>&copy; 2024 MySchool. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>

    `;
  };
  
