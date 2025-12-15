const validator = require("validator");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

// Generate JWT
const generateToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, {
    expiresIn: "3d",
  });
};

// @desc    Register new user
// @route   POST /api/users/signup
// @access  Public
const signupUser = async (req, res) => {
  const {
    name,
    email,
    password,
    phone_number,
    gender,
    date_of_birth,
<<<<<<< HEAD
    membership_status
  } = req.body;

  try {
    // Optional validations
    if (phone_number && !/^\d{10,}$/.test(phone_number)) {
      return res.status(400).json({ error: "Phone number must be at least 10 digits" });
    }

    if (gender && !["Male", "Female", "Other"].includes(gender)) {
      return res.status(400).json({ error: "Invalid gender value" });
    }

    if (membership_status && !["Active", "Inactive", "Suspended"].includes(membership_status)) {
      return res.status(400).json({ error: "Invalid membership status" });
    }

    // Call signup method with defaults for missing fields
=======
    membership_status,
  } = req.body;

  try {
    // Email validation
    if (!validator.isEmail(email)) {
      return res.status(400).json({ error: "Invalid email format" });
    }

    // Password strength validation
    if (!validator.isStrongPassword(password)) {
      return res.status(400).json({ error: "Password is too weak" });
    }

    // Phone number validation
    if (!/^\d{10,}$/.test(phone_number)) {
      return res
        .status(400)
        .json({ error: "Phone number must be at least 10 digits" });
    }

    // Gender validation
    if (!["Male", "Female", "Other"].includes(gender)) {
      return res.status(400).json({ error: "Invalid gender value" });
    }

    // Membership status validation
    if (!["Active", "Inactive", "Suspended"].includes(membership_status)) {
      return res
        .status(400)
        .json({ error: "Invalid membership status" });
    }

    // Date of birth validation
    if (!date_of_birth) {
      return res.status(400).json({ error: "Date of birth is required" });
    }

    // Create user
>>>>>>> 58071ea8242600fd47bd59f30a2944e7b2cfe41b
    const user = await User.signup(
      name,
      email,
      password,
<<<<<<< HEAD
      phone_number || null,
      gender || null,
      date_of_birth || null,
      membership_status || "Active"
=======
      phone_number,
      gender,
      date_of_birth,
      membership_status
>>>>>>> 58071ea8242600fd47bd59f30a2944e7b2cfe41b
    );

    // Generate token
    const token = generateToken(user._id);

    res.status(201).json({
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone_number: user.phone_number,
        gender: user.gender,
        date_of_birth: user.date_of_birth,
        membership_status: user.membership_status,
      },
      token,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// @desc    Authenticate a user
// @route   POST /api/users/login
// @access  Public
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);

<<<<<<< HEAD
    if (user) {
      const token = generateToken(user._id);

      res.status(200).json({
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          phone_number: user.phone_number,
          gender: user.gender,
          date_of_birth: user.date_of_birth,
          membership_status: user.membership_status,
        },
        token,
      });
    } else {
      res.status(400).json({ error: "Invalid credentials" });
=======
    if (!user) {
      return res.status(400).json({ error: "Invalid credentials" });
>>>>>>> 58071ea8242600fd47bd59f30a2944e7b2cfe41b
    }

    const token = generateToken(user._id);

    res.status(200).json({
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone_number: user.phone_number,
        gender: user.gender,
        date_of_birth: user.date_of_birth,
        membership_status: user.membership_status,
      },
      token,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// @desc    Get authenticated user data
// @route   GET /api/users/me
// @access  Private
const getMe = async (req, res) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  signupUser,
  loginUser,
  getMe,
};
