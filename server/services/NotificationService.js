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
      html: `<p>Dear ${shelter.name},</p>
             <p>The following restaurants have near expired food:</p>
             <ul>
               ${restaurantsWithFood
                 .map(
                   (restaurant) => `
                 <li>
                   <strong>${restaurant.name}</strong>
                   <br>Location: ${restaurant.address}
                   <br>Email: ${restaurant.email}
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
  const restaurantsWithFood = await RestaurantController.getRestaurantsWithExpiringFood();
  await sendEmailsToShelters(restaurantsWithFood);
}

// Run the function every day at midnight
cron.schedule("0 0 * * *", () => {
  console.log("Running Cron Job");
  sendMassEmail();
});
