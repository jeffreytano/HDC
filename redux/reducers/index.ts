// reducers/index.js
import {combineReducers} from '@reduxjs/toolkit';
import teamDraft from './teamDraft';
import styleData from './styleData';

const rootReducer = combineReducers({
  teamDraft,
  styleData,
  // Add your individual reducers here
});

export default rootReducer;
