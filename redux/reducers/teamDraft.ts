import {createSlice, lruMemoize} from '@reduxjs/toolkit';
import {
  DEFAULT_BOOSTER_SETS,
  DEFAULT_STATMOD,
  EMPTY_MEMBER_DATA,
  EMPTY_TEAM,
  EMPTY_STATMOD,
} from '../constants/dataConstant';
import {
  TeamMemberData,
  jsonCharStat,
  stat,
  createStat,
  typeStat,
} from '../dataType';
import CharacterData from '../../assets/CharacterData.json';
import TypeStat from '../../assets/TypeStat.json';

const baseSheet = JSON.parse(CharacterData) as Array<jsonCharStat>;
const typeStatSheet = JSON.parse(TypeStat) as Array<typeStat>;

const calculateStat = (Cid: number, level: number, StatModifier: any) => {
  const {
    MinDP,
    MaxDP,
    MinHP,
    MaxHP,
    MinSTR,
    MaxSTR,
    MinDEX,
    MaxDEX,
    MinCON,
    MaxCON,
    MinLCK,
    MaxLCK,
    MaxSPR,
    MaxWIS,
    MinSPR,
    MinWIS,
  } = baseSheet[Cid - 1];
  const dp = Math.round(MinDP + ((level - 1) * (MaxDP - MinDP)) / 199);
  const hp = Math.round(MinHP + ((level - 1) * (MaxHP - MinHP)) / 199);
  const strength =
    Math.round(MinSTR + ((level - 1) * (MaxSTR - MinSTR)) / 199) +
    StatModifier.tensei.strength;
  const dexterity =
    Math.round(MinDEX + ((level - 1) * (MaxDEX - MinDEX)) / 199) +
    StatModifier.tensei.dexterity;
  const constitution =
    Math.round(MinCON + ((level - 1) * (MaxCON - MinCON)) / 199) +
    StatModifier.tensei.constitution;
  const spirit =
    Math.round(MinSPR + ((level - 1) * (MaxSPR - MinSPR)) / 199) +
    StatModifier.tensei.spirit;
  const witness =
    Math.round(MinWIS + ((level - 1) * (MaxWIS - MinWIS)) / 199) +
    StatModifier.tensei.witness;
  const luck =
    Math.round(MinLCK + ((level - 1) * (MaxLCK - MinLCK)) / 199) +
    StatModifier.tensei.luck;
  return createStat(
    dp,
    hp,
    strength,
    dexterity,
    constitution,
    spirit,
    witness,
    luck,
  );
};

