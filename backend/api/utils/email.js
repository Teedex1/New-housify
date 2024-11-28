const nodemailer = require('nodemailer');

const createTestAccount = async () => {
    // Generate test SMTP service account from ethereal.email
    const testAccount = await nodemailer.createTestAccount();

    // Create reusable transporter object using the default SMTP transport
    const transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: testAccount.user,
            pass: testAccount.pass
        }
    });

    return transporter;
};

const sendEmail = async (options) => {
    try {
        // Create test account for development/testing
        const transporter = await createTestAccount();

        // Define email options
        const mailOptions = {
            from: `Housify <${process.env.EMAIL_FROM || 'noreply@housify.com'}>`,
            to: options.email,
            subject: options.subject,
            html: options.html
        };

        // Send email
        const info = await transporter.sendMail(mailOptions);

        // Log preview URL in development
        if (process.env.NODE_ENV === 'development') {
            console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
        }

        return info;
    } catch (error) {
        console.error('Email error:', error);
        throw error;
    }
};

const getPasswordResetTemplate = (resetUrl, username) => {
    return `
        <div style="max-width: 600px; margin: 0 auto; padding: 20px; font-family: Arial, sans-serif;">
            <h2 style="color: #333; text-align: center;">Reset Your Password</h2>
            <p>Hello ${username},</p>
            <p>You requested to reset your password. Click the button below to set a new password:</p>
            <div style="text-align: center; margin: 30px 0;">
                <a href="${resetUrl}" style="background-color: #4CAF50; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px;">Reset Password</a>
            </div>
            <p>If you didn't request this, please ignore this email. This link will expire in 1 hour.</p>
            <p>Best regards,<br>The Housify Team</p>
        </div>
    `;
};

const getEmailVerificationTemplate = (verifyUrl, username) => {
    return `
        <div style="max-width: 600px; margin: 0 auto; padding: 20px; font-family: Arial, sans-serif;">
            <h2 style="color: #333; text-align: center;">Verify Your Email</h2>
            <p>Hello ${username},</p>
            <p>Welcome to Housify! Please verify your email address by clicking the button below:</p>
            <div style="text-align: center; margin: 30px 0;">
                <a href="${verifyUrl}" style="background-color: #4CAF50; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px;">Verify Email</a>
            </div>
            <p>If you didn't create an account with us, please ignore this email.</p>
            <p>Best regards,<br>The Housify Team</p>
        </div>
    `;
};

module.exports = {
    sendEmail,
    getPasswordResetTemplate,
    getEmailVerificationTemplate
};
