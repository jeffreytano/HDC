import {ActivityIndicator, StyleSheet, TextComponent} from 'react-native';
import EditScreenInfo from '../../components/EditScreenInfo';
import {Text, View} from '../../components/Themed';
import TeamBox from '../../components/TeamBuilder/TeamBox';
import {useLocalSearchParams} from 'expo-router';
import {TextInput, FlatList, ListRenderItemInfo} from 'react-native';
import {useEffect, useState} from 'react';
import SearchItem from '../../components/SearchComponent/SearchItem';
import * as FileSystem from 'expo-file-system';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../redux/store';
import readJsonFile from '../../components/readJsonFile';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {FetchStyleList, InsertImage} from '../../redux/reducers/styleData';
import {styleData} from '../../redux/dataType';
import {useTheme} from '@react-navigation/native';

type SearchParamType = {
  SearchSlot: string;
};

export default function SearchSlot() {
  const {SearchSlot} = useLocalSearchParams<SearchParamType>();
  const [queryKeyword, setQueryKeyWords] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const [resultData, setResultData] = useState<styleData[]>();
  const [imageData, setImageData] = useState('');
  // const [styleData, setStyleData] = useState<styleData[]>();
  // let styleData = [];
  // const fileUri = FileSystem.documentDirectory + 'StyleDatabase.json';

  const styleData = useSelector((state: RootState) => state.styleData.styles);
  const styleImage = useSelector((state: RootState) => state.styleData.image);

  useEffect(() => {
    console.log('slotId', SearchSlot);
    // checkUpdate('CharacterDataBase');
  }, []);

  useEffect(() => {
    if (styleData.length > 2) {
      setIsLoading(false);
    }
    setResultData(styleData);
  }, [styleData, styleImage]);

  const theme = useTheme();

  const handleSearch = (query: string) => {
    if (query && styleData) {
      const newData = styleData.filter((item) => {
        if (item?.searchKey || item?.styleName || item?.chKey) {
          const itemData = item?.searchKey
            ? item.searchKey.toUpperCase()
            : ''.toUpperCase();
          const textData = query.toUpperCase();
          const styleData = item?.styleName.toUpperCase();
          const chData = item?.chKey.toUpperCase();
          return (
            styleData.concat(' ', itemData, ' ', chData).indexOf(textData) > -1
          );
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
          dispatch(FetchStyleList(onlineResponse.data.styles));
          console.log('JSON content saved successfully!');
        }
      } else {
        dispatch(FetchStyleList(data.styles));
      }
    } catch (error) {
      console.log('failed writing data to local', error);
    }
  };

  const renderItem = (listItem: ListRenderItemInfo<styleData>) => (
    <SearchItem slotId={SearchSlot} style={listItem.item}></SearchItem>
  );

  const keyExtractor = (item: styleData) => item.Sid.toString(); // Use a unique identifier from your data

  const styles = StyleSheet.create({
    container: {
      backgroundColor: theme.dark ? '#121212' : '#FFFFFF',
    },
    TextBar: {
      // backgroundColor: theme.colors.primary,
      margin: 3,
      height: 40,
      paddingHorizontal: 20,
      borderColor: theme.dark ? '#B794F6' : '#2E2E2D',
      borderWidth: 1,
      color: theme.dark ? '#FFFFFF' : '#000000',
    },
  });
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.TextBar}
        value={queryKeyword}
        onChangeText={(newText) => {
          // console.log(newText);
          handleSearch(newText);
        }}
        placeholder="Search keyword here"
        placeholderTextColor={theme.dark ? '#FFFFFF' : '#000000'}
        cursorColor={theme.dark ? '#BDBDBD' : '#FFFFFF'}
      />
      <Text
        style={[
          styles.container,
          {
            color: theme.dark ? '#FFFFFF' : '#000000',
          },
        ]}
      >
        Result found: {styleData?.length}
      </Text>
      {isLoading ? <ActivityIndicator size="large" color="#0000ff" /> : null}
      <FlatList
        data={resultData}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        contentContainerStyle={{paddingBottom: 60}}
        style={styles.container}
      ></FlatList>
      {/* {styleData &&
          styleData.map((item: StyleData, index: number) => (
            <SearchItem style={item} key={index}></SearchItem>
          ))} */}
    </View>
  );
}
