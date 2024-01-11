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
  },
});

export const {FetchStyleList} = styleDataSlice.actions;
export default styleDataSlice.reducer;
