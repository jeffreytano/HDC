import {GET_ALL_STYLE_DATA} from '../constants/dataConstant';

export const AllStyleData = (data: any) => {
  return {
    type: GET_ALL_STYLE_DATA,
    payload: data,
  };
};
