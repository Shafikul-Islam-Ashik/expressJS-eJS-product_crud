import nodemailer from "nodemailer";
import { Vonage } from "@vonage/server-sdk";
import axios from "axios";

/**
 * sms api setup (VONAGE)
 **/
const vonage = new Vonage({
  apiKey: "7156fb9b",
  apiSecret: "kpwHuZw81d5nGgNi",
});

async function sendSMS(to, from, text) {
  await vonage.sms
    .send({ to, from, text })
    .then((resp) => {
      console.log("Message sent successfully");
      console.log(resp);
    })
    .catch((err) => {
      console.log("There was an error sending the messages.");
      console.error(err);
    });
}
// Api setup ends here

/**
 * email & sms sending
 */
export const registerUser = async (req, res) => {
  //create mail transport
  const transport = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    auth: {
      user: process.env.MAIL_ADDRESS,
      pass: process.env.MAIL_PASS,
    },
  });

  await transport.sendMail({
    from: `Shefali Group <${process.env.MAIL_ADDRESS}>`,
    subject: req.body.sub,
    to: req.body.email,
    text: `Hello ${req.body.name}, you are ${req.body.age} years old and you are ${req.body.skill} developer.`,
  });

  // email sending ends here

  /**
   * send sms by ''vonage''
   */
  await sendSMS(
    "8801777883351",
    "Vonage APIs",
    `Hello ${req.body.name}, you are ${req.body.age} years old and you are ${req.body.skill} developer.`
  );

  /**
   * send sms by "BULK SMS BD"
   */
  axios.get(
    `http://bulksmsbd.net/api/smsapi?api_key=4TZJ5ZeJXC6XM1mNEpb7&type=text&number=(${req.body.cell})&senderid=8809617612989&message=Hello ${req.body.name}, you are ${req.body.age} years old and you are a ${req.body.skill}.  Thank you very much.
    .
    --Ashik`
  );

  res.status(200).json(req.body);
};

export const getUser = (req, res) => {
  res.status(200).json({ message: "Got all users" });
};
