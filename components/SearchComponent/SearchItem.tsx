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
    Sid: style.Sid,
    rarity: style.rarity,
    styleName: style.styleName,
    charName: style.name,
    Cid: style.Cid,
    statType: style.statType,
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
      height: 130,
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
            styleImage[style.Sid] ? {uri: styleImage[style.Sid]} : Dummyimage
          }
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
          {style.name}
          {'\t\t'}
          {style.rarity == 'Free' ? 'SS' : style.rarity}
          {'\t\t'}
          {style.Sid}
          {'\n'}
          {style.styleName} {'\n'}
          {style.SPusage ? '[SP消費 ' + style.SPusage + ']' : ''}
          {style.SPequal ? '\t[' + style.SPequal + ' SP相当]' : ''}
          {'\n'}
          {style.skill}
        </Text>
      </View>
    </TouchableHighlight>
  );
}
