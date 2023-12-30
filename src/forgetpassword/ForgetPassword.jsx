import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Buttons from '../components/Buttons'
import { getAuth, sendPasswordResetEmail } from 'firebase/auth'
import { ToastContainer, toast } from 'react-toastify'
import Button from '../components/btn/Button'


const ForgetPassword = () => {

    const auth = getAuth();

    const [email, setEmail] = useState("");
    const[errorEmail,setEmailError]=useState("")

    const handleEmail = (e)=>{
        setEmail(e.target.value);
        setEmailError("")
    }

    const handleSubmit = (e)=>{
        e.preventDefault();
        if(!email){
            setEmailError("Email is required")
        }
        else{
            sendPasswordResetEmail(auth,email)
            .then(()=>{
                setEmailError("check your email ")
                toast.success("Email Send")
            })
            .catch((error) => {
               if(error.message === "Firebase: Error (auth/invalid-email)."){
                setEmailError("User not found")
                toast.error("user not found")
               }
            })
        }
    }
    


  return (
    <div className='h-screen bg-Tertiary'>
         <ToastContainer position="top-center" />

        <div className='bg-white text-center lg:flex justify-between items-center px-10 py-5'>
            <h1 className='text-5xl font-mono font-bold text-blue-600' >Metu</h1>
            <h4 className='lg:text-2xl font-mono font-bold' >To  create your account  <Link to="/" >click here!</Link>  </h4>
        </div>

        <form onSubmit={handleSubmit}   className='max-w-500 drop-shadow-2xl bg-white mx-auto mt-40 py-5 px-5 pb-5 rounded-lg '>
            <h4 className='text-3xl font-mono font-bold' >Find Your Account</h4>
            <hr className='w-full' />

            <p className='text-xl font-mono font-bold py-5'   >	Please enter your email address </p>
            <input   className='w-full py-2 px-5 outline-secondary border-Tertiary border-2' onChange={handleEmail} type="email" value={email} placeholder='enter your email here' />
            <p className='text-red-500' >{errorEmail}</p>

          <div className='py-5 flex justify-between'>
            <Buttons className='bg-Tertiary py-3 px-10 rounded-md text-white font-bold'  title="Send"  />
            
            <Link to="/login"  className='bg-Tertiary py-3 px-10 rounded-md text-white font-bold' > Log in </Link>
          </div>

        </form>

       
      
    </div>
  )
}

export default ForgetPassword
