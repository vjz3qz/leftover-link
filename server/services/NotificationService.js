const cron = require("node-cron");
const ShelterController = require("../controllers/ShelterController");
const RestaurantController = require("../controllers/RestaurantController");
const sgMail = require("@sendgrid/mail");
require("dotenv").config();
sgMail.setApiKey(process.env.LEFTOVER_LINK_EMAIL_KEY);


async function sendEmailsToShelters(restaurantsWithFood) {
  const shelters = await ShelterController.getAllShelters();
  for (const shelter of shelters) {
    //for loop to go through every shelter and send them the message below!
    const message = {
      to: process.env.TO_LIST,
      from: process.env.SENDER_EMAIL,
      subject: "Near Expired Food Alert!",
      html: `
      <p style="font-family: Arial, sans-serif; line-height: 1.5;">Dear ${shelter.name},</p>
      <p style="font-family: Arial, sans-serif; line-height: 1.5;">The following restaurants have near expired food:</p>
      <ul style="font-family: Arial, sans-serif; line-height: 1.5; padding-left: 20px;">
          ${restaurantsWithFood.map(restaurant => `
              <li style="margin-bottom: 10px;">
                  <strong style="font-size: 1.1em;">${restaurant.name}</strong>
                  <br>Location: ${restaurant.address}
                  <br>Email: ${restaurant.email}
              </li>
          `).join("")}
      </ul>
      <p style="font-family: Arial, sans-serif; line-height: 1.5;">Thank you for your cooperation.</p>
      <br>
      <div style="font-family: Arial, sans-serif; line-height: 1.5;">
          <p>Best Regards,</p>
          <p><strong>Leftover Link</strong></p>
          <p><a href="http://localhost:3000/" style="color: #007BFF; text-decoration: none;">Visit our website</a></p>
      </div>
  `  
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
  const restaurantsWithFood = await RestaurantController.getRestaurantsWithExpiringFood();
  await sendEmailsToShelters(restaurantsWithFood);
}

// Run the function every day at midnight
cron.schedule("0 0 * * *", () => {
  console.log("Running Cron Job");
  sendMassEmail();
});