import firebase from "firebase";
var config = {
  apiKey: "AIzaSyCUK6M9YrsQ9b95lECCv1vWAZTamhjnf0Y",
  authDomain: "chronic-care-220004.firebaseapp.com",
  databaseURL: "https://chronic-care-220004.firebaseio.com",
  projectId: "chronic-care-220004",
  storageBucket: "chronic-care-220004.appspot.com",
  messagingSenderId: "113219295435"
};
firebase.initializeApp(config);
export const db = firebase.firestore();
const settings = { timestampsInSnapshots: true };
db.settings(settings);
export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();
export default firebase;
