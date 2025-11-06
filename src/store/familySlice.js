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
    },
    setLoadingFamily: (state, action) => {
      state.isLoading = action.payload;
    }
  }
});

export const { setFamily ,clearFamily,setLoadingFamily} = family.actions;
export default family.reducer;
