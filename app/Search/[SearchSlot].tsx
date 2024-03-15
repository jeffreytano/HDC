import {
  ActivityIndicator,
  StyleSheet,
  TextComponent,
  Modal,
  TextInput,
  FlatList,
  ListRenderItemInfo,
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import EditScreenInfo from '../../components/EditScreenInfo';
import {Text, View} from '../../components/Themed';
import TeamBox from '../../components/TeamBuilder/TeamBox';
import {useLocalSearchParams} from 'expo-router';
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
import {Formik} from 'formik';
import {
  RARITY,
  ELEMENT,
  WEAPON,
  CLASS,
  ROLE,
  SKILL_TARGET,
} from '../../redux/constants/dataConstant';

type SearchParamType = {
  SearchSlot: string;
};

export default function SearchSlot() {
  const initialFormikValue = {
    rarity: RARITY,
    element: ELEMENT,
    weapon: WEAPON,
    class: CLASS,
    role: ROLE,
    target: SKILL_TARGET,
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
  const [imageData, setImageData] = useState('');
  const [modalVisible, setModalVisible] = useState(true);
  const [formikValue, setFormikValue] = useState(initialFormikValue);

  // const [styleData, setStyleData] = useState<styleData[]>();
  // let styleData = [];
  // const fileUri = FileSystem.documentDirectory + 'StyleDatabase.json';

  const styleData = useSelector((state: RootState) => state.styleData.styles);
  const styleImage = useSelector((state: RootState) => state.styleData.image);

  useEffect(() => {
    console.log('slotId', SearchSlot);
    // checkUpdate('CharacterDataBase');
  }, []);

  const CheckBoxItem = ({label, group}: {label: string; group: string}) => {
    let status = true;
    switch (group) {
      case 'rarity':
        status = formikValue.rarity.includes(label);
        break;
      case 'element':
        status = formikValue.element.includes(label);
        break;
      case 'class':
        status = formikValue.class.includes(label);
        break;
      case 'role':
        status = formikValue.role.includes(label);
        break;
      case 'target':
        status = formikValue.target.includes(label);
        break;
      default:
        status = true;
    }

    return (
      <View style={{flexDirection: 'row'}}>
        <Checkbox
          status={status ? 'checked' : 'unchecked'}
          onPress={() => handleFormikChange({label, group})}
        />
        <Text style={{alignSelf: 'center'}}>{label}</Text>
      </View>
    );
  };

  const handleFormikChange = ({
    label,
    group,
  }: {
    label: string;
    group: string;
  }) => {};

  useEffect(() => {
    if (styleData.length > 2) {
      setIsLoading(false);
    }
    setResultData(styleData);
  }, [styleData, styleImage]);

  const handleSubmit = (values: any) => {
    // Handle form submission
    console.log(values);
  };

  const theme = useTheme();

  const handleSearch = (query: string) => {
    if (query && styleData) {
      const newData = styleData.filter((item) => {
        if (item?.searchKey || item?.styleName || item?.chKey || item.class) {
          const itemData = item?.searchKey
            ? item.searchKey.toUpperCase()
            : ''.toUpperCase();
          const textData = query.toUpperCase();
          const styleData = item?.styleName.toUpperCase();
          const chData = item?.chKey.toUpperCase();
          const chClass = item?.class?.toUpperCase();
          return (
            styleData
              .concat(' ', chClass ? chClass : '', ' ', itemData, ' ', chData)
              .indexOf(textData) > -1
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
      <Modal visible={modalVisible} transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Formik initialValues={formikValue} onSubmit={handleSubmit}>
              {({values, handleChange, handleSubmit}) => (
                <View>
                  <Divider />
                  <View style={styles.modalCheckBoxGroup}>
                    {RARITY.map((item, index) => {
                      return (
                        <CheckBoxItem key={index} label={item} group="rarity" />
                      );
                    })}
                  </View>
                  <Divider />
                  <View style={styles.modalCheckBoxGroup}>
                    {ELEMENT.map((item, index) => {
                      return (
                        <CheckBoxItem
                          key={index}
                          label={item}
                          group="element"
                        />
                      );
                    })}
                  </View>
                  <Divider />
                  <View style={styles.modalCheckBoxGroup}>
                    {WEAPON.map((item, index) => {
                      return (
                        <CheckBoxItem key={index} label={item} group="weapon" />
                      );
                    })}
                  </View>
                  <Divider />
                  <View style={styles.modalCheckBoxGroup}>
                    {CLASS.map((item, index) => {
                      return (
                        <CheckBoxItem key={index} label={item} group="class" />
                      );
                    })}
                  </View>
                  <Divider />
                  <View style={styles.modalCheckBoxGroup}>
                    {ROLE.map((item, index) => {
                      return (
                        <CheckBoxItem key={index} label={item} group="role" />
                      );
                    })}
                  </View>
                  <Divider />
                  <View style={styles.modalCheckBoxGroup}>
                    {SKILL_TARGET.map((item, index) => {
                      return (
                        <CheckBoxItem key={index} label={item} group="target" />
                      );
                    })}
                  </View>
                  <Divider />
                  <Button
                    mode={'contained-tonal'}
                    style={{width: '30%', alignSelf: 'center', margin: 10}}
                    onPress={() => {
                      console.log('Submit Pressed');
                      setModalVisible(false);
                    }}
                  >
                    Submit
                  </Button>
                </View>
              )}
            </Formik>
          </View>
        </View>
      </Modal>
    </View>
  );
}
