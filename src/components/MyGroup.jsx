import React, { useEffect, useState } from 'react'
import { BiDotsVertical } from 'react-icons/bi'
import { useSelector } from 'react-redux';
import {getDatabase,onValue,push,ref, remove, set} from 'firebase/database'
import ProfilePhoto from './ProfilePhoto';

const MyGroup = () => {
   
  const db = getDatabase();
  const data = useSelector((state)=>state.userLoginInfo.userInfo)
  const [groupList,setGroupList]= useState([]);
  const [showRequest, setShowReuest] = useState(false)
  const [groupJoinRequest,setGroupJoinRequest] = useState([])

  const groupRef = ref(db,'group');

  useEffect(()=>{
    onValue(groupRef,(snapshot)=>{
      let list = [];
      snapshot.forEach((item)=>{
        if(data.uid==item.val().adminId){
          list.push({...item.val(),key:item.key})
        }
      });
      setGroupList(list)
    })
  },[])

  // delete group start 
    const handleGroupDelete = (item) =>{
      console.log(item)
      remove(ref(db,'group/'+ item.key))
    }
  // delete group end

  // handlerequest start 
   const handleRequest =(item)=>{
    setShowReuest(!false);

    const groupRequestRef = ref(db,"groupRequest");
    onValue(groupRequestRef,(snapshot)=>{
      let list =[]
       snapshot.forEach((item)=>{
        if(data.uid==item.val().adminId && item.val().groupId==groupJoinRequest.key){
          list.push({...item.val(),key:item.key})
        }
       })
       setGroupJoinRequest(list)
    })
    console.log(groupJoinRequest)
   }
  // handlerequest end 

  // request accept start 
   const handleRequestAccept = (item)=>{
    set(push(ref(db,"groupmembers")),{
      // groupId:item.groupId,
      groupName:item.groupName,
      adminId:item.adminId,
      userId:item.userId,
      userName:item.userName
    })
    .then(()=>{
      remove(ref(db,"groupRequest/"+item.key))
    })
   }
  // request accept end 

  // request reject start 
  const handleReject = (item)=>{
    remove(ref(db,"groupRequest/"+item.key))
  }
   // request reject end 
  
  return (
   <div>


           <div className=' bg-chat p-2 rounded-t-xl  flex items-center justify-between w-full top-0 left-0 sticky'>
              <h2 className='font-mono font-bold  text-xl capitalize ' >My Gropus</h2>
              <BiDotsVertical></BiDotsVertical>
            </div>



        {
              groupList.length ==0?
            
              <div className='bg-white'><img className='mx-auto w-fit' src="/public/CREATE.png" alt="" /></div>
              :
              showRequest?
              <div className='relative  rounded-lg p-10'>
                <button onClick={()=>setShowReuest(false)} className='text-xl bg-red-400 absolute right-1 top-1 w-auto text-green-700 font-bold px-2' type='submit' > - </button>
           
                {
                  groupJoinRequest.map((item,i)=>{
                     return(
                      <div key={i} className='flex justify-between bg-blue-300 mb-1 rounded-lg items-center p-2'> 
                      <div className='flex gap-x-4 items-center px-2 py-2'>
                          <div className='w-12 h-10 rounded-full ' >
                              {/* <img className='w-12 h-12 rounded-full' src="/public/profile3.jpg" alt="profile" /> */}
                              <ProfilePhoto imgId={item.userId} ></ProfilePhoto>
                          </div>
                          <div className=' font-mono font-bold   '>
                            <h2 className='text-black' >{item.userName}</h2>
                            
                          </div>
                        
                    </div>
                    <div className='flex gap-x-2' >
                        <button onClick={()=>handleRequestAccept(item)}  className='text-xs bg-green-700  text-white font-serif  py-1 px-2 rounded' type='submit' >Accept</button>
                        <button onClick={()=>handleReject(item)}  className='text-xs bg-red-600  text-white font-serif  py-1 px-2 rounded' type='submit' >Delete</button>
                  </div>
              </div>
                     )
                  })

                }



              </div>
              :
                groupList.map((item,i)=>{
                  return(
                    <div key={i} className='flex justify-between items-center p-2'> 
                            <div className='flex gap-x-4 items-center px-2 py-2'>
                                <div className='w-12 h-10 rounded-full bg-green-400' >
                                    {/* <img className='w-12 h-12 rounded-full' src="/public/profile3.jpg" alt="profile" /> */}
                                    <h1 className=' text-red-800 flex justify-center items-center font-bold text-2xl  '>{item.groupName[0]}</h1>
                                </div>
                                <div className='text-base font-mono font-bold  '>
                                  <h2>{item.groupName}</h2>
                                  <p className='text-blue-500' >{item.groupIntro}</p>
                                </div>
                              
                          </div>
                          <div className='flex gap-x-2' >
                              <button onClick={()=>handleRequest(item)} className='text-xs bg-green-700  text-white font-serif  py-1 px-2 rounded' type='submit' >Request</button>
                              <button onClick={()=>handleGroupDelete(item)} className='text-xs bg-red-600  text-white font-serif  py-1 px-2 rounded' type='submit' >Delete</button>
                        </div>
                    </div>
                  )
                })

        }









   </div>
  )
}

export default MyGroup
