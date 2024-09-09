const express = require("express"); // Import the Express framework to build the app.
const mongoose = require("mongoose"); // Import Mongoose to interact with MongoDB.
const morgan = require("morgan"); // Import Morgan for logging HTTP requests in the console.
const bodyParser = require("body-parser"); // Import Body-Parser to parse incoming request bodies.
const cors = require("cors"); // Import CORS to handle Cross-Origin Resource Sharing.
require("dotenv").config(); // Load environment variables from a .env file into process.env.
const fs = require("fs"); // fs is filesystem

// app
const app = express(); // Initialize the Express app.

// middlewares
app.use(morgan("dev")); // Use Morgan middleware for logging in development mode.
app.use(bodyParser.json({ limit: "2mb" })); // Use Body-Parser middleware to parse JSON request bodies.
app.use(cors()); // Use CORS middleware to enable cross-origin requests.

//routes middleware
// app.use("/api", authRoutes); // The "/api" is a prefix

fs.readdirSync("./routes").forEach((route) => {
  app.use("/api", require("./routes/" + route));
}); //// Dynamically load route files from the directory

// db
const connectDB = async () => {
  // Define an async function for connecting to the database.
  try {
    await mongoose.connect(process.env.DATABASE, {});
    console.log("DB Connected"); // Log success message if the connection is successful.
  } catch (err) {
    // Catch any errors that occur during the connection process.
    console.error("DB Connection Error:", err); // Log the error to the console.
    process.exit(1); // Exit the process with a failure code (1) to indicate that something went wrong.
  }
};

// server
const port = process.env.PORT || 8000; // Define the port number, using an environment variable if available, or defaulting to 8000.

app.listen(port, () => {
  // Start the Express server and listen on the specified port.
  console.log(`Server is running on port ${port}`); // Log a message when the server is successfully running.
});

// Execute the async database connection function
connectDB();
