import {Text, View} from '../../components/Themed';
import {useEffect, useState} from 'react';
import {Button, IconButton, SegmentedButtons} from 'react-native-paper';
import {router, useLocalSearchParams} from 'expo-router';
import {StyleSheet, Image, TouchableHighlight} from 'react-native';
import {useSelector} from 'react-redux';
import {RootState} from '../../redux/store';
// @ts-ignore
import dummyimage from '../../assets/images/hisamecchi.png';
import {useTheme} from '@react-navigation/native';
import Stat from '../../components/TeamBuilder/Stat';
import {boosterSet} from '../../redux/dataType';
import ChipItem from '../TeamBuilder/ChipItem';
export default function BoosterPage({index}: {index: number}) {
  const defaultPerk = {
    stat: 'none',
    amount: 0,
  };
  type Perk = {
    stat: string;
    amount: number;
  };
  const [perks, setPerks] = useState<Perk[]>([defaultPerk]);
  const booster = useSelector(
    (state: RootState) => state.teamDraft.BoosterSet[index],
  );
  const theme = useTheme();
  const styles = StyleSheet.create({
    segmentButton: {
      backgroundColor: '#FFFFFF',
    },
    text: {
      color: theme.dark ? '#FFFFFF' : '#000000',
    },
    border: {
      borderColor: theme.dark ? '#757575' : 'lightblue',
      borderWidth: 1,
    },
  });
  return (
    <View style={{paddingVertical: 15}}>
      <Stat raw={false} />
      <TouchableHighlight
        onPress={() => {
          router.push({
            pathname: '/itemSearchStack/[item]',
            params: {item: 'booster', index: index.toString()},
          });
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            marginVertical: 20,
            paddingHorizontal: 30,
          }}
        >
          <Image
            style={{
              aspectRatio: 1 / 1,
              width: 70,
              height: 70,
              resizeMode: 'contain',
            }}
            source={dummyimage}
          />
          <Text style={styles.text}>
            {booster ? booster.booster : 'select booster'}
          </Text>
        </View>
      </TouchableHighlight>
      {/* {perks.map((item, index) => (
        <View key={index} style={{flexDirection: 'row'}}>
          <ChipItem
            index={index}
            items={['B1', 'B2', 'B3']}
            max={maxChip}
            handleChipChange={handleChipChange}
            total={chipNumber}
          ></ChipItem>
          <IconButtonButton
            icon="minus-thick"
            iconColor={theme.dark ? '#FFFFFF' : '#000000'}
            size={16}
            onPress={(event) => removePerk(index)}
          ></IconButton>
        </View>
      ))} */}
    </View>
  );
}
