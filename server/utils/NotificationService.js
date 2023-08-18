const cron = require("node-cron");
const Shelter = require("../models/Shelter");
const sgMail = require("@sendgrid/mail");
require("dotenv").config();
// using Twilio SendGrid's v3 Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs
sgMail.setApiKey(process.env.LEFTOVER_LINK_EMAIL_KEY);


async function sendEmailsToShelters(restaurantsWithFood) {
  const shelters = await Shelter.find({}); //all the shelters
  for (const shelter of shelters) {
    //for loop to go through every shelter and send them the message below!

    const message = {
      to: process.env.TO_LIST, // Change to your recipient
      from: process.env.SENDER_EMAIL, // Change to your verified sender
      subject: "Near Expired Food Alert!",
      text: "and easy to do anywhere, even with Node.js",
      html: `<p>Dear ${shelter.name},</p>
             <p>The following restaurants have near expired food:</p>
             <ul>
               ${restaurantsWithFood
                 .map(
                   (restaurant) => `
                 <li>
                   <strong>${restaurant.name}</strong>
                   <br>Location: ${restaurant.location}
                   <br>Contact: ${restaurant.contact}
                 </li>
               `
                 )
                 .join("")}
             </ul>
             <p>Thank you for your cooperation.</p>`,
    };
    try {
      await sgMail.send(message);
      console.log(`Email sent to ${shelter.name} at ${shelter.email}`);
    } catch (error) {
      console.error(error);
    }
  }
}

async function sendMassEmail() {
  const restaurantsWithFood = await getRestaurantsWithFood();
  await sendEmailsToShelters(restaurantsWithFood);
}

// Run the function every day at midnight
cron.schedule("0 0 * * *", () => {
  sendMassEmail();
});
