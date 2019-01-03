import firebase from 'firebase'

const config = {
    apiKey: "AIzaSyDS0fYNqU7Xb7C5ZVQ2qbNT0MbzRCBgPq0",
    authDomain: "vue-firebase-tutorial-da1bc.firebaseapp.com",
    databaseURL: "https://vue-firebase-tutorial-da1bc.firebaseio.com",
    projectId: "vue-firebase-tutorial-da1bc",
    storageBucket: "vue-firebase-tutorial-da1bc.appspot.com",
    messagingSenderId: "788590498912"
  }

firebase.initializeApp(config)
var auth = firebase.auth()
var database = firebase.database()

export {
    auth,
    database
}