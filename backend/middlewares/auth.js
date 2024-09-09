const admin = require("../firebase");
const User = require("../models/user");

exports.authCheck = async (req, res, next) => {
  // console.log(req.headers); //token
  const token = req.headers.authtoken;
  if (!token) {
    return res.status(401).json({ err: "No token provided" }); // Respond if no token is provided
  }

  try {
    const firebaseUser = await admin
      .auth()
      .verifyIdToken(req.headers.authtoken);
    // console.log("FIREBASE USER IN AUTHENTICATION CHECK", firebaseUser);
    req.user = firebaseUser;
    next();
  } catch (err) {
    console.log(err.message);
    res.status(401).json({
      err: "Invalid or expired token",
    });
  }
};

exports.adminCheck = async (req, res, next) => {
  const { email } = req.user;

  const adminUser = await User.findOne({ email }).exec();
  if (adminUser.role !== "admin") {
    res.status(403).json({
      err: "Admin resource. Access denied",
    });
  } else {
    next();
  }
};
