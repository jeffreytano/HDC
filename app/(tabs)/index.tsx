import {StyleSheet} from 'react-native';
import EditScreenInfo from '../../components/EditScreenInfo';
import {Text, View} from '../../components/Themed';
import TeamBox from '../../components/TeamBuilder/TeamBox';
import {useDispatch} from 'react-redux';
import * as FileSystem from 'expo-file-system';
import {InsertImage, FetchStyleList} from '../../redux/reducers/styleData';
import {useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {jsonStyleData, styleData} from '../../redux/dataType';
import {useSelector} from 'react-redux';
import {RootState} from '../../redux/store';

export default function TabOneScreen() {
  const styleData = useSelector((state: RootState) => state.styleData.styles);

  useEffect(() => {
    checkUpdate('CharacterDataBase');
  }, []);

  useEffect(() => {
    const imageList = [...Array(39)].map((_, index) => index + 1);
    imageList.map((index) => downloadimage(index));
  }, [styleData]);

  const dispatch = useDispatch();

  const downloadimage = async (index: number) => {
    const filename = index + '.png';

    const result = await FileSystem.downloadAsync(
      'https://jeffreytano.github.io/image/icon/' + index + '.png',
      FileSystem.documentDirectory + filename,
    );
    const payload = {
      index: index,
      image: result.uri,
    };
    dispatch(InsertImage(payload));
  };

  const checkUpdate = async (key: string) => {
    let lastUpdate;
    let needUpdate = true;
    let onlineResponse;
    let data;
    let jsonData;
    let styleData: jsonStyleData[] = [];

    try {
      jsonData = await AsyncStorage.getItem(key);
      if (jsonData !== null) {
        data = JSON.parse(jsonData);
        lastUpdate = data.lastUpdate;
        styleData = data.styles;
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
          styleData = onlineResponse.data.styles;
          console.log('JSON content saved successfully!');
        }
      }
    } catch (error) {
      console.log('failed writing data to local', error);
    }
    if (styleData) {
      let combinedArray: any[] = [];
      styleData.map(({Cid, name, team, weapon, chKey, detail}) => {
        const singleChStyle = detail.map((styleItem) => {
          const result = {
            Cid: Cid,
            name: name,
            team: team,
            weapon: weapon,
            chKey: chKey,
            ...styleItem,
          };
          return result;
        });
        combinedArray = combinedArray.concat(singleChStyle);
      });
      dispatch(FetchStyleList(combinedArray));
    }
  };

  return (
    <View style={styles.container}>
      <TeamBox></TeamBox>
      {/* <EditScreenInfo path="app/(tabs)/index.tsx" /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
