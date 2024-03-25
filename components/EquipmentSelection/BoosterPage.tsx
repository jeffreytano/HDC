import {Text, View} from '../../components/Themed';
import {useEffect, useState} from 'react';
import {Button, Icon, IconButton, SegmentedButtons} from 'react-native-paper';
import {router, useLocalSearchParams} from 'expo-router';
import {StyleSheet, Image, TouchableHighlight} from 'react-native';
import {useSelector} from 'react-redux';
import {RootState} from '../../redux/store';
// @ts-ignore
import dummyimage from '../../assets/images/hisamecchi.png';
import {Dropdown} from 'react-native-element-dropdown';
import {useTheme} from '@react-navigation/native';
import Stat from '../../components/TeamBuilder/Stat';
import {
  boosterDataType,
  boosterSet,
  statModifier,
  createStat,
} from '../../redux/dataType';
import {useDispatch} from 'react-redux';
import {ScrollView} from 'react-native-gesture-handler';
import {ChangeBooster, ChangeChips} from '../../redux/reducers/teamDraft';
import chipsData from '../../assets/chips.json';
import {DEFAULT_STAT} from '../../redux/constants/dataConstant';

type chipItem = {
  id: string;
  name: string;
  dp: number;
  hp: number;
  str: number;
  dex: number;
  con: number;
  spr: number;
  wis: number;
  lck: number;
};

const chipSheet = (JSON.parse(chipsData) as Array<chipItem>).reverse();

export default function BoosterPage({index}: {index: number}) {
  const dispatch = useDispatch();
  const chip = useSelector(
    (state: RootState) => state.teamDraft.BoosterSet[index].chips,
  );
  console.log(chip);
  const [isFocus, setIsFocus] = useState(false);
  const itemList = chipSheet.map((value: chipItem) => {
    return {label: value.name, value: value.id};
  });
  const handleValueChange = (chipIndex: number, value: any) => {
    const selected = chipSheet.find((item) => item.name == value.label);
    console.log('finish selecting');
    if (selected) {
      console.log('selected', selected);
      const stat = createStat(
        selected.dp,
        selected.hp,
        selected.str,
        selected.dex,
        selected.con,
        selected.spr,
        selected.wis,
        selected.lck,
      );
      dispatch(
        ChangeChips({
          index: index,
          chipIndex: chipIndex,
          chipId: selected.id,
          chipName: selected.name,
          stat: stat,
        }),
      );
      console.log('finish dispatching');
    } else {
      console.log('failed to find chip');
    }

    setIsFocus(false);
  };
  const booster = useSelector(
    (state: RootState) => state.teamDraft.BoosterSet[index],
  );
  const chipArray = Array.from({length: booster.slot});
  const statMod = useSelector(
    (state: RootState) => state.teamDraft.StatModifier[index],
  );
  const theme = useTheme();
  const styles = StyleSheet.create({
    segmentButton: {
      backgroundColor: '#FFFFFF',
    },
    border: {
      borderColor: theme.dark ? '#757575' : 'lightblue',
      borderWidth: 1,
    },
    dropdownContainer: {
      backgroundColor: theme.dark ? '#323232' : '#FFFFFF',
    },
    dropdownListContainer: {
      backgroundColor: theme.dark ? '#323232' : '#FFFFFF',
      width: '80%',
    },
    text: {
      // paddingHorizontal: 10,
      color: theme.dark ? '#FFFFFF' : '#000000',
    },
    iconColor: {
      color: theme.dark ? '#FFFFFF' : '#000000',
    },
    buttonContainer: {
      width: '40%',
      flexDirection: 'row',
      paddingHorizontal: 20,
    },
    indicator: {
      color: theme.dark ? '#FFFFFF' : '#000000',
      padding: 10,
    },
  });
  return (
    <ScrollView style={{paddingVertical: 15}}>
      <Stat
        raw={false}
        stat={createStat(
          statMod.booster.dp,
          statMod.booster.hp,
          statMod.booster.strength,
          statMod.booster.dexterity,
          statMod.booster.constitution,
          statMod.booster.spirit,
          statMod.booster.witness,
          statMod.booster.luck,
        )}
      />
      <TouchableHighlight
        onPress={() => {
          router.push({
            pathname: '/itemSearchStack/[item]',
            params: {item: 'booster', targetIndex: index.toString()},
          });
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            marginVertical: 20,
            paddingHorizontal: 30,
            paddingTop: 10,
            paddingBottom: 5,
            borderColor: theme.dark ? '#757575' : 'lightblue',
            borderWidth: 1,
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
          <Text style={[styles.text, {padding: 20}]}>
            {booster.name == 'None' ? 'Tap to select booster' : booster.name}
            {'\n'}
          </Text>
          <IconButton
            icon="close-circle-outline"
            iconColor={theme.dark ? '#FFFFFF' : '#000000'}
            style={{alignSelf: 'center'}}
            size={36}
            onPress={(event) => {
              dispatch(
                ChangeBooster({
                  index: index,
                  booster: {id: '-1', name: 'None'},
                  stat: DEFAULT_STAT,
                }),
              );
            }}
          ></IconButton>
        </View>
      </TouchableHighlight>
      {chipArray.map((item, chipIndex) => {
        const selectedChip = {
          label: chip[chipIndex].name,
          value: chip[chipIndex].id,
        };
        return (
          <View
            key={chipIndex}
            style={{
              flexDirection: 'column',
              padding: 15,
            }}
          >
            <View style={{flexDirection: 'row'}}>
              <Dropdown
                dropdownPosition="top"
                placeholder="selected"
                activeColor={theme.dark ? '#B794F6' : '#00BFA5'}
                selectedTextStyle={styles.text}
                placeholderStyle={styles.text}
                // selectedStyle={styles.dropdownContainer}r
                style={[
                  styles.dropdownListContainer,
                  isFocus && {borderColor: 'blue'},
                ]}
                containerStyle={styles.dropdownContainer}
                itemTextStyle={styles.text}
                onChange={(item: {label: string; value: string}) => {
                  handleValueChange(chipIndex, item);
                }}
                onFocus={() => setIsFocus(true)}
                value={selectedChip}
                data={itemList}
                labelField={'label'}
                valueField={'value'}
              />
            </View>
            {/* <IconButton
            icon="minus-thick"
            iconColor={theme.dark ? '#FFFFFF' : '#000000'}
            size={16}
            onPress={(event) => removePerk(index)}
          ></IconButton> */}
          </View>
        );
      })}
    </ScrollView>
  );
}
