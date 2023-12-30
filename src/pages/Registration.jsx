import React, { useState } from 'react'
import Lottie from "lottie-react";
import register from "../lottie/animationregister.json"
import Buttons from '../components/Buttons';
import { BsEyeFill,BsEyeSlashFill } from 'react-icons/bs';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CirclesWithBar } from 'react-loader-spinner'
import {createUserWithEmailAndPassword, getAuth, updateProfile} from 'firebase/auth'
import { getDatabase, ref, set } from "firebase/database";
import { Link, useNavigate } from 'react-router-dom';
import Button from '../components/btn/Button';



const Registration = () => {

    const navigate = useNavigate("")
    const db = getDatabase();


    const auth = getAuth();
    const [fullName, setFulllName] = useState("")
    const [email, setEmail]= useState("")
    const [password, setPassword]= useState("")
    const [rePassword, setRePassword]= useState("")

    // loader start
    const [loader,setLoader]=useState(false)
    // loder end 


    // showpassword 
    const [showPassword ,  setShowPassword] = useState(false)
    // showpassword
    const [fullNameError, setFulllNameError]= useState("")
    const [emailError, setEmailError] = useState("")
    const [passwordError,setPasswordError] =useState("")
    const [rePasswordError, setRePasswordError]= useState("")
    const handelShow =()=>{
        setShowPassword(!showPassword)
    }

    
    const handelName =(e)=>{
        setFulllName(e.target.value)
        setFulllNameError("")

    }

    const handelEmail = (e)=>{
        setEmail(e.target.value)
        setEmailError("")
    }

    const handelPassword = (e)=>{
        setPassword(e.target.value)
        setPasswordError("")
    }

    const handelRePassword=(e)=>{
        setRePassword(e.target.value)
        setRePasswordError("")
    }

    const handelSubmit =(e)=>{
        e.preventDefault()

        if(!fullName){
            setFulllNameError("Full name is required")
        }
        else if(!email){
            setEmailError("Email is required")
        }
        else if(!password){
            setPasswordError("Password is required")
        }
        else if(!rePassword){
            setRePasswordError("enter your password again")
        }
        else if(password!==rePassword){
            setRePasswordError("password not match")
        }
         // firebase registration start 
        if(fullName && email && password && rePassword && password === rePassword){
            
            setLoader(true)
            createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {

                updateProfile(auth.currentUser, {
                    displayName: fullName,
                    photoURL: "https://st2.depositphotos.com/1104517/11965/v/450/depositphotos_119659092-stock-illustration-male-avatar-profile-picture-vector.jpg"
                  }).then(() => {
                     // Signed in 
                        const user = userCredential.user;
                        toast.success("Metu  registration successful ");
                        setTimeout(() => {
                        navigate("/login")
                        }, 2000);
                        setLoader(false)  
                      })

                      .then(()=>{
                        set(ref(db, 'users/'+auth.currentUser.uid ), {
                            username: fullName,
                            email: email,
                            
                          });

                      })
                      
                      .catch((error) => {
                        console.log(error)
                        // An error occurred
                        // ...
                    });
               
              })
              .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                if(errorMessage.includes("auth/email-already-in-use")){
                    setEmailError("Email is already used")
                    toast.error("Email is already used")
                }
                console.log(errorMessage)
                setLoader(false)
                // toast("Email is already used ");
                // ..
              });
            }
        // firebase registration end 
    }
  return (   
   <div className=''>
        <ToastContainer position="top-center" />
     <div className='container mx-auto py-10 lg:py-0   '>

                <h1 className=' pt-7 px-2   text-4xl text-center text-quaternary font-bold font-mono md:flex justify-center items-center '>Welcome to <span className='text-quinary md:text-6xl animate-bounce' >MeTu</span> Chat Room</h1>

                
                <div className=" text-center lg:flex gap-x-20  items-center">
                    {/* animation start here */}
                    <div className='lg:w-1/2 '>
                        
                    <Lottie animationData={register}  />
                    </div>
                    {/* animation end here */}
            
                    { /* registration form start  */}
                
                

                        <form onSubmit={handelSubmit} className=' lg:w-1/2 lg:shadow-2xl px-2 shadow-quinary lg:p-10 rounded-lg' >
                        <h2 className=' text-2xl md:text-4xl text-center text-quaternary font-semibold font-sans mb-5 '>Please Registration</h2>
                            <div   className='mt-4 ' >
                                <input onChange={handelName} value={fullName} type="name" placeholder='Enter full Name'   className='  w-full rounded-md border-4   border-Tertiary outline-quinary px-5 py-2' />
                                <p className=' px-5 text-red-500 text-left' >{fullNameError}</p>
                            </div>
                            <div  className='mt-4 l' >
                            <input onChange={handelEmail} value={email} type="email" placeholder='Enter Email'   className='  w-full rounded-md border-4 border-Tertiary outline-quinary px-5 py-2' />
                            <p className=' px-5 text-red-500 text-left' >{emailError}</p>
                            </div>
                            <div  className='mt-4 relative ' >
                            <input onChange={handelPassword} value={password} type= {showPassword ? "text": "password"}  placeholder='Enter password'   className='  w-full rounded-md border-4 border-Tertiary outline-quinary px-5 py-2' />
                            <p className=' px-5 text-red-500 text-left' >{passwordError}</p>

                            {
                                showPassword ?
                                <BsEyeFill onClick={handelShow} className=' text-secondary text-xl cursor-pointer absolute right-3 top-1/2 translate-y-[-50%] ' ></BsEyeFill>
                                :
                                <BsEyeSlashFill onClick={handelShow} className=' text-secondary text-xl cursor-pointer absolute right-3 top-1/2 translate-y-[-50%] ' ></BsEyeSlashFill>
                            }
                                
                            </div>

                            <div  className='mt-4 relative ' >
                            <input onChange={handelRePassword} value={rePassword} type={ showPassword? "text": "password"} placeholder='Re-password'   className='  w-full rounded-md border-4 border-Tertiary outline-quinary px-5 py-2'  />
                            <p className='  px-5 text-red-500 text-left' >{rePasswordError}</p>

                            {
                                showPassword ?
                                <BsEyeFill onClick={handelShow} className=' text-secondary text-xl cursor-pointer absolute right-3 top-1/2 translate-y-[-50%] ' ></BsEyeFill>
                                :
                                <BsEyeSlashFill onClick={handelShow} className=' text-secondary text-xl cursor-pointer absolute right-3 top-1/2 translate-y-[-50%] ' ></BsEyeSlashFill>
                            }
                            </div>

                            <div className='text-left mt-4'>

                                {
                                    loader?
                                    <div className='flex justify-center h-14'>
                                        <CirclesWithBar color="#ffff" barColor="blue"  height="60" width="60"   />
                                    </div>
                                    :
                                    <Buttons type="Submit" title='Submit' className=' bg-quaternary text-white font-bold  w-full rounded-md border-4 border-Tertiary outline-quinary px-5 py-2' />
                                    

                                }
 
                            </div>

                            <div className='lg:text-right mt-4 pb-5 px-5 lg:px-0  '>
                                <p className='text-white font-mono font-bold'>Already have an Account ? <Link to="/login"  className='text-quaternary font-mono font-bold' >please login</Link>  </p>
                            </div>
                            
                        </form>
                
            {/* registration form end  */}
    
</div>

</div>
   </div>
  )
}

export default Registration
