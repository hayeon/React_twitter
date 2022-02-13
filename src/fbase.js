import firebase from 'firebase/app'; 
import 'firebase/auth'; 
import 'firebase/firestore';



const firebaseConfig = {
apiKey: process.env.REACT_APP_API_KEY,
authDomain: process.env.REACT_APP_AUTH_DOMAIN,
projectId: process.env.REACT_APP_PROJECT_I,
storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
messagingSenderId: process.env.REACT_APP_MEDSSAGING_SENDER_ID,
appId: process.env.REACT_APP_APP_ID,
};


firebase.initializeApp(firebaseConfig);
//버전 9부터 auth 는 요런식으로 가져와야 함
export const authService = firebase.auth;






