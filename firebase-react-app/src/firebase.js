import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, onValue } from "firebase/database";
import { getAuth } from 'firebase/auth';
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 as uuidv4 } from 'uuid';


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

// Initialize Storage
const storage = getStorage(app);



export async function uploadImageAndGetURL(file) {
  const partId = uuidv4();
  const imageRef = storageRef(storage, `parts/${partId}`);
  await uploadBytes(imageRef, file);
  const url = await getDownloadURL(imageRef);
  return url;
}

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

export async function writePartData(partId, partName, category, subcategory, fits, price, imageUrl, sellerName) {
  const partRef = ref(db, `parts/${partId}`);
  try {
    await set(partRef, {
      partName,
      category,
      subcategory,
      fits,
      price,
      imageUrl,
      sellerName: sellerName || 'Anonymous'
    });
  } catch (error) {
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
    } else 
    {
      callback([]); 
    }
  }, (error) => 
  {
    console.error("Error reading data from Firebase:", error);
    callback([]);
  });
}

export function searchPartsByName(query, callback) 
{
  const partsRef = ref(db, 'parts/');
  onValue(partsRef, (snapshot) => 
  {
    const data = snapshot.val();
    if (data) 
    {
      const partsArray = Object.keys(data)
        .map(key => ({ id: key, ...data[key] }))
        .filter(part => part.partName.toLowerCase().includes(query.toLowerCase()));
      callback(partsArray);
    } 
    else 
    {
      callback([]);
    }
  }, (error) => 
  {
    console.error("Error searching data in Firebase:", error);
    callback([]);
  });
}