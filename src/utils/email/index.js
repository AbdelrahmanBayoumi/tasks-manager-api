const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASS,
  },
});

const sendWelcomeEmail = async (email, name) => {
  await sendEmail(
    process.env.EMAIL,
    email,
    "Welcome to Task Manager",
    `Welcome to the app, ${name}. Let me know how you get along with the app.`
  );
};

const sendCancelationEmail = async (email, name) => {
  await sendEmail(
    process.env.EMAIL,
    email,
    "Sorry to see you go!",
    `Goodbye, ${name}. I hope to see you back sometime soon.`
  );
};

const sendEmail = async (from, to, subject, body) => {
  const mailOptions = {
    from: from,
    to: to,
    subject: subject,
    text: body,
  };
  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: " + info.response);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error sending email");
  }
};

module.exports = {
  sendWelcomeEmail,
  sendCancelationEmail,
};
