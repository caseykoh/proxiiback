const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { Users } = require("../models"); // Adjust path to your models

const loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Find user by username
    console.log(Users);
    const user = await Users.findOne({ where: { username } });
    if (!user) {
      return res.status(400).send("Username does not exist");
    }

    // Check if password matches the stored hash
    const isPasswordValid = bcrypt.compareSync(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).send("Invalid credentials");
    }

    // Create a JWT with user data
    const token = jwt.sign(
      { userId: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" } // Token expires in 1 hour
    );

    // Send the token back to the client
    res.json({ token });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).send("Internal server error");
  }
};

module.exports = { loginUser };
