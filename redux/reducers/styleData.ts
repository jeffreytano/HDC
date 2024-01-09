import {createSlice} from '@reduxjs/toolkit';
import {EMPTY_TEAM} from '../constants/dataConstant';

const styleDataSlice = createSlice({
  name: 'teamDraft',
  initialState: {
    TeamMember: [],
  },
  reducers: {
    Add: (state, action) => {
      state = action.payload;
    },
  },
});

export const {Add} = styleDataSlice.actions;
export default styleDataSlice.reducer;
