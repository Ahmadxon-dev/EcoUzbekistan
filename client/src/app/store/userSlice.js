import { createSlice } from '@reduxjs/toolkit';
// typeof window !== 'undefined' ?  JSON.parse(localStorage.getItem("inspector")) || [] :
//role:// user inspector admin
const userSlice = createSlice({
    name: 'user',
    initialState: {
        userData: [],
    },
    reducers: {
        setArray: (state, action) => {
            state.userData = action.payload;
        },
        clear: (state)=>{
            state.userData=[];
        },
    },
});

export const { setArray, clear } = userSlice.actions;
export default userSlice.reducer;