import {View, TouchableHighlight, Text, Image} from 'react-native';
// @ts-ignore
import Dummyimage from '../../assets/images/hisamecchi.png';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../redux/store';
import {StyleData} from '../../redux/dataType';
import {Add} from '../../redux/reducers/teamDraft';
import {DEFAULT_MEMBER} from '../../redux/constants/dataConstant';
import {useNavigation} from 'expo-router';

type props = {
  slotId: string;
  style: StyleData;
};

export default function SearchItem(input: props) {
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

  return (
    <TouchableHighlight
      style={{borderColor: 'lightgreen', borderWidth: 1}}
      onPress={() => {
        handleSelect(slotId);
      }}
    >
      <View
        style={{
          backgroundColor: '#CCCCCC',
          padding: 10,
          height: 125,
          // marginVertical: 2,
          // marginHorizontal: 4,
          flexDirection: 'row',
        }}
      >
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
          style={{
            marginHorizontal: 10,
          }}
        >
          {input.style.name}
          {'\t\t'}
          {input.style.rarity}
          {'\n'}
          {input.style.styleName}
        </Text>
      </View>
    </TouchableHighlight>
  );
}
