import React, { useEffect, useState } from 'react'
import Button from './btn/Button'
import { BiDotsVertical } from 'react-icons/bi'
import {getDatabase, onValue, push, ref, remove, set} from 'firebase/database'
import { useSelector } from 'react-redux'
import ProfilePhoto from './ProfilePhoto';

const FriendRequest = () => {


  const db = getDatabase();
  const data = useSelector((state)=>state.userLoginInfo.userInfo);
  // console.log(data)

  let [friensRequestList, setFriendRequestList]=useState([]);
  // console.log(setFriendRequestList)

  // friend request list start 
   useEffect(()=>{
       const friendRequestRef = ref (db,"friendRequest");

       
       onValue(friendRequestRef,(snapshot)=>{
        let list = []
        snapshot.forEach((item)=>{
          console.log(item.val())
          // list.push(item.val())
          if(item.val().receverId == data.uid)
          list.push({...item.val(), id: item.key})
        })
        setFriendRequestList(list)
       })
   },[])
   // friend request list end 

    // friend request accepct start 
    const handelFriendRequestAccpect = (item)=>{
      // console.log(item)
      set(push(ref(db,'friend')),{
        ...item
      }).then(()=>{
        remove(ref(db,'friendRequest/'+ item.id))
      });
    }
    // friend request accepct end 
     // friend request remove start 
     const handelFridenRequestDelete =(item)=>{
      remove(ref(db,'friendRequest/'+ item.id))
     }
      // friend request remove end 

  
   return (
   <div>

           <div className=' bg-chat p-2 rounded-t-xl  flex items-center justify-between w-full top-0 left-0 sticky'>
              <h2 className='font-mono font-bold  text-xl capitalize ' >Friend Request</h2>
              <BiDotsVertical></BiDotsVertical>
            </div>

     
        {
          friensRequestList.map((item)=>{
            return(
              
        <div key={item.id} className='flex justify-between items-center p-2'> 
        <div className='flex gap-x-4 items-center px-2 py-2'>
          <div>
            <ProfilePhoto imgId={item.senderId}  />
              {/* <img className='w-12 h-12 rounded-full' src="/public/profile3.jpg" alt="profile" /> */}
          </div>
          <div className='text-base font-mono font-bold   '>
          <h2>{item.senderName}</h2>
          <p>How's your day going?</p>
          </div>
      </div>
      <div className='lg:flex gap-x-4 text-center '>
          
          <button onClick={()=>handelFriendRequestAccpect(item)} className=" mt-2 md:mt-0 bg-quaternary  text-white font-serif text-sm py-1 px-2 rounded">Accept</button>
          <button onClick={()=>handelFridenRequestDelete((item))}    className=" mt-2 md:mt-0 bg-red-600  text-white font-serif text-sm py-1 px-2 rounded">Delete</button>
      </div>
     </div>
            )
          })
        }



   </div>
  )
}

export default FriendRequest
