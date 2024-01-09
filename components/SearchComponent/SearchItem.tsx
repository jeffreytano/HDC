import {View, TouchableHighlight, Text, Image} from 'react-native';
// @ts-ignore
import Dummyimage from '../../assets/images/hisamecchi.png';

type props = {
  StyleID: number;
};

export default function SearchItem(input: props) {
  return (
    <TouchableHighlight
      style={{borderColor: 'lightgreen', borderWidth: 1}}
      onPress={() => {
        console.log(input.StyleID);
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
          {'chName'}
          {'\t\t'}
          {'rarity'}
          {'\n'}
          {'styleName'}
        </Text>
      </View>
    </TouchableHighlight>
  );
}
