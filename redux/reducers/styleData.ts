import {createSlice} from '@reduxjs/toolkit';
import {EMPTY_TEAM} from '../constants/dataConstant';
import {StyleData, DefaultStyleData} from '../../redux/dataType';

const styleDataSlice = createSlice({
  name: 'styleData',
  initialState: {
    styles: DefaultStyleData,
  },
  reducers: {
    FetchStyleList: (state, action) => {
      state.styles = action.payload;
    },
    InsertImage: (state,action) => {
      const {index, image} = action.payload;
      state.styles[index] = 
      {
        ...state.styles[index],
        image
      }
    }
  },
});

export const {FetchStyleList, InsertImage} = styleDataSlice.actions;
export default styleDataSlice.reducer;
