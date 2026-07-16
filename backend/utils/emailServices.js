import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: parseInt(process.env.EMAIL_PORT || "465"),
    secure: true, // true for 465, false for other ports
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

const emailHeader = `
    <div style="background-color: #f8fafc; padding: 20px; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
        <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.05); overflow: hidden; border: 1px solid #e2e8f0;">
            <div style="background: linear-gradient(135deg, #4f46e5, #6366f1); padding: 30px; text-align: center; color: white;">
                <h1 style="margin: 0; font-size: 28px; font-weight: 700; letter-spacing: -0.5px;">EduStream</h1>
                <p style="margin: 5px 0 0 0; opacity: 0.9; font-size: 14px;">Your Gateway to Smart Learning</p>
            </div>
            <div style="padding: 30px; color: #334155; line-height: 1.6;">
`;

const emailFooter = `
                <hr style="border: 0; border-top: 1px solid #f1f5f9; margin: 25px 0;" />
                <p style="font-size: 12px; color: #94a3b8; text-align: center; margin: 0;">
                    This is an automated message from EduStream. Please do not reply directly to this email.<br/>
                    Need assistance? Contact our support team.
                </p>
            </div>
        </div>
    </div>
`;

export const sendStudentWelcomeEmail = async (email, username) => {
    const htmlContent = `
        ${emailHeader}
        <h2 style="color: #1e1b4b; margin-top: 0;">Welcome aboard, ${username}! 🎉</h2>
        <p>Thank you for registering at <strong>EduStream</strong>. We are thrilled to have you join our learning community!</p>
        
        <div style="background: #f1f5f9; padding: 15px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #4f46e5;">
            <p style="margin: 0; font-weight: 600; color: #1e293b;">Next Steps:</p>
            <ul style="margin: 5px 0 0 0; padding-left: 20px; color: #475569;">
                <li>Log in to your account</li>
                <li>Complete your Profile (Study Group & Class)</li>
                <li>Access your personalized, admin-approved video lecture feeds instantly</li>
            </ul>
        </div>
        
        <div style="text-align: center; margin: 30px 0;">
            <a href="http://localhost:3000/login" style="background: #4f46e5; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: 600; display: inline-block;">Get Started Now</a>
        </div>
        ${emailFooter}
    `;

    try {
        await transporter.sendMail({
            from: `"EduStream Team" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: "Welcome to EduStream! 📚",
            html: htmlContent,
        });
    } catch (error) {
        console.error("Error sending student welcome email:", error);
    }
};

export const sendStaffCredentialsEmail = async (email, username, tempPassword, role) => {
    const htmlContent = `
        ${emailHeader}
        <h2 style="color: #1e1b4b; margin-top: 0;">Account Created! 🚀</h2>
        <p>Hello ${username},</p>
        <p>An administrator has created an <strong>EduStream Staff Account</strong> for you as an <strong>${role.toUpperCase()}</strong>.</p>
        
        <p>Please use the following temporary credentials to log in and access your portal:</p>
        
        <div style="background: #f1f5f9; padding: 20px; border-radius: 8px; margin: 20px 0; font-family: monospace; font-size: 15px; border: 1px solid #e2e8f0;">
            <table style="width: 100%; border-collapse: collapse;">
                <tr>
                    <td style="padding: 4px 0; color: #64748b; font-weight: bold;">Login Link:</td>
                    <td style="padding: 4px 0; color: #0f172a;"><a href="http://localhost:3000/login" style="color: #4f46e5; text-decoration: none;">EduStream Login Portal</a></td>
                </tr>
                <tr>
                    <td style="padding: 4px 0; color: #64748b; font-weight: bold;">Username:</td>
                    <td style="padding: 4px 0; color: #0f172a;">${username}</td>
                </tr>
                <tr>
                    <td style="padding: 4px 0; color: #64748b; font-weight: bold;">Email:</td>
                    <td style="padding: 4px 0; color: #0f172a;">${email}</td>
                </tr>
                <tr>
                    <td style="padding: 4px 0; color: #64748b; font-weight: bold;">Temporary Password:</td>
                    <td style="padding: 4px 0; color: #b91c1c; font-weight: bold;">${tempPassword}</td>
                </tr>
            </table>
        </div>

        <p style="color: #475569; font-size: 13px; font-style: italic;">
            *For security, please make sure to update your password right after signing in for the first time.
        </p>
        ${emailFooter}
    `;

    try {
        await transporter.sendMail({
            from: `"EduStream System" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: `EduStream Staff Account Provisioned: ${role.toUpperCase()}`,
            html: htmlContent,
        });
    } catch (error) {
        console.error("Error sending staff credentials email:", error);
    }
};