const User = require("../models/user");

exports.createOrUpdateUser = async (req, res) => {
  // Extract user information from the request object
  const { name, pic, email } = req.user;

  try {
    // Find and update the user in the database
    const user = await User.findOneAndUpdate(
      { email: email }, // Find the user by their email address
      { name: email.split("@")[0], pic }, // Update the user's name and profile picture
      { new: true } // Return the updated user document
    );

    if (user) {
      // If the user exists and was updated, respond with the updated user information
      console.log("USER UPDATED", user);
      res.json(user);
    } else {
      // If the user does not exist, create a new user
      const newUser = await new User({
        email: email,
        name: email.split("@")[0],
        picture: pic,
      }).save(); // Save the new user to the database
      console.log("NEW USER SAVED TO THE DATABASE", newUser);
      // Respond with the newly created user information
      res.json(newUser);
    }
  } catch (err) {
    console.error("Error in createOrUpdateUser:", err.message);
    res
      .status(500)
      .json({ error: "An error occurred while updating the user" });
  }
};

exports.currentUser = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.user.email }).exec();
    res.json(user);
  } catch (err) {
    console.error("Error finding user:", err);
    res.status(500).json({ error: "Server error" });
  }
};
