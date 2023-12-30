import React, { useEffect, useState } from 'react'
import { BiDotsVertical } from 'react-icons/bi'
import { useSelector } from 'react-redux';
import {getDatabase,onValue,push,ref, remove, set} from 'firebase/database'

const GroupChat = () => {
   
  const db = getDatabase();
  const data = useSelector((state)=>state.userLoginInfo.userInfo)
  const [groupList,setGroupList]= useState([]);

  const groupRef = ref(db,'group');

  useEffect(()=>{
    onValue(groupRef,(snapshot)=>{
      let list = [];
      snapshot.forEach((item)=>{
        list.push({...item.val(),key:item.key})
      });
      setGroupList(list)
    })
  },[])

  
  return (
   <div>


           <div className=' bg-chat p-2 rounded-t-xl  flex items-center justify-between w-full top-0 left-0 sticky'>
              <h2 className='font-mono font-bold  text-xl capitalize ' >Messanger Group</h2>
              <BiDotsVertical></BiDotsVertical>
            </div>



        {
               groupList.map((item,i)=>{
                return(
                  <div key={i} className='flex justify-between items-center p-2'> 
                          <div className='flex gap-x-4 items-center px-2 py-2'>
                              <div className='w-12 h-10 rounded-full bg-green-400' >
                                 
                                  <h1 className=' text-red-800 flex justify-center items-center font-bold text-2xl  '>{item.groupName[0]}</h1>
                              </div>
                              <div className='text-base font-mono font-bold  '>
                                <h2>{item.groupName}</h2>
                                <p className='text-blue-500' >{item.groupIntro}</p>
                              </div>
                            
                        </div>
                        <div className='flex gap-x-2' >
                            <button className='text-xs bg-green-700  text-white font-serif  py-1 px-2 rounded' type='submit' >Message</button>
                            
                      </div>
                  </div>
                )
              })

        }

   </div>
  )
}

export default GroupChat

