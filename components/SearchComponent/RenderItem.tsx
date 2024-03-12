import {View, TouchableHighlight, Text, Image, StyleSheet} from 'react-native';
// @ts-ignore
import Dummyimage from '../../assets/images/hisamecchi.png';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../redux/store';
import {stat, styleData, chipDetails, createStat} from '../../redux/dataType';
import {Add, ChangeBooster} from '../../redux/reducers/teamDraft';
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
  slot?: number;
  dp: number;
  hp: number;
  str: number;
  dex: number;
  con: number;
  spr: number;
  wis: number;
  lck: number;
};

export default function RenderItem(input: props) {
  const theme = useTheme();
  const image = useSelector((state: RootState) => state.styleData.image);
  const index = input.index;
  const {id, name, type, detail, slot, hp, dp, str, dex, con, spr, wis, lck} =
    input.item;
  const nav = useNavigation();
  const dispatch = useDispatch();
  const handleSelect = () => {
    switch (type) {
      case 'booster':
        const booster = {id: id, name: name, slot: slot, chipDetails: {}};
        const stat = createStat(dp, hp, str, dex, con, spr, wis, lck);
        dispatch(ChangeBooster({index: index, booster: booster, stat: stat}));
    }
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
