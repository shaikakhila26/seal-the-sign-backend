import nodemailer from 'nodemailer';

export const sendSignatureRequestEmail = async (to, signerName, url) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: '"Seal the Sign" <no-reply@sealthesign.com>',
    to,
    subject: `Signature Request from ${signerName}`,
    html: `
      <p>Hello,</p>
      <p><strong>${signerName}</strong> has requested your signature on a document.</p>
      <p><a href="${url}">Click here to sign the document</a></p>
      <p>This link is valid for 48 hours.</p>
    `
  };

  await transporter.sendMail(mailOptions);
};
