import React, { useEffect, useState } from 'react'
import Button from './btn/Button'
import { BiDotsVertical } from 'react-icons/bi'
import { useSelector } from 'react-redux'
import { getDatabase, onValue, push, ref, remove, set } from "firebase/database";
import ProfilePhoto from './ProfilePhoto';

const BlockUser = () => {
  const [blockList, setBlockList] = useState([])
  const db = getDatabase();
  const data = useSelector((state)=>state.userLoginInfo.userInfo);

  useEffect(()=>{
    const blockRef = ref(db,'block')
    onValue(blockRef,(snapshot)=>{
      let list =[]
      snapshot.forEach((item)=>{
        if(data.uid==item.val().blockById){
          list.push({
            id:item.key,
            block:item.val().block,
            blockId:item.val().blockId
          })
        }
        else{
          list.push({
            id:item.key,
            blockBy:item.val().blockBy,
            blockById:item.val().blockById
          })
        }
      })
      setBlockList(list)
    })
  },[])

  // handel unblock start 

  const handelUnBlock =(item)=>{
      set(push(ref(db,'friend')),{
        senderId:item.blockId,
        senderName:item.block,
        receverId:data.uid,
        receverName:data.displayName,
      }).then(()=>{
        remove(ref(db,'block/'+ item.id))
      })
  }

  // handel unblock end 
  return (
  
<div>

           <div className=' bg-chat p-2 rounded-t-xl  flex items-center justify-between w-full top-0 left-0 sticky'>
              <h2 className='font-mono font-bold text-xl capitalize ' >Block List</h2>
              <BiDotsVertical></BiDotsVertical>
            </div>

            {
              blockList.map((item,i)=>{
                return(
                  <div key={i} className='flex justify-between items-center p-2'> 
                    <div className='flex gap-x-4 items-center px-2 py-2'>
                      <div>
                        {
                          item.blockById?
                          <ProfilePhoto imgId={item.blockById} />
                          :
                          <ProfilePhoto imgId={item.blockId} />
                        }
                          {/* <img className='w-12 h-12 rounded-full' src="/public/profile3.jpg" alt="profile" /> */}
                      </div>
                      <div className='text-lg font-mono font-bold '>
                      <h2>{item.block? item.block : item.blockBy}</h2>
                        </div>
                  </div>
                  <div>

                    {
                      item.blockById?
                      <Button className="bg-red-500" label="Unavailable" />
                      :
                      <button onClick={()=>handelUnBlock(item)} className='text-xs bg-blue-300  text-black font-serif  py-1 px-2 rounded' type='submit' >UnBlock </button>
                    }
                      
                  </div>
                </div>
                )
              })
            }













</div>
  )
}

export default BlockUser
