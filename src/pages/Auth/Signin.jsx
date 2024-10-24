import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../../Utilities/firebase';


function Signin() {

    const navigate = useNavigate()
    const[email, setEmail] = useState("")
    const[password, setPassword] = useState("")
    const [isSignedIn, setIsSignedIn] = useState(false)



    const handleSubmitSignIn = async(e)=> {
        e.preventDefault()
        await signInWithEmailAndPassword(auth, email, password)
        .then(()=>{
            navigate('/')
            alert("login succesfull")
        })
       

        // try {
            //     console.log("login succesfull")
            // } catch (error) {
                //     console.log(error.message)
                
                // }
                .catch((error) => {
                    const errorMessage = error.message;
                    alert(errorMessage)
                });
            }
            
            const handleSignOut = () => {
                signOut(auth)
                  .then(() => {
                    // Handle sign-out success (e.g., redirect to login page)
                    navigate('/auth/signin');
                    alert('Signed out successfully');
                    setIsSignedIn(false);
                  })
                  .catch((error) => {
                    // Handle sign-out errors
                    console.error('Sign-out error:', error);
                    alert('Sign-out failed');
                  });
              };
            return (
        <div className="login-container">
            <div className="login-form" >
                <h2 className="login-title">Login</h2>
                <form onSubmit={handleSubmitSignIn}> 
                    <label htmlFor="email" className="login-label">Email:</label>
                    <input type="email" id="email" name="email" className="login-input" onChange={(e)=>setEmail(e.target.value)} />

                    <label htmlFor="password" className="login-label">Password:</label>
                    <input type="password" id="password" name="password" className="login-input" onChange={(e)=>setPassword(e.target.value)} />
                    <Link to="/auth/signup" className="mr-5 hover:text-gray-900">Dont hv an account? register
          </Link>

          {isSignedIn ? (
            <button type="submit" className="login-button" onClick={handleSignOut}>
                Sign Out
            </button>
          ) : (

                <button type="submit" className="login-button">Signin</button>
          )}
            </form>
        </div>
        </div>
    );
}

export default Signin;