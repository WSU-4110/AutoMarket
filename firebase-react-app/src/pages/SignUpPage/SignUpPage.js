import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, writeUserData } from './../../firebase'; 
import './SignUpPage.css';
import Header from "./../../Header";

function SignUpPage() {
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const register = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setMessage("");
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, registerEmail, registerPassword);
      const userId = userCredential.user.uid;
      await writeUserData(userId, registerEmail, firstName, lastName, phoneNumber, registerPassword);

      setMessage("Successfully registered!");
      setRegisterEmail("");
      setRegisterPassword("");
      setFirstName("");
      setLastName("");
      setPhoneNumber("");
    } catch (error) {
      setMessage(`Registration Error: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Header />
      <div className="signup-container">
        <form className="signup-form" onSubmit={register}>
          <h2>Register</h2>
          {/* Input fields */}
          <button className="signup-btn" type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Registering...' : 'Register'}
          </button>
          {message && <div className="message">{message}</div>}
        </form>
      </div>
    </>
  );
}

export default SignUpPage;
