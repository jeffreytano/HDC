import {View, TouchableHighlight, Text, Image} from 'react-native';
// @ts-ignore
import Dummyimage from '../../assets/images/hisamecchi.png';
import {useSelector} from 'react-redux';
import {RootState} from '../../redux/store';
import {StyleData} from '../../redux/dataType';

type props = {
  style: StyleData;
};

export default function SearchItem(input: props) {
  return (
    <TouchableHighlight
      style={{borderColor: 'lightgreen', borderWidth: 1}}
      onPress={() => {
        console.log(input.style.id);
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
          {'charName'}
          {'\t\t'}
          {input.style.rarity}
          {'\n'}
          {input.style.styleName}
        </Text>
      </View>
    </TouchableHighlight>
  );
}
