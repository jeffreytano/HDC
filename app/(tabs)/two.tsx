import {StyleSheet} from 'react-native';

import EditScreenInfo from '../../components/EditScreenInfo';
import {Text, View} from '../../components/Themed';
import {useState} from 'react';
import axios from 'axios';
import {Button, Group, Separator, XGroup, YGroup, YStack} from 'tamagui';

const apiKey = 'AIzaSyANMJLnH3Cud73QuWp9STPk-lHJkPcsyic';
const sheetId = '1RvrHZCDgH2u__zwtKdpdRflERtWPKThJIzMgz8vKCAE';
const sheetName = 'HBRStyleData';
const range = 'A3:M10000';

const getStyleDataUrl = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${sheetName}!${range}?valueRenderOption=FORMATTED_VALUE&key=${apiKey}`;

export default function TabTwoScreen() {
  const [data, setData] = useState('');

  const handleButton = async () => {
    try {
      const res = await axios.get(getStyleDataUrl);
      const {data} = res;
      console.log(data);
      setData(data.values[8][4]);
    } catch (e) {
      console.log('error', e);
    }
    // const response = getGoogleSheet('HBRStyleData', 'A3:B4');
    // console.log(response);
    // setData(response[0][0]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{data}</Text>
      <YStack padding="$3" space="$2" alignItems="center">
        <Group orientation="horizontal">
          <Group.Item>
            <Button>First</Button>
          </Group.Item>
          <Group.Item>
            <Button>Second</Button>
          </Group.Item>
          <Group.Item>
            <Button>Third</Button>
          </Group.Item>
        </Group>
      </YStack>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <Button onPress={handleButton}>get googlesheet data</Button>
      <EditScreenInfo path="app/(tabs)/two.tsx" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
