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
  slotId: string;
  style: styleData;
};

export default function SearchItem(input: props) {
  const theme = useTheme();
  const styleImage = useSelector((state: RootState) => state.styleData.image);
  const {slotId, style} = input;
  const nav = useNavigation();
  const dispatch = useDispatch();
  const TeamMember = {
    ...DEFAULT_MEMBER,
    styleID: style.Sid,
    rarity: style.rarity,
    styleName: style.styleName,
    charName: style.name,
    charID: style.Cid,
  };
  const handleSelect = (slotId: string) => {
    console.log('inserting ', TeamMember.styleName, 'into slot', slotId);
    const payload = {
      index: parseInt(slotId),
      teamMember: TeamMember,
    };
    dispatch(Add(payload));
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
        handleSelect(slotId);
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
          source={
            styleImage[input.style.Sid]
              ? {uri: styleImage[input.style.Sid]}
              : Dummyimage
          }
        />
        <Text
          style={[
            styles.text,
            {
              marginHorizontal: 10,
            },
          ]}
        >
          {input.style.name}
          {'\t\t'}
          {input.style.rarity}
          {'\n'}
          {input.style.styleName} {'\n'}
          {input.style.Sid}
        </Text>
      </View>
    </TouchableHighlight>
  );
}
