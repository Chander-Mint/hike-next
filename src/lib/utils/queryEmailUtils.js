import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const ADMIN_EMAIL = 'dhruv@minterminds.com';
const TEMPLATE_ID_USER = 'd-acf05665c7da4ab0b3aabe10cc94115e';

export const sendQueryEmail = async ({ name, email, phoneNumber, message }) => {

    const adminMsg = {
        to: ADMIN_EMAIL,
        from: ADMIN_EMAIL,
        subject: `New Query Received from ${name}`,
        html: getAdminEmailTemplate({ name, email, phoneNumber, message })
    };

    const userMsg = {
        to: email,
        from: ADMIN_EMAIL,
        templateId: TEMPLATE_ID_USER,
        dynamic_template_data: {
            name,
        }
    };

    await Promise.all([sgMail.send(adminMsg), sgMail.send(userMsg)]);
};


const getAdminEmailTemplate = ({ name, email, phoneNumber, message }) => {
    return `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 24px; border: 1px solid #eee; border-radius: 8px;">
            <h2 style="color: #333;">📬 New Contact Query Received</h2>
            <table style="width: 100%; margin-top: 16px; font-size: 15px; line-height: 1.6;">
                <tr>
                    <td style="font-weight: bold;">Name:</td>
                    <td>${name}</td>
                </tr>
                <tr>
                    <td style="font-weight: bold;">Email:</td>
                    <td>${email}</td>
                </tr>
                <tr>
                    <td style="font-weight: bold;">Phone Number:</td>
                    <td>${phoneNumber}</td>
                </tr>
                <tr>
                    <td style="font-weight: bold; vertical-align: top;">Message:</td>
                    <td>${message.replace(/\n/g, '<br />')}</td>
                </tr>
            </table>
            <p style="margin-top: 24px; color: #888; font-size: 13px;">
                This message was automatically sent from the website's contact form.
            </p>
        </div>
    `;
};
