import React, { useState } from 'react'
import { amazonLogoBlack } from '../assets/images/index'
import InfoIcon from '@mui/icons-material/Info';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { RotatingSquare } from 'react-loader-spinner';
import {motion} from 'framer-motion';

const Registration = () => {
    const auth = getAuth();
    const navigate = useNavigate();

    const [clientName, setClientName]=useState("");
    const [clientMobile, setClientMobile]=useState("");
    const [clientEmail, setClientEmail]=useState("");
    const [clientPsw, setClientPsw]=useState("");
    const [clientCpsw, setClientCpsw]=useState("");

    //Error Messages Start
    const [errClientName, setErrClientName]=useState("");
    const [errClientMobile, setErrClientMobile]=useState("");
    const [errClientEmail, setErrClientEmail]=useState("");
    const [errClientPsw, setErrClientPsw]=useState("");
    const [errClientCpsw, setErrClientCpsw]=useState("");
    const [firebaseErr, setFirebaseErr]=useState("");

    // Loding state
    const [loading, setLoading] = useState(false);
    const [successMsg, setsuccessMsg] = useState("");
    //email validates function
    const emailvalidates = (clientEmail) =>{
        return String(clientEmail)
        .toLowerCase()
        .match(/^\w([-]?\w+)*@\w([-]?\w+)*(\.\w{2,3})+$/);
    }

    //Handle functions
    const handleName = (e)=>{
        setClientName(e.target.value)
        console.log(clientName);
        setErrClientName("")
    }

    const handleEmail =(e)=>{
        setClientEmail(e.target.value)
        setErrClientEmail("")
        console.log(clientEmail);
        setFirebaseErr("")
    }

    const handleMobile =(e)=>{
        setClientMobile(e.target.value)
        setErrClientMobile("")
    }

    const handlePsw =(e)=>{
        setClientPsw(e.target.value)
        setErrClientPsw("")
    }

    const handleCpsw =(e)=>{
        setClientCpsw(e.target.value)
        setErrClientCpsw("")
    }


    // Submit button actions
    const handleRegistraion=(e)=>{
        e.preventDefault()
        if(!clientName){
            setErrClientName("Enter your name")
        }

        if(!clientMobile || clientMobile.length >10){
            setErrClientMobile("Mobile number should be of 10 digits")
        }

        if(!clientEmail){
            setErrClientEmail("Enter your email id")
        }else{
            if(!emailvalidates(clientEmail)){
                setErrClientEmail("Please enter a valid Email")
            }
        }

        if(!clientPsw){
            setErrClientPsw("Enter your password")
        }else{
            if(clientPsw.length < 6)
            setErrClientPsw("Password must be atleat 6 characters")
        }

        if(!clientCpsw){
            setErrClientCpsw("Enter your confirm password")
        }else{
            if(clientCpsw !== clientPsw){
                setErrClientCpsw("Password not match")
            }
        }

    
// need to make feilds empty
    if(clientName && clientEmail && emailvalidates(clientEmail) && clientMobile && clientPsw && clientCpsw === clientPsw && clientPsw.length>=6){
        setLoading(true);
            createUserWithEmailAndPassword(auth, clientEmail, clientPsw)
                .then((userCredential) => {
                   // update username and profile pic
                    updateProfile(auth.currentUser, {
                        displayName: clientName, photoURL: "https://example.com/jane-q-user/profile.jpg"
                      });
                    // Signed up 
                    const user = userCredential.user;
                    setLoading(false);
                    setsuccessMsg("Account Created Successfully!");
                    setTimeout(()=>{
                        navigate("/login");
                    },3000);
                    })
                    .catch((error) => {
                        const errorCode = error.code;
                        const errorMessage = error.message;
                        if(errorCode.includes("auth/email-already-in-use")){
                            setFirebaseErr("Email Already in use, Try Another One")
                        }
                    });

                setClientName("");
                setClientEmail("");
                setClientCpsw("");
                setClientMobile("");
                setClientPsw("");
                setFirebaseErr("");
    }
}
  return (
    <div className='w-full'>
      <div className='w-full bg-gray-100 pb-10'>
        <form className='w-[370px] mx-auto flex flex-col items-center'>
        <img className="w-32 pb-10" src={amazonLogoBlack} alt="amazon logo" />
        <div className='w-full border border-zinc-200 p-6'>
        <h2 className='font-titleFont font-medium text-3xl mb-4'>Create Account</h2>
              <div className='flex flex-col gap-3'>
                <div className='flex flex-col gap-2'>
                  <p className='text-sm font-medium'>Your Name</p>
                  <input 
                  onChange={handleName} 
                  value={clientName} 
                  className='w-full py-1 border border-zinc-400 px-2 text-base tounded-sm outline-none focus-within:border-[#e77600] focus-within:shadow-amazonInput duration-100'
                  type="text" />
                  {
                    errClientName && (
                        <p className='text-red-600 text-xs font-semibold tracking-wide flex-items-center gap-2 -mt-1.5'>
                            <span className='italic font-titleFont font-extrabold text-base pr-3'>!</span>{errClientName}</p>
                    )
                  }
                </div>
                <div className='flex flex-col gap-2'>
                  <p className='text-sm font-medium'>Mobile Number</p>
                  <input 
                  onChange={handleMobile} 
                  value={clientMobile}
                  className='w-full lowercase py-1 border border-zinc-400 px-2 text-base tounded-sm outline-none focus-within:border-[#e77600] focus-within:shadow-amazonInput duration-100'
                  type="number" />
                  {
                    errClientMobile && (
                        <p className='text-red-600 text-xs font-semibold tracking-wide flex-items-center gap-2 -mt-1.5'>
                        <span className='italic font-titleFont font-extrabold text-base pr-3'>!</span>{errClientMobile}</p>
                    )
                  }
                </div>
                <div className='flex flex-col gap-2'>
                  <p className='text-sm font-medium'>Email</p>
                  <input 
                  onChange={handleEmail} 
                  value={clientEmail}
                  className='w-full lowercase py-1 border border-zinc-400 px-2 text-base tounded-sm outline-none focus-within:border-[#e77600] focus-within:shadow-amazonInput duration-100'
                  type="email" />
                  {
                    errClientEmail && (
                        <p className='text-red-600 text-xs font-semibold tracking-wide flex-items-center gap-2 -mt-1.5'>
                        <span className='italic font-titleFont font-extrabold text-base pr-3'>!</span>{errClientEmail}</p>
                    )
                  }

                 {
                    firebaseErr && (
                        <p className='text-red-600 text-xs font-semibold tracking-wide flex-items-center gap-2 -mt-1.5'>
                        <span className='italic font-titleFont font-extrabold text-base pr-3'>!</span>{firebaseErr}</p>
                    )
                  }
                </div>
                <div className='flex flex-col gap-2'>
                  <p className='text-sm font-medium'>Password</p>
                  <input 
                  onChange={handlePsw} 
                  value={clientPsw}
                  className='w-full py-1 border border-zinc-400 px-2 text-base tounded-sm outline-none focus-within:border-[#e77600] focus-within:shadow-amazonInput duration-100'
                  type="password"  placeholder='At Least 6 Characters'/>
                  <span className='text-xs italic' > <InfoIcon className='text-blue-400'/> Passwords must be at least 6 characters</span>
                  {
                    errClientPsw && (
                        <p className='text-red-600 text-xs font-semibold tracking-wide flex-items-center gap-2 -mt-1.5'>
                        <span className='italic font-titleFont font-extrabold text-base pr-3'>!</span>{errClientPsw}</p>
                    )
                  }
                </div>

                <div className='flex flex-col gap-2'>
                  <p className='text-sm font-medium'>Confirm Password</p>
                  <input  
                  onChange={handleCpsw} 
                  value={clientCpsw}
                  className='w-full py-1 border border-zinc-400 px-2 text-base tounded-sm outline-none focus-within:border-[#e77600] focus-within:shadow-amazonInput duration-100'
                  type="password" />
                  {
                    errClientCpsw && (
                        <p className='text-red-600 text-xs font-semibold tracking-wide flex-items-center gap-2 -mt-1.5'>
                        <span className='italic font-titleFont font-extrabold text-base pr-3'>!</span>{errClientCpsw}</p>
                    )
                  }
                </div>
                <button onClick={handleRegistraion} className='w-full py-1.5 text-sm font-normal rounded-sm bg-gradient-to-t from-[#f0c14b] hover:bg-gradient-to-b border border-zinc-400 active:border-yellow-800 active:shadow-amazonInput'>
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
                {
                    successMsg && (
                        <div>
                            <motion.p
                            initial={{y:10 , opacity:0}}
                            animate={{y:0, opacity:1}}
                            transition={{duration:0.5}}
                            className='text-base font-titleFont font-semibold text-green-500 border-[1px] border-green-500 px-2 text-center'
                            >{successMsg}</motion.p>
                        </div>
                    )
                }
            </div>
            <div className='w-full text-xs mt-4 leading-4 text-black'>
                <p>Already have an account? 
                    <Link to="/login">
                    <span  className='text-blue-600 hover:text-orange-600 hover:underline duration-100 cursor-pointer underline-offset-1'>Sign in</span>
                    </Link>
                </p>
                <p>Buying for work? <span className='text-blue-600  hover:text-orange-600 hover:underline duration-100 cursor-pointer underline-offset-1'>Create a free business account.</span></p><br />
                <p>By creating an account or logging in, you agree to Amazon’s <span className='text-blue-600  hover:text-orange-600 hover:underline duration-100 cursor-pointer underline-offset-1'>Conditions of Use </span>and <span className='text-blue-600  hover:text-orange-600 hover:underline duration-100 cursor-pointer underline-offset-1'>Privacy Policy.</span></p>
            </div>
        </div>
        </form>
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

export default Registration
