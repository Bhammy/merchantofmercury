var firebase = require('firebase');

var config = {
  apiKey: "AIzaSyDUsEM0_j-XPrysNa9Q_ybi4ddBVbvJnDY",
  authDomain: "merchantofmercury-35d98.firebaseapp.com",
  databaseURL: "https://merchantofmercury-35d98.firebaseio.com",
  projectId: "merchantofmercury-35d98",
  storageBucket: "",
  messagingSenderId: "746925783171"
};

const firebaseDB = firebase.initializeApp(config);

const database = firebaseDB.database();

module.exports = database;
