import { createSlice } from '@reduxjs/toolkit';
// typeof window !== 'undefined' ?  JSON.parse(localStorage.getItem("inspector")) || [] :
const userSlice = createSlice({
    name: 'user',
    initialState: {
        userData:  [],
    },
    reducers: {
        // increment: (state) => {
        //     state.value += 1;
        // },
        // decrement: (state) => {
        //     state.value -= 1;
        // },
        // incrementByAmount: (state, action) => {
        //     state.value += action.payload;
        // },
        setArray: (state, action) => {
            state.userData = action.payload;

        },
        addItemToArray: (state, action) => {
            state.data.push(action.payload);
        },
        clear: (state)=>{
            state.userData=[]
        }
    },
});

export const { setArray, addItemToArray, clear } = userSlice.actions;
export default userSlice.reducer;