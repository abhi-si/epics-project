import { useState,useRef } from "react";
import { checkValidData } from "./Validate";
import { auth, provider } from "./Firebase";
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import Home from "./Home";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
// import { useNavigate } from "react-router-dom";
// import { createBrowserRouter } from "react-router-dom";
// import {Route,Routes} from "react-router-dom"


const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  
    const name = useRef(null);
    const email = useRef(null);
  const password = useRef(null);
  // const navigate = useNavigate();
  
 

  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
  }

 

  const handleButtonClick = () => {
    // console.log(email);
 
    //validate form data
    const message = checkValidData(email.current.value, password.current.value);
    setErrorMessage(message);
    if (message) return;

    // sign in sign up logic
    if (!isSignInForm) {
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
       
          const user = userCredential.user;
          // navigate("/home")
          console.log(user);
          
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + "" + errorMessage);
         
        });
    }
    else {
      
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          
          console.log(user);
          // navigate("/home")
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + "" + errorMessage);
        });
      
    }
  };
 
  const handleGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        // IdP data available using getAdditionalUserInfo(result)
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });

  };
  
  
  return (
    <div className="flex  ">
      <div className="w-3/5">
        <img
          // className="h-screen w-780px h-1024px "
          className="w-full h-1024px"
          src="./Rectangle 1.png"
          alt="loginpage"
        />
      </div>

      <div className="w-1/2 h-full">
        <div className="flex justify-center items-center">
          <img src="./Logo.png" alt="logo" />
        </div>
        <div>
          <h1 className="font-Times New Roman text-4xl font-bold text-center">
            Aahaar
          </h1>
          <p className="text-center">an Uphaar to all</p>
        </div>
        <form onSubmit={(e) => e.preventDefault()} className="text-center ">
          {!isSignInForm && (
            <input
              ref={name}
              type="text"
              required
              placeholder="Full Name"
              className=" bg-gray-100 
          rounded-lg"
            />
          )}

          <br></br>
          {/* <label for="email">Email</label> */}
          <input
            ref={email}
            type="text"
            required
            placeholder="Email address"
            className=" bg-gray-100 rounded-lg"
          />
          <br></br>
          <input
            ref={password}
            // type={passwordType}
            type="password"
            required
            placeholder="Password"
            className=" bg-gray-100 rounded-lg"
          />
          <br></br>

          <p className="text-red-500 font-bold py-2">{errorMessage} </p>
          <button
            className=" bg-green-900 font-medium font-['Poppins']  rounded-md"
            onClick={handleButtonClick}
          >
            {isSignInForm ? "Sign in" : "Sign up"}
          </button>

          <div>
            <img
              className="flex justify-center items-center "
              src="./Social icon.png"
              alt="logo"
            />
            <button onClick={handleGoogle} className=" bg-blue-500  rounded-md">
              Sign in with Google
            </button>
            <p className="py-4 cursor-pointer" onClick={toggleSignInForm}>
              {isSignInForm
                ? " New to Aahaar ? Sign Up Now"
                : "Already have an account? Sign in"}
            </p>
          </div>
        </form>
      </div>
      {/* <Routes>
        
        <Route path="/home" element={<Home />} />
      </Routes> */}
    </div>
  );
}

export default Login

