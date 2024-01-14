import {StyleSheet} from 'react-native';
import EditScreenInfo from '../../components/EditScreenInfo';
import {Text, View} from '../../components/Themed';
import TeamBox from '../../components/TeamBuilder/TeamBox';
import {useLocalSearchParams} from 'expo-router';
import {TextInput, FlatList, Button, ListRenderItemInfo} from 'react-native';
import {useEffect, useState} from 'react';
import SearchItem from '../../components/SearchComponent/SearchItem';
import * as FileSystem from 'expo-file-system';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../redux/store';
import readJsonFile from '../../components/readJsonFile';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {FetchStyleList} from '../../redux/reducers/styleData';
import {StyleData} from '../../redux/dataType';

type SearchParamType = {
  SearchSlot: string;
};

export default function SearchSlot() {
  const {SearchSlot} = useLocalSearchParams<SearchParamType>();
  const [queryKeyword, setQueryKeyWords] = useState('');
  const dispatch = useDispatch();
  // let styleData = [];
  // const fileUri = FileSystem.documentDirectory + 'StyleDatabase.json';

  const styleData = useSelector((state: RootState) => state.styleData.styles);

  useEffect(() => {
    // readJsonFile('StyleDatabase');
    console.log('slotId', SearchSlot);
    checkUpdate('CharacterDataBase');
  }, []);

  const [resultData, setResultData] = useState<StyleData[]>(styleData);

  const handleSearch = (query: string) => {
    if (query) {
      const newData = styleData.filter((item) => {
        if (item?.searchKey) {
          const itemData = item?.searchKey
            ? item.searchKey.toUpperCase()
            : ''.toUpperCase();
          const textData = query.toUpperCase();
          return itemData.indexOf(textData) > -1;
        }
      });
      setResultData(newData);
      setQueryKeyWords(query);
    } else {
      setResultData(styleData);
      setQueryKeyWords(query);
    }
  };

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
    console.log('needUpdate:', needUpdate);
    // console.log('data', data);
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

  const renderItem = (listItem: ListRenderItemInfo<StyleData>) => (
    <SearchItem slotId={SearchSlot} style={listItem.item}></SearchItem>
  );

  const keyExtractor = (item: StyleData) => item.Sid?.toString(); // Use a unique identifier from your data

  return (
    <View>
      <TextInput
        style={{backgroundColor: 'gray', height: 40, paddingHorizontal: 20}}
        value={queryKeyword}
        onChangeText={(newText) => {
          // console.log(newText);
          handleSearch(newText);
        }}
        placeholder="Search keyword here"
      />
      <Text>Result found: {styleData.length}</Text>
      <FlatList
        data={resultData}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        contentContainerStyle={{paddingBottom: 110}}
      ></FlatList>
      {/* {styleData &&
          styleData.map((item: StyleData, index: number) => (
            <SearchItem style={item} key={index}></SearchItem>
          ))} */}
    </View>
  );
}
