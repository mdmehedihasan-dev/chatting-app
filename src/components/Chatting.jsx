import React, { useEffect, useState } from 'react'
import ModalImage from "react-modal-image";
import { FaRegFaceGrin } from "react-icons/fa6";
import { BsSend } from "react-icons/bs";
import { IoImagesOutline } from "react-icons/io5";
import { useSelector } from 'react-redux';
import { getDatabase, onValue, push, ref, set } from "firebase/database";






const imgUrl = "https://scontent.fjsr11-1.fna.fbcdn.net/v/t39.30808-6/277166295_1162738494488554_3485270382653399653_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeGFIOza3hgzo66JgdDDoXfFFI8YfVkHwD8Ujxh9WQfAP7NqyXu4UThbv13Z1BfgdkRSH8LRDDLraGovrFwUK2Gh&_nc_ohc=LfH6Ea2HohwAX_nghWD&_nc_ht=scontent.fjsr11-1.fna&oh=00_AfC_p0dhKmp4PcqUi2eJWaSpjGjIbiQe45ibwGrDFK883A&oe=655B164F"

const Chatting = () => {

  
  const db = getDatabase();
  const activeChatSlice = useSelector((state)=>state.activeChatSlice)
  const data = useSelector((state)=>state.userLoginInfo.userInfo)
  const [message,setMessage]= useState ();
  const [messageList, setMessageList] = useState([])

  // console.log(messageList)

  const handelMessageSend =()=>{
     if(activeChatSlice.active.status=="single"){
      set(push(ref(db,"singleMessage")),{
        whoSendId:data.uid,
        whoSendName:data.displayName,
        whoReceiveId:activeChatSlice.active.id,
        whoReceiveName:activeChatSlice.active.name,
        msg:message,
        date:`${new Date().getFullYear()}-${new Date().getMonth()}-${new Date().getDate()},${new Date().getHours()%12||12}:${new Date().getMinutes()} ${new Date().getHours()>=12? 'PM':'AM'}`,

      }).then(()=>{
        console.log("Done Sms")
      }).catch((error)=>{
        console.log("what's up")
      })
     }
  }

  useEffect(()=>{
    onValue(ref(db,"singleMessage"),(snapshot)=>{
      let arr = []
      snapshot.forEach((item)=>{
        // console.log(item.val())
        if(item.val().whoSendId == data.uid && item.val().whoReceiveId==activeChatSlice.active.id ||
        item.val().whoReceiveId == data.uid && item.val().whoSendId==activeChatSlice.active.id) {
       arr.push(item.val())
     }
      })
      setMessageList(arr)
    })
  },[activeChatSlice.active.id])
  


  return (
    <div className="w-full h-full  rounded-xl  shadow-2xl overflow-y-scroll no-scrollbar " >
       
       {/*======================= massanger id start  =============================*/}
       <div className='sticky z-10 top-0 left-0 flex gap-5 items-center border-b border-perfect py-2 px-5 bg-white' >
           <div className='w-80 h-80 rounded-full bg-perfect overflow-hidden' >
            <img src="/public/profile3.jpg" alt="" />
           </div>
           <div className=' text-lg font-mono font-bold capitalize '>
            <h1> {activeChatSlice.active?.name} </h1>
            <p className='text-perfect'>active</p>
           </div>
       </div>
        {/*======================= massanger id end ============================= */}
        {
          activeChatSlice.active.status=="single"?
            (
             messageList.map((item,i)=>{
                  return(
                    item.whoSendId == data.uid?
                    <div key={i} className='text-right px-3  '>
                    <div className='inline-block px-2 py-1 border-2 rounded-xl bg-purple-500  '>
                        <p className='text-left font-mono text-lg text-white '>{item.msg}</p>
         
                    </div>
                    <p className='text-gray-500'>{item.date}</p>
                     </div>
                     :
                     <div key={i} className='text-left px-3 mt-5'>
                     <div className='inline-block px-2 py-1  border-2 rounded-xl bg-chat'>
                         <p className='text-left font-mono text-lg text-gray-800'>{item.msg}</p>
                     </div>
                     <p className='text-gray-500'>{item.date}</p>
                   </div>
                  )
             }) 
            )
          :
          <h1>group</h1>
        }
         



       
                {/*======================= write massange start  =============================*/}
                <div className=' absolute  bottom-0 right-5 w-[945px] border-t p-5 bg-chat' >
                <div className='flex items-center justify-between'>
                <div className='w-4/5 flex items-center gap-x-2'>
                <div className='w-4/5'>
                      <input onChange={(e)=>setMessage(e.target.value) } className='w-full rounded-xl p-3' type="text" />
                </div>
                <div className='w-1/5 flex gap-x-2 text-perfect text-3xl'>
                      <button>   < FaRegFaceGrin />  </button>
                      <label className='cursor-pointer'>
                         <IoImagesOutline/> 
                         <input type="file" className='hidden' /> 
                      </label>   
                </div>
           </div>
           <div className='w-1/5 text-right '>
                      <button onClick={handelMessageSend} className='bg-perfect py-2 px-3 rounded-xl text-white font-mono font-bold text-lg'>  <BsSend /> </button>
           </div>
           </div>
                </div>
                {/*======================= write massange end ============================= */}








       


    </div>
  )
}

export default Chatting
