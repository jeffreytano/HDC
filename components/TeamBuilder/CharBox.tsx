import {
  TextInput,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
} from 'react-native';
import {Link, useRouter} from 'expo-router';

export default function Charbox() {
  const router = useRouter();
  return (
    <View
      style={{
        backgroundColor: '#bbb',
        flex: 1,
        flexDirection: 'row',
        // height: 125,
        width: '100%',
        borderColor: 'lightblue',
        borderWidth: 1,
      }}
    >
      <TouchableHighlight
        style={{
          aspectRatio: 1 / 1,
          backgroundColor: 'orange',
          borderWidth: 1,
          // flex: 1,
          borderColor: 'lightblue',
        }}
        onPress={() => {
          console.log('icon pressed');
          router.push('/Search/1');
        }}
      >
        <Text>Icon</Text>
      </TouchableHighlight>
      <View
        style={{
          // aspectRatio: 1 / 1,

          backgroundColor: 'yellow',
          borderWidth: 1,
          borderColor: 'lightblue',
          flex: 3,
        }}
      >
        <Text>Name</Text>
        <Text>Style</Text>
      </View>
      <View
        style={{
          // aspectRatio: 1 / 1,
          backgroundColor: 'green',
          borderWidth: 1,
          borderColor: 'lightblue',
          flex: 1,
        }}
      >
        <Text>Char manage</Text>
      </View>
    </View>
  );
}
