import {createSlice} from '@reduxjs/toolkit';
import {INI_ROLE, RARITY} from '../constants/dataConstant';
import {
  INI_CLASS,
  INI_ELEMENT,
  INI_RARITY,
  INI_SKILL_TARGET,
  INI_WEAPON,
  initialStyleData,
  styleImage,
} from '../constants/dataConstant';

const styleDataSlice = createSlice({
  name: 'styleData',
  initialState: {
    styles: initialStyleData,
    image: styleImage,
    rarity: INI_RARITY,
    class: INI_CLASS,
    weapon: INI_WEAPON,
    element: INI_ELEMENT,
    role: INI_ROLE,
    target: INI_SKILL_TARGET,
    SpUsage: {SP: 0, Mode: 'All'},
    SpEqual: {SP: 0, Mode: 'All'},
    hit: {hit: 0, Mode: 'All'},
  },
  reducers: {
    FetchStyleList: (state, action) => {
      state.styles = action.payload;
    },
    InsertImage: (state, action) => {
      const {index, image} = action.payload;
      state.image[index] = image;
    },
    changeFilter: (state, action) => {
      const {
        rarity,
        classes,
        weapon,
        element,
        role,
        target,
        SpUsage,
        SpEqual,
        hit,
      } = action.payload;
      state.rarity = rarity;
      state.class = classes;
      state.weapon = weapon;
      state.element = element;
      state.role = role;
      state.target = target;
      state.SpUsage = SpUsage;
      state.SpEqual = SpEqual;
      state.hit = hit;

      console.log(state.rarity, state.element);
    },
    // rarity: (state, action) => {
    //   const rarityChange = action.payload;
    //   state.rarity = rarityChange;
    // },
    // class: (state, action) => {
    //   const classChange = action.payload;
    //   state.class = classChange;
    // },
    // weapon: (state, action) => {
    //   const weaponChange = action.payload;
    //   state.weapon = weaponChange;
    // },
    // element: (state, action) => {
    //   const elementChange = action.payload;
    //   state.element = elementChange;
    // },
    // target: (state, action) => {
    //   const targetChange = action.payload;
    //   state.target = targetChange;
    // },
    // SpUsage: (state, action) => {
    //   const {SP, mode} = action.payload;
    //   state.SpUsage.SP = SP;
    //   state.SpUsage.Mode = mode;
    // },
    // SpEqual: (state, action) => {
    //   const {SP, mode} = action.payload;
    //   state.SpEqual.SP = SP;
    //   state.SpEqual.Mode = mode;
    // },
    // hit: (state, action) => {
    //   const {SP, mode} = action.payload;
    //   state.hit.hit = SP;
    //   state.hit.Mode = mode;
    // },
  },
});

export const {FetchStyleList, InsertImage, changeFilter} =
  styleDataSlice.actions;
export default styleDataSlice.reducer;
