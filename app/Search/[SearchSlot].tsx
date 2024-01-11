import {StyleSheet} from 'react-native';
import EditScreenInfo from '../../components/EditScreenInfo';
import {Text, View} from '../../components/Themed';
import TeamBox from '../../components/TeamBuilder/TeamBox';
import {useLocalSearchParams} from 'expo-router';
import {TextInput, Button} from 'react-native';
import {useEffect, useState} from 'react';
import SearchItem from '../../components/SearchComponent/SearchItem';
import * as FileSystem from 'expo-file-system';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../redux/store';
import readJsonFile from '../../components/readJsonFile';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {GET_ALL_STYLE_DATA} from '../../redux/constants/dataConstant';
import {AllStyleData} from '../../redux/action/styleDataAction';
import {FetchStyleList} from '../../redux/reducers/styleData';
import {StyleData} from '../../redux/dataType';

export default function SearchSlot() {
  const {id} = useLocalSearchParams();
  const [searchKey, setSearchKey] = useState('');
  const dispatch = useDispatch();
  // let styleData = [];
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
    try {
      if (needUpdate) {
        if (onlineResponse) {
          await AsyncStorage.setItem(key, JSON.stringify(onlineResponse.data));
          console.log('JSON content saved successfully!');
        }
      } else {
        dispatch(FetchStyleList(data.styles));
      }
    } catch (error) {
      console.log('failed writing data to local', error);
    }
  };

  const handleChangeText = (newText: string) => {
    setSearchKey(newText);
  };

  // const StyleList = () => {
  //   if (styleData.length > 0) {
  //     return styleData.map((item: any) => (
  //       <SearchItem StyleID={item.id}></SearchItem>
  //     ));
  //   }
  // };

  return (
    <View>
      <TextInput
        style={{backgroundColor: 'gray', height: 40, paddingHorizontal: 20}}
        value={searchKey}
        onChangeText={handleChangeText}
        placeholder="Search keyword here"
      />
      <Text>Result found: {styleData.styles.length}</Text>
      {styleData &&
        styleData.styles.map((item: StyleData, index: number) => (
          <SearchItem style={item}></SearchItem>
        ))}
    </View>
  );
}
