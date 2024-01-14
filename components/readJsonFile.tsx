import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {useDispatch} from 'react-redux';

const readJsonFile = async (key: string) => {
  const dispatch = useDispatch();
  checkUpdate(key);
  // try {
  //   const jsonValue = await AsyncStorage.getItem(key);
  //   if (jsonValue !== null) {
  //     const data = JSON.parse(jsonValue);
  //     console.log(data);
  //     console.log(data.CharacterData);
  //     console.log(data.CharacterData[1]);
  //     console.log(data.CharacterData[1].baseStat);r
  //     console.log('before dispatch');
  //     dispatch({
  //       type: GET_ALL_STYLE_DATA,
  //       payload: data,
  //     });
  //     // Use the data as needed
  //   }
  // } catch (error) {
  //   console.log('failed at get local json', error);
  // }
};

const checkUpdate = async (key: string) => {
  let lastUpdate;
  let needUpdate = true;
  let onlineResponse;
  try {
    const jsonData = await AsyncStorage.getItem(key);
    if (jsonData !== null) {
      const data = JSON.parse(jsonData);
      lastUpdate = data.key;
    }
  } catch (error) {
    console.log('failed at get local json update time', error);
  }
  try {
    onlineResponse = await axios.get(
      'https://jeffreytano.github.io/image/CharacterDataBase.json',
    );
    if (lastUpdate) {
      needUpdate = onlineResponse.data.lastUpdate > lastUpdate;
    }
  } catch (error) {
    console.log('failed at get online update time', error);
  }
  if (needUpdate && onlineResponse) {
    //need update
    // try {
    await AsyncStorage.setItem(key, JSON.stringify(onlineResponse.data));
    // } catch (error) {
    //   console.log('failed writing data to local', error);
    // }
    console.log('JSON content saved successfully!');
  } else {
    console.log('it is up to date!');
  }
};

export default readJsonFile;
