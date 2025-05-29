const firebaseConfig = {
  apiKey: "AIzaSyCuP6VscPxkQS5D5z7bCYWXijzaYCdbF2s",
  authDomain: "starkoscript.firebaseapp.com",
  databaseURL: "https://starkoscript-default-rtdb.firebaseio.com",
  projectId: "starkoscript",
  storageBucket: "starkoscript.appspot.com",
  messagingSenderId: "381525854892",
  appId: "1:381525854892:android:50ba5daa1cffae8faa2d09"
};

firebase.initializeApp(firebaseConfig);
const database = firebase.database();
