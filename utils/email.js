import nodemailer from 'nodemailer';


export const sendSignatureRequestEmail = async (recipientEmail, signerName, signUrl, token) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: recipientEmail,
    subject: 'Sign this Document',
    html: `
      <p>Hello ${signerName},</p>
      <p>You have been requested to sign a document. Click the button below to begin:</p>
      <p><a href="${signUrl}" target="_blank" style="padding:10px 16px; background:#007bff; color:#fff; text-decoration:none; border-radius:4px;">Sign Document</a></p>
      <p>Or open this link: ${signUrl}</p>
    `
  };

  await transporter.sendMail(mailOptions);
};