const teamDraftSlice = createSlice({
  name: 'teamDraft',
  initialState: {
    TeamMember: EMPTY_TEAM,
    BoosterSet: DEFAULT_BOOSTER_SETS,
    StatModifier: EMPTY_STATMOD,
  },
  reducers: {
    Add: (state, action) => {
      const index: number = action.payload.index;
      let newMember: TeamMemberData = action.payload.teamMember;
      const styleType = newMember.statType;
      if (state.TeamMember != EMPTY_TEAM) {
        // const copiedTeam = Object.entries(state.TeamMember).map(([key, value]) => ({ [key]: value }));
        // const dulplicants = Array.from(copiedTeam).findIndex((item:TeamMemberData)=> item.styleID === action.payload.Sid)
        let repeat = Array.from(state.TeamMember).findIndex(
          (item: TeamMemberData) =>
            item.Sid === newMember.Sid || item.Cid === newMember.Cid,
        );
        state.TeamMember[repeat] = EMPTY_MEMBER_DATA;
      }
      console.log('rare:', newMember.rarity);
      switch (newMember.rarity) {
        case 'SS':
          newMember.level = 130;
          newMember.levelGap = 170;
          break;
        case 'Free':
          newMember.level = 130;
          newMember.levelGap = 170;
          break;
        case 'S':
          newMember.level = 110;
          newMember.levelGap = 160;
          break;
        case 'A':
          newMember.level = 100;
          newMember.levelGap = 160;
          break;
        default:
          newMember.level = 1;
          newMember.levelGap = 160;
          break;
      }
      const statMod = typeStatSheet.find((item) => {
        return item.TypeId == styleType;
      });
      if (statMod) {
        state.StatModifier[index].styleP = createStat(
          statMod.DPP,
          0,
          statMod.StrP,
          statMod.DexP,
          statMod.ConP,
          statMod.SprP,
          statMod.WisP,
          statMod.LckP,
        );
        state.StatModifier[index].styleC = createStat(
          statMod.DPC,
          0,
          statMod.StrC,
          statMod.DexC,
          statMod.ConC,
          statMod.SprC,
          statMod.WisC,
          statMod.LckC,
        );
      }

      newMember.Stat = calculateStat(
        newMember.Cid,
        newMember.level,
        state.StatModifier[index],
      );
      state.TeamMember[index] = newMember;
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
      targetMember.Stat = calculateStat(
        targetMember.Cid,
        targetMember.level,
        state.StatModifier[index],
      );
    },
    LimitBreak: (state, action) => {
      const {index, limitBreak} = action.payload;
      const targetMember = state.TeamMember[index];
      let defaultLevel = 1;
      targetMember.totsu = limitBreak;
      console.log('rare:', targetMember.rarity);
      switch (targetMember.rarity) {
        case 'Free':
          defaultLevel = 130 + 5 * limitBreak;
          targetMember.levelGap = 170;
          state.StatModifier[index].limitBreak = createStat(
            0,
            0,
            4 * limitBreak,
            4 * limitBreak,
            4 * limitBreak,
            4 * limitBreak,
            4 * limitBreak,
            4 * limitBreak,
          );
          break;
        case 'SS':
          defaultLevel = 130 + 10 * limitBreak;
          targetMember.levelGap = 170;
          state.StatModifier[index].limitBreak = createStat(
            0,
            0,
            10 * limitBreak,
            10 * limitBreak,
            10 * limitBreak,
            10 * limitBreak,
            10 * limitBreak,
            10 * limitBreak,
          );
          break;
        case 'S':
          defaultLevel = 110 + 2 * limitBreak;
          targetMember.levelGap = 160;
          state.StatModifier[index].limitBreak = createStat(
            0,
            0,
            3 * limitBreak,
            3 * limitBreak,
            3 * limitBreak,
            3 * limitBreak,
            3 * limitBreak,
            3 * limitBreak,
          );
          break;
        case 'A':
          defaultLevel = 100 + limitBreak;
          targetMember.levelGap = 160;
          state.StatModifier[index].limitBreak = createStat(
            0,
            0,
            limitBreak,
            limitBreak,
            limitBreak,
            limitBreak,
            limitBreak,
            limitBreak,
          );
          break;
        default:
          break;
      }
      console.log('levelGap:', targetMember.levelGap);
      targetMember.level = defaultLevel;
      console.log('level:', targetMember.level);
      targetMember.Stat = calculateStat(
        targetMember.Cid,
        targetMember.level,
        state.StatModifier[index],
      );
    },
    Tensei: (state, action) => {
      const {index, tensei} = action.payload;
      const targetMember = state.TeamMember[index];
      const tenseiType = baseSheet[targetMember.Cid - 1].TenseiBonus;
      if (tensei <= 20) {
        targetMember.tensei = tensei;
      } else {
        targetMember.tensei = 20;
      }
      switch (tenseiType) {
        case 'PWDSLT':
          state.StatModifier[index].tensei = createStat(
            0,
            0,
            Math.ceil(tensei / 6),
            tensei > 1 ? Math.ceil((tensei - 2) / 6) : 0,
            tensei > 4 ? Math.ceil((tensei - 5) / 6) : 0,
            tensei > 2 ? Math.ceil((tensei - 3) / 6) : 0,
            tensei > 0 ? Math.ceil((tensei - 1) / 6) : 0,
            tensei > 3 ? Math.ceil((tensei - 4) / 6) : 0,
          );
          break;
        case 'DSLTPW':
          state.StatModifier[index].tensei = createStat(
            0,
            0,
            tensei > 3 ? Math.ceil((tensei - 4) / 6) : 0,
            Math.ceil(tensei / 6),
            tensei > 2 ? Math.ceil((tensei - 3) / 6) : 0,
            tensei > 0 ? Math.ceil((tensei - 1) / 6) : 0,
            tensei > 4 ? Math.ceil((tensei - 5) / 6) : 0,
            tensei > 1 ? Math.ceil((tensei - 2) / 6) : 0,
          );
          break;
        case 'LTPWDS':
          state.StatModifier[index].tensei = createStat(
            0,
            0,
            tensei > 1 ? Math.ceil((tensei - 2) / 6) : 0,
            tensei > 3 ? Math.ceil((tensei - 4) / 6) : 0,
            tensei > 0 ? Math.ceil((tensei - 1) / 6) : 0,
            tensei > 4 ? Math.ceil((tensei - 5) / 6) : 0,
            tensei > 2 ? Math.ceil((tensei - 3) / 6) : 0,
            Math.ceil(tensei / 6),
          );
          break;
        default:
          break;
      }
      targetMember.Stat = calculateStat(
        targetMember.Cid,
        targetMember.level,
        state.StatModifier[index],
      );
    },
    ChangeBooster: (state, action) => {
      const {index, booster} = action.payload;
      const target = state.BoosterSet[index];
      target.booster = booster;
    },
    ChangeChips: (state, action) => {
      const {index, chips} = action.payload;
      const target = state.BoosterSet[index];
      target.chips = chips;
    },
  },
});

export const {
  Add,
  Remove,
  Level,
  LimitBreak,
  Tensei,
  ChangeBooster,
  ChangeChips,
} = teamDraftSlice.actions;
export default teamDraftSlice.reducer;
