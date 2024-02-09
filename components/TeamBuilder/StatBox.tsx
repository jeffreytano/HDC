import {StyleSheet, Text, View} from 'react-native';
import {useTheme} from '@react-navigation/native';

type props = {
  Stat?: number[];
};

export default function Stat(input: props) {
  // const stat = [999, 2, 3, 4, 5, 6];
  const stat = input.Stat;
  const theme = useTheme();

  const styles = StyleSheet.create({
    container: {
      margin: 2,
    },
    text: {
      color: theme.dark ? '#FFFFFF' : '#000000',
    },
    border: {
      borderColor: theme.dark ? '#757575' : 'lightblue',
      borderWidth: 1,
    },
    textBox: {
      justifyContent: 'space-between',
      flexDirection: 'row',
    },
  });

  const TextBox = ({title, stat}: {title: string; stat: string}) => {
    return (
      <View style={{flexDirection: 'row', flex: 1}}>
        <Text style={[styles.text]}>{title}</Text>
        <Text style={styles.text}>
          {'\t'}
          {stat}
        </Text>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      {/* <View style={styles.textBox}>
        <TextBox
          title="　ＤＰ"
          stat={stat ? ([0] ? stat[0].toString() : '0') : '999'}
        ></TextBox>
        <TextBox
          title="　ＨＰ"
          stat={stat ? ([0] ? stat[0].toString() : '0') : '999'}
        ></TextBox>
        <View style={{flex: 1}}></View>
      </View> */}
      <View style={styles.textBox}>
        <TextBox
          title="　ＤＰ"
          stat={stat ? ([0] ? stat[0].toString() : '0') : '1199'}
        ></TextBox>
        <TextBox
          title="　　力"
          stat={stat ? ([0] ? stat[2].toString() : '0') : '999'}
        ></TextBox>
        <TextBox
          title="　体力"
          stat={stat ? ([0] ? stat[4].toString() : '0') : '999'}
        ></TextBox>
        <TextBox
          title="　知性"
          stat={stat ? ([0] ? stat[6].toString() : '0') : '999'}
        ></TextBox>
      </View>
      <View style={styles.textBox}>
        <TextBox
          title="　ＨＰ"
          stat={stat ? ([0] ? stat[1].toString() : '0') : '1999'}
        ></TextBox>
        <TextBox
          title="器用さ"
          stat={stat ? ([0] ? stat[3].toString() : '0') : '999'}
        ></TextBox>
        <TextBox
          title="　精神"
          stat={stat ? ([0] ? stat[5].toString() : '0') : '999'}
        ></TextBox>
        <TextBox
          title="　　運"
          stat={stat ? ([0] ? stat[7].toString() : '0') : '999'}
        ></TextBox>
      </View>
    </View>
  );
}
