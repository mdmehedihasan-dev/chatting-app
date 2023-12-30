import React from 'react'
import NavBar from '../components/NavBar'
import FriendList from '../components/FriendList';
import MyGroup from '../components/MyGroup';
import GroupChat from '../components/GroupChat';
import Chatting from '../components/Chatting';
import UserList from '../components/UserList'
import UserChat from '../components/UserChat';
import FriendsChat from '../components/FriendsChat';

const Chat = () => {
  return (
    <div className='flex gap-x-10 h-[780px] p-2'>

        <div className='flex w-2/5'>
            <div className="bg-perfect h-full py-2 px-5 rounded-tr-2xl rounded-br-2xl  " >
                <NavBar/>
            </div>

            <div>
                  <div className=' py-2 px-2 border-2 shadow-xl rounded-xl ' >

                   

                      {/* friends list end  */}
                      <div className="w-full lg:w-500 h-full  rounded-xl shadow-2xl overflow-y-scroll no-scrollbar  ">
                  
                      <FriendsChat/>
                      </div>
                      {/* friends list end  */}

                  

                  </div>
            </div>
        </div>

       <div className='w-3/5 p-3'>
         <Chatting/>
       </div>
       
        

     
    </div>
  )
}

export default Chat
