import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    host: 'smtp.example.com', // Your SMTP server hostname
    port: 587, // Typically 587 for SMTP, 465 for SMTPS
    secure: false, // true for 465, false for other ports
    auth: {
        user: 'your-email@example.com', // Your email address
        pass: 'your-email-password', // Your email password or app-specific password
    },
});

export const sendLoginAcceptanceEmail = async (to: string, username: string, verificationLink: string) => {
    try {
        // Send email
        await transporter.sendMail({
            from: 'your-email@example.com', // Sender address
            to, // List of recipients
            subject: 'Login Acceptance', // Subject line
            html: `
                <p>Hello ${username},</p>
                <p>Your account has been accepted for login.</p>
                <p>Click <a href="${verificationLink}">here</a> to login.</p>
                <p>Best regards,<br>Your App Team</p>
            `,
        });

        console.log('Email sent');
    } catch (error) {
        console.error('Error sending email:', error);
        throw new Error('Failed to send email');
    }
};
