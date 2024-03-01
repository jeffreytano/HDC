//Not used

import axios from 'axios';
const apiKey = 'AIzaSyANMJLnH3Cud73QuWp9STPk-lHJkPcsyic';
const sheetId = '1RvrHZCDgH2u__zwtKdpdRflERtWPKThJIzMgz8vKCAE';
// const sheetName = 'HBRStyleData';

const getStyleData = (sheetName: string, range = 'A2:M1000'): any => {
  const getData = async (url: string) => {
    try {
      const res = await axios.get(url);

      console.log('data', res.data);
      console.log('values', res.data.values);
      return res;
    } catch (e) {
      console.log('error', e);
      return e;
    }
  };
  const dataUrl = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${sheetName}!${range}?valueRenderOption=FORMATTED_VALUE&key=${apiKey}`;
  console.log('dataUrl:', dataUrl);
  return getData(dataUrl);
};

export {getStyleData};
