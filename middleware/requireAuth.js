const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const requireAuth = async (req, res, next) => {
  const authorization = req.headers.authorization;

  if (!authorization) {
    return res.status(401).json({ error: "Authorization token required" });
  }

  // Debug logs required by iteration3 tests
  console.log(authorization);
  console.log(authorization.split(" "));
  console.log(authorization.split(" ")[0]);
  console.log(authorization.split(" ")[1]);
  console.log("Learning something new");

  // Accept token after any prefix (Bearer, Token, etc.)
  const token = authorization.split(" ")[1];

  try {
    const decodedToken = jwt.verify(token, process.env.SECRET);
    const user = await User.findById(decodedToken._id);

    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: "Request is not authorized" });
  }
};

module.exports = requireAuth;
