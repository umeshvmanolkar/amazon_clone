import React, { useState } from 'react'
import { amazonLogoBlack } from '../assets/images/index'
import { Link, useNavigate } from 'react-router-dom'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { RotatingSquare } from 'react-loader-spinner';
import { useDispatch } from 'react-redux';
import { setUserInfo } from '../redux/amazonSlice';


const Signin = () => {
  const dispatch = useDispatch();
  const auth = getAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");

  const [errEmail, setErrEmail] = useState("");
  const [errPassword, setErrPassword] = useState("");
  //Firebase Errors
  const [firebaseErrEmail, setFirebaseErrEmail]=useState("");
  const [firebaseErrPass, setFirebaseErrPass]=useState("");

   // Loding state
   const [loading, setLoading] = useState(false);
   const [successMsg, setsuccessMsg] = useState("");

  const handleEmail =(e)=>{
    setEmail(e.target.value)
    setErrEmail("")
    setFirebaseErrEmail("")
  }
  const handlePassword = (e)=>{
    setpassword(e.target.value);
    setErrPassword("");
    setFirebaseErrPass("");
  }

  
  // After click on continue button
  const handleLogin =(e)=>{
    e.preventDefault();
    if(!email){
      setErrEmail("Please Enter a valid email address")
    }

    if(!password){
      setErrPassword("Enter your Password")
    }

  if(email && password){
    setLoading(true)
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      dispatch(setUserInfo({
        _id:user.id,
        userName:user.displayName,
        userEmail: user.email,
        userPhoto: user.photoURL
      })
      );

      setLoading(false);
      setsuccessMsg("Logged in Successfully! Welcome to Amazon!");
      setTimeout(()=>{
        navigate("/")
      },2000)
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      if(errorCode.includes("auth/email-already-in-use")){
        setFirebaseErrEmail("Email Already in use, Try Another One")
      }
      if(errorCode.includes("auth/wrong-password")){
        setFirebaseErrPass("Wrong Password! Please try again!")
      }

      //console.log("Something is wrong, Please try it again later!")
      console.log(errorMessage)

    });
    setEmail("");
    setpassword("");
  }
}

  return (
    <div className='w-full'>
      <div className='w-full bg-gray-100 pb-10'>
        {
          successMsg ? (
            <div className='w-full justify-centeritems-center py-32'>
                <p
                className='text-lg font-titleFont font-semibold text-green-500 border-[1px] border-green-600 px-6 py-2 text-center'>
                  {successMsg}
                </p>
               </div>
          ):(
            <form className='w-[350px] mx-auto flex flex-col items-center'>
            <img className="w-32 pb-10" src={amazonLogoBlack} alt="amazon logo" />
            <div className='w-full border border-zinc-200 p-6'>
              <h2 className='font-titleFont font-medium text-3xl mb-4'>Sign in</h2>
              <div className='flex flex-col gap-3'>
                <div className='flex flex-col gap-2'>
                  <p className='text-sm font-medium'>Email</p>
                  <input 
                  onChange={handleEmail} 
                  value={email}
                  className='w-full py-1 border border-zinc-400 px-2 text-base tounded-sm outline-none focus-within:border-[#e77600] focus-within:shadow-amazonInput duration-100'
                  type="email" />
                  {
                    errEmail && (
                      <p className='text-red-600 text-xs font-semibold tracking-wide flex-items-center gap-2 -mt-1.5'>
                            <span className='italic font-titleFont font-extrabold text-base pr-3'>!</span>{errEmail}</p>
                    )
                  }
                   {
                    firebaseErrEmail && (
                        <p className='text-red-600 text-xs font-semibold tracking-wide flex-items-center gap-2 -mt-1.5'>
                        <span className='italic font-titleFont font-extrabold text-base pr-3'>!</span>{firebaseErrEmail}</p>
                    )
                  }
                </div>
                <div className='flex flex-col gap-2'>
                  <p className='text-sm font-medium'>Password</p>
                  <input  
                  onChange={handlePassword} 
                  value={password}
                  className='w-full py-1 border border-zinc-400 px-2 text-base tounded-sm outline-none focus-within:border-[#e77600] focus-within:shadow-amazonInput duration-100'
                  type="password" />
                  {
                    errPassword && (
                      <p className='text-red-600 text-xs font-semibold tracking-wide flex-items-center gap-2 -mt-1.5'>
                            <span className='italic font-titleFont font-extrabold text-base pr-3'>!</span>{errPassword}</p>
                    )
                  }
                   {
                    firebaseErrPass && (
                        <p className='text-red-600 text-xs font-semibold tracking-wide flex-items-center gap-2 -mt-1.5'>
                        <span className='italic font-titleFont font-extrabold text-base pr-3'>!</span>{firebaseErrPass}</p>
                    )
                  }
                </div>
                <button onClick={handleLogin} className='w-full py-1.5 text-sm font-normal rounded-sm bg-gradient-to-t from-[#f0c14b] hover:bg-gradient-to-b border border-zinc-400 active:border-yellow-800 active:shadow-amazonInput'>
                  Continue
                </button>
                {
                    loading && (
                        <div className='flex justify-center'>
                            <RotatingSquare
                            height="100"
                            width="100"
                            color="#febd69"
                            ariaLabel="rotating-square-loading"
                            strokeWidth="4"
                            wrapperStyle={{}}
                            wrapperClass=""
                            visible={true}
                            />
                        </div>
                    )
                }
                
            </div>
            <p className='text-xs text-black leading-4 mt-4'>By Continuing, you agree to Amazon's <span className='text-blue-600 mb-4'>Contidions of Use</span> and <span className='text-blue-600'>Privacy Notice.</span></p>
            </div>
            <p className='w-full text-xs text-gray-600 mt-4 flex items-center'>
              <span className='w-1/3 h-[1px] bg-zinc-400 inline-flex'></span>
              <span className='w-1/3 text-center text-blue-600'>New To Amazon?</span>
              <span className='w-1/3 h-[1px] bg-zinc-400 inline-flex'></span>
            </p>
           <Link className="w-full" to="/register">
              <button className='w-full py-1.5 text-sm font-normal rounded-sm bg-gradient-to-t from-slate-200 to-slate-100 hover:bg-gradient-to-b border border-zinc-400 active:border-yellow-800 active:shadow-amazonInput mt-3'>
                  Create your Amazon account
              </button>
           </Link>
        </form>
          )
        }
      </div>
      <div className='w-full bg-gradient-to-t from-white  via-white to-zinc-200 flex flex-col gap-4  justify-center items-center py-10'>
        <div className='flex items-center gap-6'>
          <p className='text-xs text-blue-600 hover:text-orange-600 hover:underline undeline-offset-1 cursor-pointer duration-100'>Conditions of Use</p>
          <p className='text-xs text-blue-600 hover:text-orange-600 hover:underline undeline-offset-1 cursor-pointer duration-100'>Privacy Notice</p>
          <p className='text-xs text-blue-600 hover:text-orange-600 hover:underline undeline-offset-1 cursor-pointer duration-100'>Help</p>
        </div>
        <p className='text-xs text-gray-600'>© 1996-2023, Amazon.com, Inc. or its affiliates</p>
      </div>
    </div>
  )
}

export default Signin
