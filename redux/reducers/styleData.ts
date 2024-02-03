import {createSlice} from '@reduxjs/toolkit';
import {EMPTY_TEAM} from '../constants/dataConstant';
import {
  jsonStyleData,
  DefaultStyleData,
  styleImage,
} from '../../redux/dataType';

const styleDataSlice = createSlice({
  name: 'styleData',
  initialState: {
    styles: DefaultStyleData,
    image: styleImage,
  },
  reducers: {
    FetchStyleList: (state, action) => {
      state.styles = action.payload;
    },
    InsertImage: (state, action) => {
      const {index, image} = action.payload;
      state.image[index] = image;
    },
  },
});

export const {FetchStyleList, InsertImage} = styleDataSlice.actions;
export default styleDataSlice.reducer;
