import React, { useEffect } from 'react'
import { useState } from 'react'
import {getDownloadURL, getStorage, ref} from 'firebase/storage'
// import {getAuth, signOut, updateProfile} from 'firebase/auth';




const ProfilePhoto = ({imgId}) => {
    let [profilPhoto, setProfilePhoto]= useState("");
    const storage = getStorage();
    const photoRef = ref(storage,imgId);

    useEffect(()=>{
      getDownloadURL(photoRef)
      .then((url)=>{
        setProfilePhoto(url)
      })
      .catch((error)=>{
        console.log(error)
      })
    },[])

  return (
    <div>
      <img className='w-12 h-12 rounded-full' src={profilPhoto} alt="" />
    </div>
  )
}

export default ProfilePhoto
