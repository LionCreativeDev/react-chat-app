import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

const firebaseConfig = {
    piKey: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    authDomain: "react-chat-app-xxxxx.firebaseapp.com",
    databaseURL: "https://react-chat-app-xxxxx-default-rtdb.firebaseio.com",
    projectId: "react-chat-app-xxxxx",
    storageBucket: "react-chat-app-xxxxx.appspot.com",
    messagingSenderId: "xxxxxxxxxxxx",
    appId: "1:xxxxxxxxxxxx:web:xxxxxxxxxxxxxxxxxxxxx"
};

firebase.initializeApp(firebaseConfig);

export default firebase;

// class Firebase {
//     constructor() {
//       firebase.initializeApp(firebaseConfig);
//     }
// }

// export default Firebase;