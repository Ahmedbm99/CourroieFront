import { createSlice } from '@reduxjs/toolkit';


const initialState = {
  list: [
    {
    id: null,
    nomFrancais: null,
    nomAnglais:null,
    descriptionFrancais:null,
    descriptionAnglais:null
} ],
  isLoading: false,
  error: null
};

const family = createSlice({
  name: 'family',
  initialState,
  reducers: {
    setFamily: (state, action) => {
     state.list = action.payload;
       
    },
    clearFamily: (state) => {
      state.list = [];
    }
  }
});

export const { setFamily ,clearFamily} = family.actions;
export default family.reducer;
