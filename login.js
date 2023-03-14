var firebaseConfig = {
    apiKey: "AIzaSyBmsLRI8AnABG5N43j3q1noOsA4avWtUcs",
    authDomain: "petanque-statistik.firebaseapp.com",
    databaseURL: "https://petanque-statistik-default-rtdb.firebaseio.com/",
    projectId: "petanque-statistik",
    storageBucket: "petanque-statistik.appspot.com",
    messagingSenderId: "202978980820",
    appId: "1:202978980820:web:e1698d5c702c2b709ddc41",
    measurementId: "G-V4Q2KS4KG9"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
      // User is signed in.
     window.location.replace("admin.html")
     
  } else {
      // No user is signed in.
     
  }
});


function masuk() {
  var userEmail = document.getElementById("email_field").value;
  var userPass = document.getElementById("password_field").value;

  firebase.auth().signInWithEmailAndPassword(userEmail, userPass).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      window.alert("Error : " + errorMessage);
  });
}

function keluar() {
  firebase.auth().signOut();
  window.location.replace("index.html")
}

  
  
      
