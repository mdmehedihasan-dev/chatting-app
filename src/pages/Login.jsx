import React, { useState } from 'react'
import Lottie from "lottie-react";
import login from "../lottie/animationlogin.json"
import Buttons from '../components/Buttons';
import { BsEyeFill,BsEyeSlashFill } from 'react-icons/bs';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CirclesWithBar } from 'react-loader-spinner'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { userLoginInfo } from '../Slice/userSlice';



const Login = () => {

    // redux dispatch start
    const dispatch = useDispatch(); 
    // redux dispatch end




    const navigate= useNavigate("")

    const auth = getAuth();
    
    const [email, setEmail]= useState("")
    const [password, setPassword]= useState("")

    // loader start
    const [loader,setLoader]=useState(false)
    // loder end 


    // showpassword
     
    const [showPassword ,  setShowPassword] = useState(false)
    // showpassword


    
    const [emailError, setEmailError] = useState("")
    const [passwordError,setPasswordError] =useState("")
   


    const handelShow =()=>{
        setShowPassword(!showPassword)
    }

    
  

    const handelEmail = (e)=>{
        setEmail(e.target.value)
        setEmailError("")
    }

    const handelPassword = (e)=>{
        setPassword(e.target.value)
        setPasswordError("")
    }

 

    const handelSubmit =(e)=>{
        e.preventDefault()

      
        if(!email){
            setEmailError("Email is required")
        }
        else if(!password){
            setPasswordError("Password is required")
        }

        else{
            setLoader(true)
            signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                toast.success("Metu Login Successfully")
                console.log(user)
                dispatch(userLoginInfo(user))
                localStorage.setItem("user",JSON.stringify(user))
                setTimeout(() => {
                    navigate("/chat")
                    
                }, 1000);
                setLoader(false)

                
              })
              .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode)
                console.log(errorMessage)
                if(errorCode==="auth/invalid-login-credentials"){
                    
                    toast.error("email & password not matched")
                    setLoader(false)
                }
               
              });
            

        }
     
         // firebase Login start 

      

        // firebase Login end 



    }


  return (
    
   <div className='bg-purple-400 '>
        <ToastContainer position="top-center" />
        <div className='container mx-auto py-[105px] lg:py-0 '>

                <h1 className=' px-2  pt-6  text-4xl text-center text-quaternary font-bold font-mono md:flex justify-center items-center '>Welcome to <span className='text-white md:text-6xl animate-bounce' >MeTu</span> Chat Room</h1>

                
                    <div className=" text-center lg:flex gap-x-20  items-center">
                        { /* Login form start  */}
                
                

                        <form onSubmit={handelSubmit} className='lg:w-1/2 lg:shadow-2xl  shadow-quinary px-2 py-14 lg:p-20 rounded-lg' >
                        <h2 className=' text-2xl md:text-4xl text-center text-quaternary font-semibold font-sans mb-10 '>Please Login</h2>
                           
                            <div  className='mt-5 l' >
                            <input onChange={handelEmail} value={email} type="email" placeholder='Enter Email'   className='  w-full rounded-md border-4 border-Tertiary outline-quinary px-5 py-2' />
                            <p className=' px-5 text-red-500 text-left' >{emailError}</p>
                            </div>
                            <div  className='mt-5 relative ' >
                            <input onChange={handelPassword} value={password} type= {showPassword ? "text": "password"}  placeholder='Enter password'   className='  w-full rounded-md border-4 border-Tertiary outline-quinary px-5 py-2' />
                            <p className=' px-5 text-red-500 text-left' >{passwordError}</p>

                            {
                                showPassword ?
                                <BsEyeFill onClick={handelShow} className=' text-secondary text-xl cursor-pointer absolute right-3 top-1/2 translate-y-[-50%] ' ></BsEyeFill>
                                :
                                <BsEyeSlashFill onClick={handelShow} className=' text-secondary text-xl cursor-pointer absolute right-3 top-1/2 translate-y-[-50%] ' ></BsEyeSlashFill>
                            }
                                
                            </div>

                           

                            <div className='text-left mt-5'>

                                {
                                    loader?
                                    <div className='flex justify-center h-14'>
                                        <CirclesWithBar color="#ffff" barColor="blue"  height="60" width="60"   />
                                    </div>
                                    :
                                    <Buttons type="Submit" title='Login' className='bg-logbg text-white font-bold  w-full rounded-md border-4 border-primary outline-secondary px-5 py-2' />
                                   

                                }
                            </div>

                            <div className='xl:flex justify-between mt-5'>
                            
                            <div className='   '>
                                <p className='text-red font-mono font-bold'> <Link to="/forgetpassword" > Fergot password ?  </Link>  </p>
                            </div>
                            <div className='   '>
                                <p className='text-white font-mono font-bold'> Create a Metu account <Link to="/"  className='text-quaternary font-mono font-bold' >Click here!</Link>  </p>
                            </div>
                            </div>
                            
                        </form>
                            
                        {/* Login form end  */}

                        {/* animation start here */}
                        <div className='lg:w-1/2 hidden lg:block '>
                        <Lottie animationData={login}  />
                        </div>
                        {/* animation end here */}
    
                 </div>

        </div>
   </div>
  )
}

export default Login
