import {StyleSheet} from 'react-native';
import EditScreenInfo from '../../components/EditScreenInfo';
import {Text, View} from '../../components/Themed';
import TeamBox from '../../components/TeamBuilder/TeamBox';
import {useLocalSearchParams} from 'expo-router';
import {TextInput} from 'react-native';
import {useEffect, useState} from 'react';
import SearchItem from '../../components/SearchComponent/SearchItem';
import * as FileSystem from 'expo-file-system';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../redux/store';
import readJsonFile from '../../components/readJsonFile';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {GET_ALL_STYLE_DATA} from '../../redux/constants/dataConstant';

export default function SearchSlot() {
  const {id} = useLocalSearchParams();
  const [searchKey, setSearchKey] = useState('');
  // const fileUri = FileSystem.documentDirectory + 'StyleDatabase.json';

  const styleData = useSelector((state: RootState) => state.styleData);

  useEffect(() => {
    // readJsonFile('StyleDatabase');
    checkUpdate('CharacterDataBase');
  }, []);

  // const readData = async () => {
  //   try {
  //     const fileContent = await FileSystem.readAsStringAsync(fileUri);
  //     console.log('file content', fileContent);
  //   } catch (error) {
  //     console.log('Error reading file:', error);
  //   }
  // };

  // const checkIfJSONExists = async () => {
  //   try {
  //     const fileInfo = await FileSystem.getInfoAsync(fileUri);

  //     if (fileInfo.exists) {
  //       console.log('json exist');
  //       readData();
  //     } else {
  //       console.log('json not exist');
  //     }
  //   } catch (error) {
  //     console.log('Error:', error);
  //   }
  // };

  // const DownloadJson = async () => {
  //   try {
  //     // Download the JSON file
  //     const response = await fetch('https://example.com/data.json');
  //     const jsonContent = await response.json();
  //     await FileSystem.writeAsStringAsync(fileUri, JSON.stringify(jsonContent));
  //   } catch (error) {
  //     console.log('Error:', error);
  //   }
  // };

  const checkUpdate = async (key: string) => {
    // const dispatch = useDispatch();
    let lastUpdate;
    let needUpdate = true;
    let onlineResponse;
    let data;
    let jsonData;
    try {
      jsonData = await AsyncStorage.getItem(key);
      if (jsonData !== null) {
        data = JSON.parse(jsonData);
        lastUpdate = data.lastUpdate;
        console.log('local lastUpdate', lastUpdate);
      } else {
        console.log('unable to find target');
      }
    } catch (error) {
      console.log('failed at get local json update time', error);
    }
    try {
      onlineResponse = await axios.get(
        'https://jeffreytano.github.io/image/styleData.json',
      );

      if (lastUpdate) {
        needUpdate = onlineResponse.data.lastUpdate > lastUpdate;
      }
    } catch (error) {
      console.log('failed at get online update time', error);
    }
    if (needUpdate) {
      if (onlineResponse) {
        try {
          await AsyncStorage.setItem(key, JSON.stringify(onlineResponse.data));
          console.log('onlibeResponse', onlineResponse.data);
        } catch (error) {
          console.log('failed writing data to local', error);
        }
        console.log('JSON content saved successfully!');

        try {
          const check = await AsyncStorage.getItem(key);
          if (check) {
            console.log(check);
            const check2 = JSON.parse(check);
            console.log('check', check2, check2.styles);
          }
        } catch (error) {
          console.log('failed check data from locals', error);
        }
      }
    } else {
      console.log('it is up to date!');
      console.log(data);
      console.log(data.CharacterData);
      console.log(data.CharacterData[1]);
      console.log(data.CharacterData[1].baseStat);
      console.log('before dispatch');
      // dispatch({
      //   type: GET_ALL_STYLE_DATA,
      //   payload: data,
      // });
      console.log(data);
    }
  };

  const handleChangeText = (newText: string) => {
    setSearchKey(newText);
  };

  return (
    <View>
      <TextInput
        style={{backgroundColor: 'gray', height: 40, paddingHorizontal: 20}}
        value={searchKey}
        onChangeText={handleChangeText}
        placeholder="Search keyword here"
      />
      <SearchItem StyleID={1}></SearchItem>
    </View>
  );
}
