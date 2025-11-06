import { createSlice } from '@reduxjs/toolkit';


const initialState = {
  list: [
    {
    id: null,
    famille_id: null,
    nomFrancais: null,
    nomAnglais:null,
    descriptionFrancais:null,
    descriptionAnglais:null,
    usageFrancais:null,
    usageAnglais:null,
    materiauxFrancais:null,
    materiauxAnglais:null
} ],

};

const type = createSlice({
  name: 'type',
  initialState,
  reducers: {
    setTypes: (state, action) => {
     state.list = action.payload;
       
    },
    clearTypes: (state) => {
      state.list = [];
    }
  }
});

export const { setTypes ,clearTypes} = type.actions;
export default type.reducer;
