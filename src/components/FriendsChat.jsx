import React, { useEffect, useState } from 'react'
import { BiDotsVertical } from 'react-icons/bi'
import { useDispatch, useSelector } from 'react-redux';
import { getDatabase, onValue, push, ref, remove, set } from "firebase/database";
import ProfilePhoto from './ProfilePhoto';
import { activeChat } from '../Slice/activeChatSlice';

const FriendsChat = () => {
   
   const db = getDatabase();
   const data = useSelector((state)=> state.userLoginInfo.userInfo)
   const [friendList, setFriendList] = useState([])
   const dispatch = useDispatch()

  //  console.log(friendList)




  // get FriendList from  friend collection start
  useEffect(()=>{
    const friendRef = ref(db,'friend');
    onValue(friendRef,(snapshot)=>{
      const list = []
      snapshot.forEach((item)=>{
        // list.push(item.val())
        if(data.uid== item.val().receverId || data.uid==item.val().senderId){
          list.push({...item.val(),key:item.key})
        }
      })
      setFriendList(list)
    })
  },[])
  // get FriendList from  friend collection end


  // handel Block start 
   const handelBlock =(item)=>{
     if(data.uid==item.senderId){
      set(push(ref(db,'block')),{
        block:item.receverName,
        blockId:item.receverId,
        blockBy:item.senderName,
        blockById:item.senderId
      }).then(()=>{
        remove(ref(db,"friend/"+item.key))
      })
     }
     else{
      set(push(ref(db,'block')),{
        block:item.senderName,
        blockId:item.senderId,
        blockBy:item.receverName,
        blockById:item.receverId
      }).then(()=>{
        remove(ref(db,'friend/'+item.key))
      })
     }
   }
  // handel Block end 

  // handle unFriend start
    const handleUnFriend =(item)=>{
      remove(ref(db,'friend/'+ item.key))
    } 
  // handle unFriend end


  
   // active Friend start 

   const handelActiveUser =(item)=>{
    console.log(item)
    if(item.receverId == data.uid){
       dispatch(activeChat({status:"single",id:item.senderId, name:item.senderName}))
       localStorage.setItem("activeFriend",JSON.stringify({status:"single",id:item.senderId, name:item.senderName}))
    }
    else{
       dispatch(activeChat({status:"single",id:item.receverId,name:item.receverName}))
       localStorage.setItem("activeFriend",JSON.stringify({status:"single",id:item.receverId,name:item.receverName}))
    }
   }

   // active Friend end 
  return (

    <div >

           <div className=' bg-chat p-2 rounded-t-xl  flex items-center justify-between w-full top-0 left-0 sticky'>
              <h2 className='font-mono font-bold  text-xl capitalize ' >Messanger</h2>
              <BiDotsVertical></BiDotsVertical>
            </div>


         <div>
          {
            friendList.map((item,i)=>{
              return(
                <div onClick={()=>handelActiveUser(item)} key={i}  className='flex justify-between items-center p-2'> 
                <div className='flex gap-x-4 items-center px-2 py-2'>
                    <div>

                      <ProfilePhoto imgId={data.uid== item.senderId ? item.receverId : item.senderId} ></ProfilePhoto>
                        {/* <img className='w-12 h-12 rounded-full' src="/public/profile3.jpg" alt="profile" /> */}
                    </div>
                    <div className='text-base font-mono font-bold   '>
                        {
                          data.uid == item.senderId ?
                          <h2>{item.receverName}</h2>
                          :
                          <h2>{item.senderName}</h2>
                        }
                    </div>
                </div>
                  <div className='lg:flex gap-x-2 text-center '>
                  <button  className='text-xs bg-green-600  mt-2 md:mt-0 text-white font-serif  py-1 px-2 rounded' type='submit' >Message </button>
                  </div>
          </div>
              )
            })
          }
         </div>
          



    </div>



   
  )
}

export default FriendsChat

