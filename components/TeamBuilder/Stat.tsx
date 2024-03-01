import {StyleSheet, Text, View} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {stat} from '../../redux/dataType';
import {boosterSet} from '../../redux/dataType';
import {useState} from 'react';

type props = {
  stat?: stat;
  boosterSet?: boosterSet;
  raw?: boolean;
};

export default function Stat(input: props) {
  // const stat = [999, 2, 3, 4, 5, 6];
  const {boosterSet, raw, stat} = input;
  const theme = useTheme();
  const [boosterStat, setBoosterStat] = useState<stat>({
    dp: 0,
    hp: 0,
    power: 0,
    agility: 0,
    physical: 0,
    mental: 0,
    witness: 0,
    luck: 0,
  });

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

  const TextBox = ({
    title,
    raw = true,
    stat,
  }: {
    title: string;
    raw?: boolean;
    stat: string;
  }) => {
    return (
      <View style={{flexDirection: 'row', flex: 1}}>
        <Text style={[styles.text]}>{title}</Text>
        <Text style={styles.text}>
          {'\t'}
          {raw ? null : '+'}
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
          raw={raw}
          stat={stat ? stat.dp.toString() : boosterStat.dp.toString()}
        ></TextBox>
        <TextBox
          title="　　力"
          raw={raw}
          stat={stat ? stat.power.toString() : boosterStat.power.toString()}
        ></TextBox>
        <TextBox
          title="　体力"
          raw={raw}
          stat={
            stat ? stat.physical.toString() : boosterStat.physical.toString()
          }
        ></TextBox>
        <TextBox
          title="　知性"
          raw={raw}
          stat={stat ? stat.witness.toString() : boosterStat.witness.toString()}
        ></TextBox>
      </View>
      <View style={styles.textBox}>
        <TextBox
          title="　ＨＰ"
          raw={raw}
          stat={stat ? stat.hp.toString() : boosterStat.hp.toString()}
        ></TextBox>
        <TextBox
          title="器用さ"
          raw={raw}
          stat={stat ? stat.agility.toString() : boosterStat.agility.toString()}
        ></TextBox>
        <TextBox
          title="　精神"
          raw={raw}
          stat={stat ? stat.mental.toString() : boosterStat.mental.toString()}
        ></TextBox>
        <TextBox
          title="　　運"
          raw={raw}
          stat={stat ? stat.luck.toString() : boosterStat.luck.toString()}
        ></TextBox>
      </View>
    </View>
  );
}
