// https://firebase.google.com/docs/web/setup#available-libraries
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// import { getAuth } from "firebase/auth";
// import { getFirestore } from "firebase/firestore";
// import "firebase/compat/auth";
// import "firebase/compat/firestore";

// import firebaseConfig from "./firebaseConfig";

// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

// const auth = getAuth(app);
// const db = getFirestore(app);

// export { auth, db };
// export { app };

// console.log(app);
// console.log(auth);

//добавить в HTML
//<a href="email-password.html">Email and Password authentication</a>

import firebaseConfig from "./firebaseConfig";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

firebase.initializeApp(firebaseConfig);

// console.log(firebase);

    /**
     * Handles the sign in button press.
     */
    function toggleSignIn() {
      if (firebase.auth().currentUser) {
        firebase.auth().signOut();
      } else {
        var email = document.getElementById('email').value;
        var password = document.getElementById('password').value;
        if (email.length < 4) {
          alert('Please enter an email address.');
          return;
        }
        if (password.length < 4) {
          alert('Please enter a password.');
          return;
        }
        // Sign in with email and pass.
        firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          if (errorCode === 'auth/wrong-password') {
            alert('Wrong password.');
          } else {
            alert(errorMessage);
          }
          console.log(error);
          document.getElementById('quickstart-sign-in').disabled = false;
        });
      }
      document.getElementById('quickstart-sign-in').disabled = true;
    }

    /**
     * Handles the sign up button press.
     */
    function handleSignUp() {
      var email = document.getElementById('email').value;
      var password = document.getElementById('password').value;
      if (email.length < 4) {
        alert('Please enter an email address.');
        return;
      }
      if (password.length < 4) {
        alert('Please enter a password.');
        return;
      }
      // Create user with email and pass.
      firebase.auth().createUserWithEmailAndPassword(email, password)
//         .then(function (user) {
//           console.log(user);
//   //If a user is successfully created with an appropriate email
// if (user != null){
//   user.user.sendEmailVerification();
// }
//         })
        .catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        if (errorCode == 'auth/weak-password') {
          alert('The password is too weak.');
        } else {
          alert(errorMessage);
        }
        console.log(error);
      });
    }

    /**
     * Sends an email verification to the user.
     */
    function sendEmailVerification() {
      firebase.auth().currentUser.sendEmailVerification().then(function () {
        // console.log("firebase.auth().currentUser");
        // console.log(firebase.auth().currentUser);
        // Email Verification sent!
        alert('Email Verification Sent!');
      });
    }

    function sendPasswordReset() {
      var email = document.getElementById('email').value;
      firebase.auth().sendPasswordResetEmail(email).then(function() {
        // Password Reset Email Sent!
        alert('Password Reset Email Sent!');
      }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        if (errorCode == 'auth/invalid-email') {
          alert(errorMessage);
        } else if (errorCode == 'auth/user-not-found') {
          alert(errorMessage);
        }
        console.log(error);
      });
    }

    /**
     * initApp handles setting up UI event listeners and registering Firebase auth listeners:
     *  - firebase.auth().onAuthStateChanged: This listener is called when the user is signed in or
     *    out, and that is where we update the UI.
     */
    function initApp() {
      // Listening for auth state changes.
      firebase.auth().onAuthStateChanged(function(user) {
        document.getElementById('quickstart-verify-email').disabled = true;
        if (user) {
          // User is signed in.
          var displayName = user.displayName;
          var email = user.email;
          var emailVerified = user.emailVerified;
          var photoURL = user.photoURL;
          var isAnonymous = user.isAnonymous;
          var uid = user.uid;
          var providerData = user.providerData;
          document.getElementById('quickstart-sign-in-status').textContent = 'Signed in';
          document.getElementById('quickstart-sign-in').textContent = 'Sign out';
          document.getElementById('quickstart-account-details').textContent = JSON.stringify(user, null, '  ');
          if (!emailVerified) {
            document.getElementById('quickstart-verify-email').disabled = false;
          }
        } else {
          // User is signed out.
          document.getElementById('quickstart-sign-in-status').textContent = 'Signed out';
          document.getElementById('quickstart-sign-in').textContent = 'Sign in';
          document.getElementById('quickstart-account-details').textContent = 'null';
        }
        document.getElementById('quickstart-sign-in').disabled = false;
      });

      document.getElementById('quickstart-sign-in').addEventListener('click', toggleSignIn, false);
      document.getElementById('quickstart-sign-up').addEventListener('click', handleSignUp, false);
      document.getElementById('quickstart-verify-email').addEventListener('click', sendEmailVerification, false);
      document.getElementById('quickstart-password-reset').addEventListener('click', sendPasswordReset, false);
    }

    window.onload = function() {
      initApp();
    };