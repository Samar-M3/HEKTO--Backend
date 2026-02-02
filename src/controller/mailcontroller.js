
const transporter=require("../config/Mailer.js")

const mailer=async (req, res) => {
  const { name, email, message } = req.body;

  try {
    await transporter.sendMail({

      from: email,
      to: process.env.EMAIL_USER,
      subject: "New Contact Form Message",
      text: `
Name: ${name}
Email: ${email}
Message: ${message}
      `,
    });

    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false });
  }
}

module.exports=mailer