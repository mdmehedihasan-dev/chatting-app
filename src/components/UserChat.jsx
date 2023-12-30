import React, { useEffect, useState } from 'react'
import { getDatabase, onValue, push, ref, set } from "firebase/database";
import { useDispatch, useSelector } from 'react-redux';
import ProfilePhoto from './ProfilePhoto';
import { activeChat } from '../Slice/activeChatSlice';

const UserChat = () => {

   const db = getDatabase();
   const data = useSelector((state)=>state.userLoginInfo.userInfo)
   let [userList, setUserList] = useState([]);
   let [friendRequestList, setFriendRequestList] = useState([])
   let [friendList, setFriendList] = useState([]);
   let [searchUser, setSearchUser] = useState([])

   const dispatch = useDispatch()
   

   // get user list from database 
   useEffect(()=>{
         const userRef = ref(db,"users");
         onValue(userRef,(snapshot)=>{
            let list =[]
            snapshot.forEach((item)=>{
               // console.log(item)
               // list.push({
               //    ...item.val,id: item.key
               // })

               if(data.uid !==item.key){
                  list.push({...item.val(), id: item.key})
               }  
            })
            setUserList(list)
            // console.log(userList)
         })
   },[])
   // get user list from database 



   // friend list data from friend collection start 
   useEffect(()=>{
      const friendListRef = ref(db,'friend');
      onValue(friendListRef,(snapshot)=>{
        let list =[];
      snapshot.forEach((item)=>{
         list.push(item.val().receverId + item.val().senderId)
      });
      setFriendRequestList(list)  
      })
   },[])
   // friend list data from friend collection end 

   // search user start 
const handleSearch = (e)=>{
   // console.log(e.target.value)
   let arr=[]
   userList.filter((item)=>{
      if(item.username.toLowerCase().includes(e.target.value.toLowerCase())){
         arr.push(item)
      }
   })
   setSearchUser(arr)
   
}
// console.log(setSearchUser)
   



   // search user end 


   // active user start 

     const handelActiveUser =(item)=>{
      if(item.receverId == data.uid && item.receverId != data.uid){
         dispatch(activeChat({status:"single",id:item.senderId, name:item.senderName}))
         localStorage.setItem("activeUser",JSON.stringify({status:"single",id:item.senderId, name:item.senderName}))
      }
      else{
         dispatch(activeChat({status:"single",id:item.receverId,name:item.receverName}))
         localStorage.setItem("activeUser",JSON.stringify({status:"single",id:item.receverId,name:item.receverName}))
      }
     }

     // active user end 



  return (

      <div>
                  <input onChange={handleSearch} className='p-4 rounded-full w-full border-blue-300 mx-auto ' type="search" placeholder='Search Here' />
                  
             {/* User List top part start  */}
            <div className='  p-2 rounded-t-xl  flex items-center justify-between w-full top-0 left-0 sticky'>

                  {/* <input onChange={handleSearch} className='p-1 px-2 rounded-md w-full border-blue-300 mx-auto ' type="search" placeholder='Search Here' /> */}
               
            </div>
             {/* User List top part end */}


            {/* user part start */}
      
           {
            searchUser.length>0
            ?
            searchUser.map((item,i)=>{
               return(
               <div key={i}>
                  <div  className='flex justify-between items-center p-2'> 
                  <div className='flex gap-x-4 items-center px-2 py-2'>
                     <div>
                        <ProfilePhoto  imgId={item.id} />
                     </div>
                     <div className='text-lg font-mono font-bold'>
                     <h2> {item.username} </h2>
                     <h2> {item.email} </h2>
                     </div>
                     
                  </div>
         
                        <div>
                            <button className='text-xs bg-green-700 text-white   font-serif  py-1 px-2 rounded' type='submit' >Message</button>  
                        </div>
                  </div>
               </div>
               
               )
            })
            :
            userList.map((item,i)=>{
               return(
               <div onClick={()=>handelActiveUser(item)}  key={i}>
                  <div  className='flex justify-between items-center p-2'> 
                  <div className='flex gap-x-4 items-center px-2 py-2'>
                     <div>
                        <ProfilePhoto  imgId={item.id} />
                     </div>
                     <div className='text-lg font-mono font-bold '>
                     <h2> {item.username} </h2>
                     <h2> {item.email} </h2>
                     </div>
                     
                  </div>
         
                  <div>
                     <button className='text-xs bg-green-700  text-white font-serif  py-1 px-2 rounded' type='submit' >Message</button>
                  </div>
                  </div>
               </div>
               
               )
            })
           }   
      
            {/* user part end */}
      </div>
      
   
  )
}

export default UserChat

