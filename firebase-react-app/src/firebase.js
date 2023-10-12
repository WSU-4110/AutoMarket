// Import the functions you need from the SDKs you need
//import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { /*get,*/getDatabase, ref, set } from "firebase/database";
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyDl5jy0QAcfbGUvp3Xom2lwQSJiZ0ziOrg",
  authDomain: "auto-market-37b17.firebaseapp.com",
  databaseURL: "https://auto-market-37b17-default-rtdb.firebaseio.com",
  projectId: "auto-market-37b17",
  storageBucket: "auto-market-37b17.appspot.com",
  messagingSenderId: "803843115297",
  appId: "1:803843115297:web:cd71c7ecdbf9712c9a5660",
  measurementId: "G-7638D025LK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Authentication
export const auth = getAuth(app)


//const analytics = getAnalytics(app);

// Initialize Database
export const db = getDatabase(app);

export function writeUserData(userId, email, password) 
{ 
    const userRef = ref(db, 'users/' + userId); 
    set(userRef, 
        {
        email: email,
        password: password  // Remember to store hashed & salted passwords in a production application!
    });
}

export function writePartData(partId, partName, category, subcategory, fits) 
{ 
  const partRef = ref(db, 'parts/' + partId); 
  set(partRef, {
      name: partName,
      category: category,
      subcategory: subcategory,
      fits: fits
  });
}
writePartData("101 ", "break pads", "Breaks", "Brembo", "S1" );
writePartData("102", "spark plug", "Ignition", "NGK", "S4");
writePartData("103", "headlight", "Lighting", "Philips", "LX1");

// Example usage
writeUserData("AliAlsalman", "testing@gmail.com", "testpassword"); 
