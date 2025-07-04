const bcrypt = require("bcryptjs");
const connectToDatabase = require("./utils/db");
const User = require("./models/User");

const handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ message: 'Method Not Allowed' }),
    };
  }

  try {
    const userData = JSON.parse(event.body);
    const { email, password, firstName, lastName } = userData;

    if (!email || !password || !firstName || !lastName) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: 'Missing required fields' }),
      };
    }

    await connectToDatabase();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return {
        statusCode: 409,
        body: JSON.stringify({ message: 'User already exists' }),
      };
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const username = `${userData.firstName} ${userData.lastName}`;
    const userImageUrl = "image.png";
    const newUser = new User({ ...userData, password: hashedPassword,username,userImageUrl});
    await newUser.save();

    return {
      statusCode: 201,
      body: JSON.stringify({ message: 'User created successfully' }),
    };
  } catch (error) {
    console.error('Error registering user:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Internal Server Error' }),
    };
  }
};

module.exports.handler = handler;
