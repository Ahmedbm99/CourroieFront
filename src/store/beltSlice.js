import { createSlice } from '@reduxjs/toolkit';


const initialState = {
  list: [
    {
    name: null,
    displayName:null  
} ],
  isLoading: false,
  error: null
};

const belt = createSlice({
  name: 'belt',
  initialState,
  reducers: {
    setBelt: (state, action) => {
     state.list = action.payload;
       
    },
    clearBelt: (state) => {
      state.list = [];
    }
  }
});

export const { setBelt ,clearBelt} = belt.actions;
export default belt.reducer;
