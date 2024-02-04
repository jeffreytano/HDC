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
            item.Sid === action.payload.teamMember.Sid ||
            item.Cid === action.payload.teamMember.Cid,
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
    Remove: (state, action) => {
      const index = action.payload.index;
      state.TeamMember[index] = EMPTY_MEMBER_DATA;
    },
    Level: (state, action) => {
      const {index, level} = action.payload;
      const targetMember = state.TeamMember[index];
      if (level <= targetMember.levelGap) {
        targetMember.level = level;
      } else {
        targetMember.level = targetMember.levelGap;
      }
    },
    LimitBreak: (state, action) => {
      const {index, limitBreak} = action.payload;
      const targetMember = state.TeamMember[index];
      targetMember.totsu = limitBreak;
      switch (targetMember.rarity) {
        case 'Free':
          targetMember.levelGap = 130 + 5 * limitBreak;
        case 'SS':
          targetMember.levelGap = 130 + 10 * limitBreak;
        case 'S':
          targetMember.levelGap = 110 + 2 * limitBreak;
        case 'A':
          targetMember.levelGap = 100 + limitBreak;
      }
    },
    Tensei: (state, action) => {
      const {index, tensei} = action.payload;
      const targetMember = state.TeamMember[index];
      if (tensei <= 20) {
        targetMember.tensei = tensei;
      } else {
        targetMember.tensei = 20;
      }
    },
  },
});

export const {Add, Remove, Level, LimitBreak, Tensei} = teamDraftSlice.actions;
export default teamDraftSlice.reducer;
