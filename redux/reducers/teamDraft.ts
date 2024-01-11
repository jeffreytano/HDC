import {createSlice} from '@reduxjs/toolkit';
import {EMPTY_TEAM} from '../constants/dataConstant';

const teamDraftSlice = createSlice({
  name: 'teamDraft',
  initialState: {
    TeamMember: EMPTY_TEAM,
  },
  reducers: {
    Add: (state, action) => {
      const index: number = action.payload.index;
      state.TeamMember.team[index] = action.payload.teamMember;
    },
  },
});

export const {Add} = teamDraftSlice.actions;
export default teamDraftSlice.reducer;
