const transporter = nodemailer.createTransport({
  port: process.env.PORT || 4000, // true for 465, false for other ports
  host: "smtp.gmail.com",
  auth: {
    user: process.env.SENDER_EMAIL,
    pass: process.env.SENDER_EMAIL_PASSWORD,
  },
  secure: true,
});

const sendMail = async (req, res) => {
  const { to, subject, text } = req.body;
  const mailData = {
    from: process.env.SENDER_EMAIL,
    to,
    subject,
    text,
    html,
    html: "<b>Hey there! </b><br> This is our first message sent with Nodemailer<br/>",
  };

  transporter.sendMail(mailData, (err, info) => {
    if (err) return console.log(err);
    else console.log(info);
    res.status(200).send({ message: "Mail send", message_id: info.messageId });
  });
};

module.exports = {
  sendMail,
};
