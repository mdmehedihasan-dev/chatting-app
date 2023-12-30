import React, { useEffect, useState } from 'react'
import Button from './btn/Button'
import { BiDotsVertical } from 'react-icons/bi'
import { ToastContainer, toast } from 'react-toastify'
import { getDatabase, onValue, push, ref, set } from "firebase/database";
import { useSelector } from 'react-redux';

const GroupList = () => {

  const db = getDatabase();
  const data = useSelector((state)=>state.userLoginInfo.userInfo);

  const [show,setShow]=useState(false)
  console.log(show)

  // get input value start 
  const [groupName, setGroupName] = useState();
  const [groupIntro, setGroupIntro] = useState();
  const [groupNameError, setGroupNameError] = useState();
  const [groupIntroError, setGroupIntroError] = useState();
  const [groupList, setGroupList]=useState([]);
  // console.log(groupList)

  const handleGroupName = (e)=>{
    setGroupName(e.target.value)
    setGroupNameError("")
  }

  const handleGroupIntro = (e)=>{
    setGroupIntro(e.target.value)
    setGroupIntroError("")
  }

    // get input value end 

    // create group start 
    const handleCreateGroup= (e)=>{
      
      if(groupName ==""){
         setGroupNameError("Give a Group Name")
      }else if(groupIntro ==""){
        setGroupIntroError("Write Group Intro")
      }
      else{

        set(push(ref(db,'group')),{
          groupName:groupName,
          groupIntro:groupIntro,
          adminName:data.displayName,
          adminId:data.uid
        }).then(()=>{
          toast.success("The Group is ready")
          setShow(false)
          setGroupName("")
          setGroupIntro("")

        })




      }
    }
     // create group end 

    //  get group list start 

    
    useEffect(()=>{
      const groupRef = ref(db,'group');
      onValue(groupRef,(snapshot)=>{
        let list=[];
        snapshot.forEach((item)=>{
          if(data.uid !=item.val().adminId){
            list.push({...item.val(),key:item.key});
          }
        });
        setGroupList(list)
      });
    },[])

    //  get group list end



    // handle group join request start
      const handleGroupJoin =(item)=>{
        console.log("click",item)
      set(push(ref(db,"groupRequest")),{
        // groupId:item.id,
        groupName:item.groupName,                                
        adminId:item.adminId,
        adminName:item.adminName,
        groupIntro:item.groupIntro,
        userId:data.uid,
        userName:data.displayName
        }).then(()=>{
          toast.success("Group Request send")
        })
      } 
    // handle group join request end

  return (
  <div>

<ToastContainer position="top-center" />
            <div className='  bg-chat p-2 rounded-t-xl  flex items-center justify-between w-full top-0 left-0 sticky'>
              <h2 className='font-mono font-bold  text-2xl capitalize ' >Groups</h2>
              
              <button onClick={()=>setShow(!show)} className='text-xl bg-white  text-green-700 font-bold  py-1 px-2 rounded' type='submit' > {show?'-':'+'} </button>
            </div>



            {
              show?
              <div className='bg-gray-700 p-2 rounded-lg' >
              <input onChange={handleGroupName} value={groupName} type="text" placeholder='Group Name' className='w-full p-2 outline-none rounded-lg mb-3' />
              <p className='text-red-500'>{groupNameError}</p>
              <input onChange={handleGroupIntro} value={groupIntro} type="text" placeholder='Group Intro ' className='w-full p-2 outline-none rounded-lg ' />
              <p className='text-red-500'>{groupIntroError}</p>
              <button onClick={handleCreateGroup} className='text-lg mt-2 bg-blue-800  text-white font-serif w-full  py-1 px-2 rounded' type='submit' > create </button>
            </div>
            :
            <div>
            {
             groupList.map((item,i)=>{
               return(
                 <div key={i} className='flex justify-between items-center p-2'> 
                   <div className='flex gap-x-4 items-center px-2 py-2'>
                               <div className='w-12 h-10 rounded-full bg-blue-500'>
                                   <h1 className=' flex justify-center items-center font-bold text-2xl  '>{item.groupName[0]}</h1>
                               </div>
                               <div className='text-base font-mono font-bold'>
                               <h2>{item.groupName}</h2>
                               <p>{item.groupIntro}</p>
                               </div>
                   </div>
               <div>
                   
               <button onClick={()=>handleGroupJoin(item)}  className='text-xs bg-quaternary text-white font-serif  py-1 px-2 rounded' type='submit' >Join</button>
               </div>
           </div>
               )
             })
           }
           </div>
            }


          

  </div>
    
  )
}

export default GroupList
