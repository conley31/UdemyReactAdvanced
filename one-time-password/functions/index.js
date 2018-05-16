const admin = require('firebase-admin');
const functions = require('firebase-functions');
var serviceAccount = require("./service_account.json");
const createUser = require('./create_user');
const generateCode = require('./generate_code');
const verifyPass = require('./verify_pass');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://one-time-password-eadcf.firebaseio.com"
});

exports.createUser = functions.https.onRequest(createUser);

exports.generateCode = functions.https.onRequest(generateCode);

exports.verifyPass = functions.https.onRequest(verifyPass);
