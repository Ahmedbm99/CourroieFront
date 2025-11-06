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
isLoading: false,
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
    },
        setLoadingType: (state, action) => {
      state.isLoading = action.payload;
    }
  }
});

export const { setTypes ,clearTypes,setLoadingType} = type.actions;
export default type.reducer;
