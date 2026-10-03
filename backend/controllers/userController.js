const User = require('../models/User');

// POST /api/users/register
// Register a new user (Freelancer or Client)
const registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password || !role) {
      return res.status(400).json({ message: 'Please fill in all fields' });
    }

    const normalizedRole = role.toLowerCase();
    if (normalizedRole !== 'freelancer' && normalizedRole !== 'client') {
      return res.status(400).json({ message: 'Role must be either freelancer or client' });
    }

    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(400).json({ message: 'User with this email already exists' });
    }

    const newUser = await User.create({
      name,
      email: email.toLowerCase(),
      password,
      role: normalizedRole
    });

    res.status(201).json({
      message: 'User registered successfully',
      user: {
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message || 'Server error registering user' });
  }
};

// POST /api/users/login
// Login existing user
const loginUser = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    if (!email || !password || !role) {
      return res.status(400).json({ message: 'Please provide email, password, and role' });
    }

    const normalizedRole = role.toLowerCase();
    const user = await User.findOne({
      email: email.toLowerCase(),
      password: password,
      role: normalizedRole
    });

    if (!user) {
      return res.status(400).json({ message: 'Invalid email, password, or role' });
    }

    res.status(200).json({
      message: 'Login successful',
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message || 'Server error logging in' });
  }
};

module.exports = {
  registerUser,
  loginUser
};
