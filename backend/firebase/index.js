// Importing the Firebase Admin SDK
var admin = require("firebase-admin");
// This imports the Firebase Admin SDK, which allows server-side interaction
// with Firebase services like Firestore, Authentication, Cloud Messaging, etc.

// Loading the service account key JSON file
var serviceAccount = require("../config/fbServiceAccountKey.json");
// This loads the service account key file, which contains credentials that
// allow your server to authenticate with Firebase. The path should point to
// the location of your service account key file.

// Initializing the Firebase Admin SDK with the service account credentials
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
// This initializes the Firebase Admin SDK using the service account credentials.
// The `credential` property is set to `admin.credential.cert(serviceAccount)`,
// which creates a credential object from the service account key. This allows
// your server to securely interact with Firebase services.
module.exports = admin;
