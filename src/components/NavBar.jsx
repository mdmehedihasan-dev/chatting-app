import React, { useState ,createRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AiFillHome } from 'react-icons/ai';
import { AiFillMessage } from 'react-icons/ai';
import {PiChatCenteredDotsDuotone} from 'react-icons/pi'
import {IoMdNotificationsOutline} from 'react-icons/io'
import {BiSolidLogOut} from 'react-icons/bi'
import { BiSolidMessageRoundedMinus } from "react-icons/bi";
import { IoSettings } from "react-icons/io5";

import {getAuth, signOut, updateProfile} from 'firebase/auth';
import {getDownloadURL, getStorage, ref, uploadString} from 'firebase/storage'
import { useDispatch, useSelector } from 'react-redux';
import { userLoginInfo } from '../Slice/userSlice';
import {ImUpload} from 'react-icons/im'
import Button from './btn/Button'
import { Cropper } from 'react-cropper'
// import Cropper, { ReactCropperElement } from "react-cropper"; 
import "cropperjs/dist/cropper.css";
// import "./Demo.css"; 


const NavBar = () => {

    const auth = getAuth();
    const navigate =useNavigate();
    const dispatch = useDispatch();
    const storage = getStorage();

    // react cropper start 
    const [image, setImage] = useState();
    const [cropData, setCropData] = useState("#");
    const cropperRef = createRef(); 

    // react cropper end 

    const data = useSelector((state)=>state.userLoginInfo.userInfo)
    // console.log(data) 

    const [showModal, setShowModal]= useState(false)
    const closeModal = ()=>{
      setShowModal(false);
    }


    // Handel logOut start 

    const handleLogOut=()=>{
        signOut(auth)
        .then(()=>{
            navigate("/login")
            dispatch(userLoginInfo(null));
            localStorage.removeItem("user")
            
        })
        .catch((error)=>{

        })
    }

    // Handel logOut end 

  // PROFILE PHOTO CROPPER 
        
  const handelProfile = (e) => {
    e.preventDefault();
    let files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }
    // console.log(files)
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result );
      // console.log(reader.result)
    };
    
    reader.readAsDataURL(files[0]);
  };

  const getCropData = () => {
    if (typeof cropperRef.current?.cropper !== "undefined") {
      setCropData(cropperRef.current?.cropper.getCroppedCanvas().toDataURL());
      // console.log(cropData) 
      const storageRef = ref(storage, auth.currentUser.uid);
      const message4 = cropperRef.current?.cropper.getCroppedCanvas().toDataURL();
      uploadString(storageRef, message4, 'data_url').then((snapshot) => {
        // console.log('Uploaded a data_url string!'); 
        getDownloadURL(storageRef).then((downloadUrl)=>{
          console.log(downloadUrl)

          updateProfile(auth.currentUser, {
            photoURL:downloadUrl
          })

          dispatch(userLoginInfo({...data,photoURL:downloadUrl}))
          localStorage.setItem("user",JSON.stringify({...data,photoURL:downloadUrl}))
          setShowModal(false)
        })
      });

    }
  };
    // PROFILE PHOTO CROPPER 


  return (
   <div>
     <nav className='bg-perfect h-full py-2 px-5 rounded-tr-2xl rounded-br-2xl '>
       <div className=' mx-auto text-center lg:flex  items-center flex-col gap-y-20   '>

        
      
         {/* profile name & image  */}

           <div className='pt-10'>
            <div className='w-80 h-80 rounded-full mx-auto overflow-hidden bg-white relative group'>
              <img className='w-80 h-80 rounded-full mx-auto overflow-hidden bg-white absolute ' src={data.photoURL} alt="Profile Img" />
            {/* <h2 className=' group-hover:hidden absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] text-3xl text-white font-bold '> {data?.displayName[0]} </h2> */}
             
            <div className=' group-hover:bg-black opacity-50  absolute w-full h-full cursor-pointer ' >
                  <ImUpload onClick={()=>setShowModal(true)} className=' hidden group-hover:block absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] text-3xl text-white font-bold ' />
            </div>
             
             </div>

             
            
             
            <h1 className='text-2xl font-mono text-white font-bold ' > {data?.displayName}</h1>
           </div>

           {/* profile name & image  */}
       

         <div className='flex flex-col gap-y-5  ' >
            <Link  to="/home" > 
            <AiFillHome className='text-5xl text-white  hover:text-perfect hover:bg-white rounded-lg duration-300' ></AiFillHome>
            </Link>

            <Link  to="/chat" > 
            {/* <PiChatCenteredDotsDuotone  className='text-5xl text-white  hover:text-blue-300 hover:bg-white rounded-lg duration-300' ></PiChatCenteredDotsDuotone>  */}
            <BiSolidMessageRoundedMinus className='text-5xl text-white  hover:text-perfect hover:bg-white rounded-lg duration-300' />
            </Link>


            <Link  to="/forgetpassword" > 
            <IoSettings className='text-5xl text-white  hover:text-perfect hover:bg-white rounded-lg duration-300' />
            </Link>





            <div className='cursor-pointer pb-5'>
            <BiSolidLogOut onClick={handleLogOut}  className=' mt-40 text-5xl text-white  hover:text-perfect hover:bg-white rounded-lg duration-300'  ></BiSolidLogOut>
            </div>


        </div>

       </div>



    </nav>
      {/* modal start here  */}
  {
      showModal &&
      <div className='max-w-600 absolute top-0 left-10 lg:p-20 p-10 z-50 bg-white bg-opacity-90 mx-auto  rounded-xl '>

      <h2 className='text-2xl font-mono text-quaternary font-bold mb-5 '>Upload Your Photo</h2>

      {/* img-preview   */}
      <div className='w-28 h-28 rounded-full mx-auto overflow-hidden bg-black ' >
       <div className="img-preview w-full h-full"/>
       </div>
       {/* img-preview */}


      <input onChange={handelProfile} type="file" />



       {/* image croppet  */}

     {
      image && (  
      <Cropper
      ref={cropperRef}
      style={{ height: 400, width: "100%" }}
      zoomTo={0.5}
      initialAspectRatio={1}
      preview=".img-preview"
      src={image}
      viewMode={1}
      minCropBoxHeight={10}
      minCropBoxWidth={10}
      background={false}
      responsive={true}
      autoCropArea={1}
      checkOrientation={false} // https://github.com/fengyuanchen/cropperjs/issues/671
      guides={true}
    />)
     }
        {/* image cropper  */}






      <div className='flex gap-x-10 mt-5'>
        
        <button onClick={getCropData}  className=' bg-blue-600 text-white font-serif text-sm py-1 px-2 rounded'  >Upload</button>
        <button onClick={closeModal}  className='bg-red-600 text-white font-serif text-sm py-1 px-2 rounded'  >Cancle</button>
      </div>
    </div>
    }
 {/* modal end end here   */}
   </div>
    
  )
}

export default NavBar
