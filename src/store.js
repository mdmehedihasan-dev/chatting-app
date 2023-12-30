import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./Slice/userSlice";
import activeChatSlice from "./Slice/activeChatSlice";

export default configureStore({
    reducer:{
        userLoginInfo:userSlice,
        activeChatSlice:activeChatSlice
    },
})