import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';
import {BiDotsVertical} from 'react-icons/bi'
import GroupList from '../components/GroupList';
import UserList from '../components/UserList';
import FriendList from '../components/FriendList';
import FriendRequest from '../components/FriendRequest';
import MyGroup from '../components/MyGroup';
import BlockUser from '../components/BlockUser';

const Home = () => {

  let data = useSelector((state)=>state.userLoginInfo.userInfo);
  console.log(data)
  const navigate = useNavigate()

useEffect(()=>{
  if(!data){
    navigate("/login")
  }
})


  return (
    // main div start 
    <div className='flex items-center bg-chat ' >

      {/* navbar div start  */}
      <div>
      <NavBar/>
      </div>
      {/* navbar div end   */}



     {/* home page ui design start  */}
     
       <div >
            <div className=' py-2 px-2    flex gap-x-2 ' >

                {/* user list start  */}
            <div className="w-full lg:w-500 h-300  rounded-xl shadow-2xl overflow-y-scroll no-scrollbar  ">
              <UserList/>
            </div>
            {/* user list end  */}

              {/* friends list end  */}
              <div className="w-full lg:w-500 h-300  rounded-xl shadow-2xl overflow-y-scroll no-scrollbar  ">
            <FriendList/> 
            </div>
            {/* friends list end  */}

            {/* group list start  */}
            <div className="w-full lg:w-500 h-300  rounded-xl shadow-2xl overflow-y-scroll no-scrollbar  ">
                <GroupList/>
            </div>
            {/* group list end  */}

          

          

            </div>

            <div className=' py-2 px-2 flex gap-x-2  ' >


            {/* friendsRequest list start  */}
            <div className="w-full lg:w-500 h-300  rounded-xl shadow-2xl overflow-y-scroll no-scrollbar  ">
            <FriendRequest/>
            </div>
            {/* friendsRequest list end  */}

            {/* mygroup list start  */}
            <div className="w-full lg:w-500 h-300  rounded-xl shadow-2xl overflow-y-scroll no-scrollbar  ">
            <MyGroup/>
            </div>
            {/* mygroup list end  */}
            {/* blockuser list start  */}
            <div className="w-full lg:w-500 h-300  rounded-xl shadow-2xl overflow-y-scroll no-scrollbar  ">
            <BlockUser/>
            </div>
            {/* blockuser list end  */}





            </div>
       </div>

    
      {/* home page ui design end */}

       

      
    </div>

     // main div end
  )
}

export default Home
