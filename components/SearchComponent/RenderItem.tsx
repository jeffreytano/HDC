import {View, TouchableHighlight, Text, Image, StyleSheet} from 'react-native';
// @ts-ignore
import Dummyimage from '../../assets/images/hisamecchi.png';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../redux/store';
import {styleData} from '../../redux/dataType';
import {Add} from '../../redux/reducers/teamDraft';
import {DEFAULT_MEMBER} from '../../redux/constants/dataConstant';
import {useNavigation} from 'expo-router';
import {useTheme} from '@react-navigation/native';

type props = {
  index: number;
  item: item;
};

type item = {
  type: string;
  id: number;
  name: string;
  detail: string;
};

export default function RenderItem(input: props) {
  const theme = useTheme();
  const image = useSelector((state: RootState) => state.styleData.image);
  const index = input.index;
  const {id, name, detail} = input.item;
  console.log(name);
  console.log(detail);
  const nav = useNavigation();
  const dispatch = useDispatch();
  const handleSelect = () => {
    console.log('inserting');
    nav.goBack();
  };

  const styles = StyleSheet.create({
    container: {
      backgroundColor: theme.dark ? '#573E7C' : '#FFFFFF',
      borderColor: theme.dark ? '#2A0069' : 'lightblue',
      borderWidth: theme.dark ? 3 : 1,
      padding: 10,
      height: 125,
      flexDirection: 'row',
      marginVertical: 1,
      // marginHorizontal: 4,
    },
    text: {
      color: theme.dark ? '#FFFFFF' : '#000000',
    },
  });

  return (
    <TouchableHighlight
      // style={{borderColor: 'lightgreen', borderWidth: 1}}
      onPress={() => {
        handleSelect();
      }}
    >
      <View style={styles.container}>
        <Image
          style={{
            aspectRatio: 1 / 1,
            width: 105,
            height: 105,
            resizeMode: 'contain',
          }}
          source={Dummyimage}
        />
        <Text
          style={[
            styles.text,
            {
              marginHorizontal: 10,
              flex: 1,
            },
          ]}
        >
          {name}
          {'\n'}
          {detail}
        </Text>
      </View>
    </TouchableHighlight>
  );
}
