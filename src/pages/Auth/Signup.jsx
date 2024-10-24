import { createUserWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { addDoc, auth, collection, db } from '../../Utilities/firebase';
function Signup() {

    const navigate= useNavigate();

    const[email, setEmail] = useState("")
    const[password, setPassword] = useState("")
    const[user, setUser] = useState("")

    const handleSubmit = (e)=> {
        e.preventDefault()
        createUserWithEmailAndPassword(auth, email, password)
        .then(() => {
            
            alert("User Successfully Created")
            navigate("/auth/signin")
            console.log("signup succesfull created")
            })
            .catch((error) => {
                const errorMessage = error.message;
                alert(errorMessage)
                });
                }

                try {
                    const docRef = addDoc(collection(db, "userInfo"), {
                        name: user,
                        emailAddress: email,
                        
                      });
                    console.log("Document written with ID: ", docRef.id);
                  } catch (e) {
                    console.error("Error adding document: ", e);
        // try {


        // } catch (error) {
        //     console.log(error.message)
            
        // }
    }


    return (
        <div className="signup-container">
            <form className="signup-form" onSubmit={handleSubmit}>
            <h2 className="signup-title">Sign Up</h2>

                <label htmlFor="username" className="signup-label">Username:</label>
                <input type="text" id="username" name="username" className="signup-input" onChange={(e)=>setUser(e.target.value)} />

                <label htmlFor="email" className="signup-label">Email:</label>
                <input type="email" id="email" name="email" className="signup-input" onChange={(e)=>setEmail(e.target.value)}/>

                <label htmlFor="password" className="signup-label">Password:</label>
                <input type="password" id="password" name="password" className="signup-input" onChange={(e)=>setPassword(e.target.value)} />
                <Link to="/auth/signin" className="mr-5 hover:text-gray-900">Already have an account ?Login
          </Link>
                <button type="submit" className="signup-button">Sign Up</button>
            </form>
        </div>
    );
}

export default Signup;