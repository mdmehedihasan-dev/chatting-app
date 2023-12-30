import { configureStore, createSlice } from '@reduxjs/toolkit'

export const activeChatSlice = createSlice({
    name:"activeChat",
    initialState:{
        active:localStorage.getItem("activeFriend")?JSON.parse(localStorage.getItem("activeFriend")):nul
    },
    reducers:{
        activeChat:(state,action)=>{
            state.active=action.payload
        }
    }
    
})


export const {activeChat}= activeChatSlice.actions

export default activeChatSlice.reducer;

