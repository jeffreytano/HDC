import {
  ActivityIndicator,
  StyleSheet,
  TextComponent,
  Modal,
  TextInput,
  FlatList,
  ListRenderItemInfo,
  Pressable,
} from 'react-native';
// import Checkbox from 'expo-checkbox';
import EditScreenInfo from '../../components/EditScreenInfo';
import {Text, View} from '../../components/Themed';
import TeamBox from '../../components/TeamBuilder/TeamBox';
import {useLocalSearchParams, useRouter} from 'expo-router';
import {useEffect, useState} from 'react';
import SearchItem from '../../components/SearchComponent/SearchItem';
import * as FileSystem from 'expo-file-system';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../redux/store';
import readJsonFile from '../../components/readJsonFile';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {FetchStyleList, InsertImage} from '../../redux/reducers/styleData';
import {styleData, stat} from '../../redux/dataType';
import {useTheme} from '@react-navigation/native';
import {Button, Checkbox, Divider} from 'react-native-paper';
import {
  ELEMENT,
  INI_CLASS,
  INI_ELEMENT,
  INI_RARITY,
  INI_ROLE,
  INI_SKILL_TARGET,
  INI_WEAPON,
  SKILL_TARGET,
  WEAPON,
} from '../../redux/constants/dataConstant';

type SearchParamType = {
  SearchSlot: string;
};

type filterGroup =
  | typeof INI_RARITY
  | typeof INI_CLASS
  | typeof INI_ELEMENT
  | typeof INI_WEAPON
  | typeof INI_ROLE
  | typeof INI_SKILL_TARGET;

// const inititalRarity: {[key: string]: boolean} = RARITY.reduce((acc, item) => {
//   acc[item] = true;
//   return acc;
// }, {});

