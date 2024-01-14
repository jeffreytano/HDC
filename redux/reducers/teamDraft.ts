import {createSlice} from '@reduxjs/toolkit';
import {EMPTY_MEMBER_DATA, EMPTY_TEAM} from '../constants/dataConstant';
import {TeamMemberData} from '../dataType';

const teamDraftSlice = createSlice({
  name: 'teamDraft',
  initialState: {
    TeamMember: EMPTY_TEAM,
  },
  reducers: {
    Add: (state, action) => {
      const index: number = action.payload.index;
      if (state.TeamMember != EMPTY_TEAM) {
        // const copiedTeam = Object.entries(state.TeamMember).map(([key, value]) => ({ [key]: value }));
        // const dulplicants = Array.from(copiedTeam).findIndex((item:TeamMemberData)=> item.styleID === action.payload.Sid)
        let dulplicants = Array.from(state.TeamMember).findIndex(
          (item: TeamMemberData) =>
            item.styleID === action.payload.teamMember.styleID ||
            item.charID === action.payload.teamMember.charID,
        );
        console.log(
          'found',
          dulplicants,
          action.payload.teamMember.styleID,
          state.TeamMember[dulplicants],
        );
        state.TeamMember[dulplicants] = EMPTY_MEMBER_DATA;
      }
      state.TeamMember[index] = action.payload.teamMember;
    },
  },
});

export const {Add} = teamDraftSlice.actions;
export default teamDraftSlice.reducer;
