import {
  TextInput,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
} from 'react-native';
import Charbox from './CharBox';

export default function TeamBox() {
  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <Charbox></Charbox>
      <Charbox></Charbox>
      <Charbox></Charbox>
      <Charbox></Charbox>
      <Charbox></Charbox>
      <Charbox></Charbox>
    </View>
  );
}
