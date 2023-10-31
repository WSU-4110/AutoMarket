import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth'; 
import { auth } from './../firebase';
import './CartPage.css';

function SignUpPage() {
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [message, setMessage] = useState("");

  const register = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, registerEmail, registerPassword);
      setMessage("Successfully registered!");

      setRegisterEmail("");
      setRegisterPassword("");
      
    } catch (error) {
      setMessage(`Registration Error: ${error.message}`);
    }
  };

  return (
      
    <div className="signup-container">

      <div className="signup-form">
       
      <h1 class="underline-heading">Shopping Cart</h1>
        <br></br>
        <br></br>

        <h2>My Cart</h2>
        <br></br>
        <br></br>

        <h2>Item 1</h2>
        <img src="pic_trulli.jpg" alt="Italiansfsdfsdfsd Trulli"></img>
        <br></br>
        <br></br>

        <h2>Item 2</h2>
        <img src="pic_trulli.jpg" alt="Italiansfsdfsdfsd Trulli"></img>
        <br></br>
        <br></br>
    
        <h2>Item 3</h2>
        <img src="pic_trulli.jpg" alt="Italiansfsdfsdfsd Trulli"></img>
        <br></br>
        <br></br>
      </div>

    </div>

  );
}

export default SignUpPage;