export default function SearchSlot() {
  const FilterOption = {
    rarity: INI_RARITY,
    element: INI_ELEMENT,
    weapon: INI_WEAPON,
    class: INI_CLASS,
    role: INI_ROLE,
    target: INI_SKILL_TARGET,
    SP: -1,
    SPRange: 'All',
    SPequal: -1,
    SPequalRange: 'All',
    hit: -1,
    hitRange: 'All',
  };

  const {SearchSlot} = useLocalSearchParams<SearchParamType>();
  const [queryKeyword, setQueryKeyWords] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const [resultData, setResultData] = useState<styleData[]>();
  const [filteredData, setFilteredData] = useState<styleData[]>();
  const [imageData, setImageData] = useState('');
  // const [styleData, setStyleData] = useState<styleData[]>();
  // let styleData = [];
  // const fileUri = FileSystem.documentDirectory + 'StyleDatabase.json';

  const router = useRouter();
  const styleData = useSelector((state: RootState) => state.styleData.styles);
  const styleImage = useSelector((state: RootState) => state.styleData.image);

  const rarity: filterGroup = useSelector(
    (state: RootState) => state.styleData.rarity,
  );

  const element: filterGroup = useSelector(
    (state: RootState) => state.styleData.element,
  );

  const weapon: filterGroup = useSelector(
    (state: RootState) => state.styleData.weapon,
  );

  const classes: filterGroup = useSelector(
    (state: RootState) => state.styleData.class,
  );

  const role: filterGroup = useSelector(
    (state: RootState) => state.styleData.role,
  );

  const target: filterGroup = useSelector(
    (state: RootState) => state.styleData.target,
  );

  const transformPayload = (item: filterGroup) => {
    if (item.All) {
      return ['All'];
    } else {
      return Object.entries(item)
        .filter(([_, value]) => value === true)
        .map(([key]) => key);
    }
  };

  const initialFilter = [
    INI_RARITY,
    INI_ELEMENT,
    INI_WEAPON,
    INI_CLASS,
    INI_ROLE,
    INI_SKILL_TARGET,
  ];
  const filterKeyIndex = [
    'rarity',
    'element',
    'weapon',
    'class',
    'role',
    'target',
  ];
  const filter = [rarity, element, weapon, classes, role, target].map(
    (item: filterGroup) => {
      return transformPayload(item);
    },
  );

  const filterStyle = (
    target: styleData,
    filter: Array<string>,
    key: string,
  ) => {
    if (filter[0] === 'All') {
      return true;
    }
    switch (key) {
      case 'element':
        return filter.some(
          (element) =>
            element === ELEMENT[target[key as keyof styleData] as number],
        );
      case 'weapon':
        return filter.some(
          (element) =>
            element === WEAPON[target[key as keyof styleData] as number],
        );
      case 'target':
        return filter.some(
          (element) =>
            element === SKILL_TARGET[target[key as keyof styleData] as number],
        );
      default:
        return filter.some(
          (element) => element === target[key as keyof styleData],
        );
    }
  };

  useEffect(() => {
    console.log('slotId', SearchSlot);
    // checkUpdate('CharacterDataBase');
  }, []);

  useEffect(() => {
    if (styleData.length > 2) {
      setIsLoading(false);
    }
    const allStyle = styleData;

    let filteredStyle = allStyle.filter((style: styleData) => {
      const result = filter.map((filter: Array<string>, index: number) => {
        const key = filterKeyIndex[index];
        return filterStyle(style, filter, key);
      });
      return !result.some((value) => value === false);
    });
    setFilteredData(filteredStyle);
  }, [styleData, styleImage, rarity, element, weapon, classes, role, target]);

  useEffect(() => {
    handleSearch(queryKeyword);
  }, [filteredData]);

  const theme = useTheme();

  const handleSearch = (query: string) => {
    console.log('handled search');
    if (query && filteredData) {
      const newData = filteredData.filter((item) => {
        if (item?.searchKey || item?.styleName || item?.chKey || item.class) {
          const itemData = item?.searchKey
            ? item.searchKey.toUpperCase()
            : ''.toUpperCase();
          const textData = query.toUpperCase();
          const filteredData = item?.styleName.toUpperCase();
          const chData = item?.chKey.toUpperCase();
          const chClass = item?.class?.toUpperCase();
          return (
            filteredData
              .concat(' ', chClass ? chClass : '', ' ', itemData, ' ', chData)
              .indexOf(textData) > -1
          );
        }
      });
      setResultData(newData);
      setQueryKeyWords(query);
    } else {
      setResultData(filteredData);
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
      flex: 15,
      margin: 3,
      height: 40,
      paddingHorizontal: 20,
      borderColor: theme.dark ? '#B794F6' : '#2E2E2D',
      borderWidth: 1,
      color: theme.dark ? '#FFFFFF' : '#000000',
    },
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)', // semi-transparent background
    },
    modalContent: {
      backgroundColor: theme.dark ? '#222222' : '#FFFFFF', //6200EE
      padding: 12,
    },
    modalCheckBoxGroup: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      margin: 5,
    },
    checkbox: {
      margin: 10,
    },
  });
  return (
    <View style={styles.container}>
      <View style={{flexDirection: 'row'}}>
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
      </View>
      <View style={{flexDirection: 'row'}}>
        <Text
          style={[
            styles.container,
            {
              color: theme.dark ? '#FFFFFF' : '#000000',
              flex: 4,
            },
          ]}
        >
          Result found: {styleData?.length}
        </Text>
        <Button
          mode={'contained'}
          style={{flex: 1}}
          onPress={() => {
            router.push({
              pathname: './SkillEffectFilter',
            });
          }}
        >
          Skill Filter
        </Button>
        <Button
          mode={'contained'}
          style={{flex: 1}}
          onPress={() => {
            router.push({
              pathname: './FilterPage',
            });
          }}
        >
          Filter
        </Button>
      </View>

      {isLoading ? <ActivityIndicator size="large" color="#0000ff" /> : null}
      <FlatList
        data={resultData}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        contentContainerStyle={{paddingBottom: 60}}
        style={styles.container}
      ></FlatList>
    </View>
  );
}
