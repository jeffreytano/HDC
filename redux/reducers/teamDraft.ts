import {AnyAction, createSlice, lruMemoize} from '@reduxjs/toolkit';
import {
  DEFAULT_BOOSTER_SETS,
  DEFAULT_STATMOD,
  EMPTY_MEMBER_DATA,
  EMPTY_TEAM,
  EMPTY_STATMOD,
  DEFAULT_STAT,
  DEFAULT_TEAM_ACCESSORY,
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
import {chipDetails, statModifier} from '../dataType';
import AccessoryPage from '../../components/EquipmentSelection/AccessoryPage';

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

  // const tempChipStat = [...Array()].map((_, index) => index + 1);
  const dp =
    Math.ceil(
      (Math.round(MinDP + ((level - 1) * (MaxDP - MinDP)) / 199) *
        (100 + StatModifier.styleP.dp)) /
        100,
    ) +
    StatModifier.styleC.dp +
    StatModifier.chips[0].dp +
    StatModifier.chips[1].dp +
    StatModifier.chips[2].dp +
    StatModifier.chips[3].dp;

  const hp = Math.round(MinHP + ((level - 1) * (MaxHP - MinHP)) / 199);

  const strength =
    Math.ceil(
      ((Math.round(MinSTR + ((level - 1) * (MaxSTR - MinSTR)) / 199) +
        StatModifier.tensei.strength +
        StatModifier.global.strength) *
        (100 +
          StatModifier.styleP.strength +
          StatModifier.limitBreak.strength)) /
        100,
    ) +
    StatModifier.styleC.strength +
    StatModifier.booster.strength +
    StatModifier.chips[0].strength +
    StatModifier.chips[1].strength +
    StatModifier.chips[2].strength +
    StatModifier.chips[3].strength;

  const dexterity =
    Math.ceil(
      ((Math.round(MinDEX + ((level - 1) * (MaxDEX - MinDEX)) / 199) +
        StatModifier.tensei.dexterity +
        StatModifier.global.dexterity) *
        (100 +
          StatModifier.styleP.dexterity +
          StatModifier.limitBreak.dexterity)) /
        100,
    ) +
    StatModifier.styleC.dexterity +
    StatModifier.booster.dexterity +
    StatModifier.chips[0].dexterity +
    StatModifier.chips[1].dexterity +
    StatModifier.chips[2].dexterity +
    StatModifier.chips[3].dexterity;
  const constitution =
    Math.ceil(
      ((Math.round(MinCON + ((level - 1) * (MaxCON - MinCON)) / 199) +
        StatModifier.tensei.constitution +
        StatModifier.global.constitution) *
        (100 +
          StatModifier.styleP.constitution +
          StatModifier.limitBreak.constitution)) /
        100,
    ) +
    StatModifier.styleC.constitution +
    StatModifier.booster.constitution +
    StatModifier.chips[0].constitution +
    StatModifier.chips[1].constitution +
    StatModifier.chips[2].constitution +
    StatModifier.chips[3].constitution;
  const spirit =
    Math.ceil(
      ((Math.round(MinSPR + ((level - 1) * (MaxSPR - MinSPR)) / 199) +
        StatModifier.tensei.spirit +
        StatModifier.global.spirit) *
        (100 + StatModifier.styleP.spirit + StatModifier.limitBreak.spirit)) /
        100,
    ) +
    StatModifier.styleC.spirit +
    StatModifier.booster.spirit +
    StatModifier.chips[0].spirit +
    StatModifier.chips[1].spirit +
    StatModifier.chips[2].spirit +
    StatModifier.chips[3].spirit;
  const witness =
    Math.ceil(
      ((Math.round(MinWIS + ((level - 1) * (MaxWIS - MinWIS)) / 199) +
        StatModifier.tensei.witness +
        StatModifier.global.witness) *
        (100 + StatModifier.styleP.witness + StatModifier.limitBreak.witness)) /
        100,
    ) +
    StatModifier.styleC.witness +
    StatModifier.booster.witness +
    StatModifier.chips[0].witness +
    StatModifier.chips[1].witness +
    StatModifier.chips[2].witness +
    StatModifier.chips[3].witness;
  const luck =
    Math.ceil(
      ((Math.round(MinLCK + ((level - 1) * (MaxLCK - MinLCK)) / 199) +
        StatModifier.tensei.luck +
        StatModifier.global.luck) *
        (100 + StatModifier.styleP.luck + StatModifier.limitBreak.luck)) /
        100,
    ) +
    StatModifier.styleC.luck +
    StatModifier.booster.luck +
    StatModifier.chips[0].luck +
    StatModifier.chips[1].luck +
    StatModifier.chips[2].luck +
    StatModifier.chips[3].luck;
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
    AccessorySet: DEFAULT_TEAM_ACCESSORY,
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
      console.log(styleType);
      const statMod = typeStatSheet.find((item) => {
        return item.TypeId == styleType;
      });
      console.log('statMod ', statMod);
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
        state.StatModifier[index].global = createStat(
          0,
          0,
          statMod.StrEx,
          statMod.DexEx,
          statMod.ConEx,
          statMod.SprEx,
          statMod.WisEx,
          statMod.LckEx,
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
      const {index, booster, stat} = action.payload;
      const target = state.BoosterSet[index];
      const targetMember = state.TeamMember[index];
      const targetStat = state.StatModifier[index];
      target.id = booster.id;
      target.name = booster.name;
      if (target.id == '-1') {
        target.slot = 0;
        targetStat.booster = DEFAULT_STAT;
      } else {
        target.slot = booster.slot;
        targetStat.booster = stat;
      }
      switch (target.slot) {
        case 0:
          targetStat.chips = [
            DEFAULT_STAT,
            DEFAULT_STAT,
            DEFAULT_STAT,
            DEFAULT_STAT,
          ];
          break;
        case 1:
          targetStat.chips[1] = DEFAULT_STAT;
          targetStat.chips[2] = DEFAULT_STAT;
          targetStat.chips[3] = DEFAULT_STAT;
          break;
        case 2:
          targetStat.chips[2] = DEFAULT_STAT;
          targetStat.chips[3] = DEFAULT_STAT;
          break;
        case 3:
          targetStat.chips[3] = DEFAULT_STAT;
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
    ChangeChips: (state, action) => {
      const {index, chipIndex, stat, chipId, chipName} = action.payload;
      const targetChip = state.BoosterSet[index].chips[chipIndex];
      const targetMember = state.TeamMember[index];
      targetChip.id = chipId;
      targetChip.name = chipName;
      state.StatModifier[index].chips[chipIndex] = stat;
      targetMember.Stat = calculateStat(
        targetMember.Cid,
        targetMember.level,
        state.StatModifier[index],
      );
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
