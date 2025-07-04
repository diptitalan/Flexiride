const connectToDatabase = require("./utils/db");
const AboutUs = require("./models/AboutUs");
const Faq = require("./models/Faq");
const Location = require("./models/Location");

exports.handler = async (event) => {
  console.log("Incoming event:", JSON.stringify(event, null, 2));
  try {
    await connectToDatabase();

    const path = event.path;
    const method = event.httpMethod;

    if (method === 'GET' && path === '/home/about-us') {
      const about = await AboutUs.find();
      return {
        statusCode: 200,
        body: JSON.stringify({ content: about }),
      };
    }

    if (method === 'GET' && path === '/home/faq') {
      const faqs = await Faq.find();
      return {
        statusCode: 200,
        body: JSON.stringify({ content: faqs }),
      };
    }

    if (method === 'GET' && path === '/home/locations') {
      const locations = await Location.find();
      return {
        statusCode: 200,
        body: JSON.stringify({ content: locations }),
      };
    }

    return {
      statusCode: 404,
      body: JSON.stringify({ message: "Not Found" }),
    };
  } catch (error) {
    console.error("ERROR:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Internal Server Error",
        error: error.message,
      }),
    };
  }
};
