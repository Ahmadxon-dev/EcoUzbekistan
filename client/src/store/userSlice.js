import { createSlice } from '@reduxjs/toolkit';

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