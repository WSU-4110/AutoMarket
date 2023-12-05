import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, onValue } from "firebase/database"; 
import { getAuth } from 'firebase/auth';

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

// Initialize Database
export const db = getDatabase(app);



export function writeUserData(userId, email, firstName, lastName, phoneNumber, password) 
{
  const userRef = ref(db, 'users/' + userId);
  set(userRef, 
    {
    email: email,
    firstName: firstName,
    lastName: lastName,
    phoneNumber: phoneNumber,
    password: password
  });
}

export async function writePartData(partId, partName, category, subcategory, fits, price) {
  try {
    const partRef = ref(db, `parts/${partId}`);
    await set(partRef, {
      partName: partName,
      category: category,
      subcategory: subcategory,
      fits: fits,
      price: price
    });
  } catch (error) 
  {
    console.error("Error writing data to Firebase:", error);
    throw error;
  }

}
export function readPartsData(callback) 
{
  const partsRef = ref(db, 'parts/');
  onValue(partsRef, (snapshot) => {
    const data = snapshot.val();
    if (data) {
      const partsArray = Object.keys(data).map(key => ({ id: key, ...data[key] }));
      callback(partsArray);
    } else {
      callback([]); 
    }
  }, (error) => {
    console.error("Error reading data from Firebase:", error);
    callback([]); 
  });
}