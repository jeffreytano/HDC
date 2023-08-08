import {createSlice} from "@reduxjs/toolkit"
import { MemberData,EMPTY_MEMBER_DATA,NEW_MEMBER_DATA,DUMMY_MEMBER_DATA } from "./DataType";

export const teamBuildSlice = createSlice({
    name: "teamBuild",
    initialState:{
        team: [DUMMY_MEMBER_DATA,EMPTY_MEMBER_DATA,EMPTY_MEMBER_DATA,EMPTY_MEMBER_DATA,EMPTY_MEMBER_DATA,EMPTY_MEMBER_DATA],
        showDetail: [false,false,false,false,false,false]
    },
    reducers:{
        changeMember: (state, action) => {
            // let newMember = NEW_MEMBER_DATA;
            const pos = action.payload.pos
            state.team[pos].level = 1;
            state.team[pos].totsu = 0;
            state.team[pos].tensei = 0;
            state.team[pos].charName = action.payload.charName;
            state.team[pos].styleID = action.payload.styleID;
            state.team[pos].styleName = action.payload.styleName
            state.team[pos].image = action.payload.image;
            state.team[pos].rarity = action.payload.rare;
            switch (action.payload.rare){
                case "A":
                    state.team[pos].levelGap = 90;
                    break;
                case "S":
                    state.team[pos].levelGap = 100;
                    break;
                case "SS":
                    state.team[pos].levelGap = 110;
                    break;
                case "Free":
                    state.team[pos].levelGap = 110;
                    break;
                default: state.team[pos].levelGap = 90;
            }
            // state.team[action.payload.pos] = newMember;
        },
        removeMember: (state, action) => {
            state.team[action.payload.pos] = EMPTY_MEMBER_DATA;
        },
        setLevel: (state, action) => {
            const levelGap = state.team[action.payload.pos].level;
            if (levelGap && action.payload.level > levelGap)
                state.team[action.payload.pos].level = action.payload.level
            else state.team[action.payload.pos].level = levelGap;
        },
        setLimitBreak: (state,action) =>{
            const limitBreak = action.payload.LimitBreak;
            const rarity = state.team[action.payload.pos].rarity;
            let maxLB;
            if (rarity)
            {
                switch (rarity){
                    case "A":
                        maxLB = 20;
                    case "S":
                        maxLB = 10;
                    case "SS":
                        maxLB = 4;
                    case "Free":
                        maxLB = 4;
                    default: null;
                }
                if (maxLB && limitBreak <= maxLB){
                    state.team[action.payload.pos].totsu = limitBreak;
                    switch (rarity){
                        case "A":
                            state.team[action.payload.pos].levelGap = 90 + limitBreak;
                        case "S":
                            state.team[action.payload.pos].levelGap = 100 + limitBreak * 2;
                        case "SS":
                            state.team[action.payload.pos].levelGap = 110 + limitBreak * 10;
                        case "Free":
                            state.team[action.payload.pos].levelGap = 110 + limitBreak * 5;
                        default :null;
                    }
                }
            }
        },
        setTensei: (state,action) =>{
            state.team[action.payload.pos].tensei = action.payload.tensei;
        },
        setShowDetail: (state,action) =>{
            state.showDetail[action.payload.pos] = !state.showDetail[action.payload.pos];
        }
    }
})

export const { changeMember, removeMember, setShowDetail} = teamBuildSlice.actions;

export default teamBuildSlice.reducer;