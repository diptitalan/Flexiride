const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const connectToDatabase = require("./utils/db");
const User = require("./models/User");

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

const handler = async (event) => {
  if (event.httpMethod !== 'POST' && event.httpMethod !== 'DELETE') {
    return {
      statusCode: 405,
      body: JSON.stringify({ message: 'Method Not Allowed' }),
    };
  }

  try {
    await connectToDatabase();
    const { email, password } = JSON.parse(event.body);

    if (!email || !password) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: 'Email and password are required' }),
      };
    }

    const user = await User.findOne({ email });

    if (!user) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: 'Invalid email or password' }),
      };
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: 'Invalid email or password' }),
      };
    }

    if (event.httpMethod === 'POST') {
      const tokenPayload = {
        sub: user._id.toString(),
        name: `${user.firstName} ${user.lastName}`,
      };

      const idToken = jwt.sign(tokenPayload, JWT_SECRET, { expiresIn: "7d" });

      const responsePayload = {
        idToken,
        role: user.role,
        userId: user._id.toString(),
        userImageUrl: user.userImageUrl,
        username: user.username,
      };

      return {
        statusCode: 200,
        body: JSON.stringify(responsePayload),
      };
    }

    if (event.httpMethod === 'DELETE') {
      const deletedUser = await User.findOneAndDelete({ email });

      return {
        statusCode: 200,
        body: JSON.stringify({ message: 'User deleted successfully' }),
      };
    }
  } catch (error) {
    console.error("Handler error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Internal Server Error" }),
    };
  }
};

module.exports.handler = handler;