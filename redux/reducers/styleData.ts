import {createSlice} from '@reduxjs/toolkit';
import {initialStyleData, styleImage} from '../constants/dataConstant';

const styleDataSlice = createSlice({
  name: 'styleData',
  initialState: {
    styles: initialStyleData,
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
