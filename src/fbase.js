import firebase from 'firebase/app'; 
import 'firebase/auth'; 
import 'firebase/firestore';

const firebaseConfig = {
apiKey: "AIzaSyCQGa4Ncx_thjRBRbo72CNluEq5xxn6oTE",
authDomain: "ntwitter-139c8.firebaseapp.com",
databaseURL: "https://ntwitter-139c8-default-rtdb.firebaseio.com",
projectId: "ntwitter-139c8",
storageBucket: "ntwitter-139c8.appspot.com",
messagingSenderId: "564134784056",
appId: "1:564134784056:web:ad897a7c5ccdef378d0acd"
};

firebase.initializeApp(firebaseConfig);
export const authService = firebase.auth();







