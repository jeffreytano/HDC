import React, {useState} from 'react';
import RNPickerSelect from 'react-native-picker-select';
import {Dropdown} from 'react-native-element-dropdown';
import {useTheme} from '@react-navigation/native';
import {StyleSheet, Pressable, View, View as DefaultView} from 'react-native';
import {IconButton, Text} from 'react-native-paper';
import {useSelector, useDispatch} from 'react-redux';
import {chipDetails, createStat} from '../../redux/dataType';
import {RootState} from '../../redux/store';
import {ChangeChips} from '../../redux/reducers/teamDraft';
import Layout from '../../app/itemSearchStack/_layout';
import chipsData from '../../assets/chips.json';

type props = {
  // items: chipItem[];
  index: number;
  // max: number;
  chipIndex: number;
  // handleChipChange: (number: number) => void;
  // total: number;
};

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

export default function ChipItem(input: props) {
  const dispatch = useDispatch();
  const theme = useTheme();
  const {index, chipIndex} = input;
  const chip = useSelector(
    (state: RootState) => state.teamDraft.BoosterSet[index].chips,
  );
  console.log(chip[chipIndex]);
  const [selectedItem, setSelectedItem] = useState({
    label: chip[chipIndex].name,
    value: chip[chipIndex].id,
  });
  const [isFocus, setIsFocus] = useState(false);
  const itemList = chipSheet.map((value: chipItem) => {
    return {label: value.name, value: value.id};
  });
  const handleValueChange = (value: any) => {
    setSelectedItem(value);
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

  // const handleAmountIncrement = () => {
  //   if (amount < max && total != max) {
  //     setAmount(amount + 1);
  //     handleChipChange(1);
  //   }
  // };

  // const handleAmountDecrement = () => {
  //   if (amount > 0) {
  //     setAmount(amount - 1);
  //     handleChipChange(-1);
  //   }
  // };

  const styles = StyleSheet.create({
    dropdownContainer: {
      backgroundColor: theme.dark ? '#323232' : '#FFFFFF',
    },
    dropdownListContainer: {
      backgroundColor: theme.dark ? '#323232' : '#FFFFFF',
      width: '75%',
    },
    text: {
      paddingHorizontal: 10,
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
    <View style={{flexDirection: 'row'}}>
      <Dropdown
        dropdownPosition="top"
        placeholder="selected"
        activeColor={theme.dark ? '#B794F6' : '#00BFA5'}
        selectedTextStyle={styles.text}
        placeholderStyle={styles.text}
        // selectedStyle={styles.dropdownContainer}r
        style={[styles.dropdownListContainer, isFocus && {borderColor: 'blue'}]}
        containerStyle={styles.dropdownContainer}
        itemTextStyle={styles.text}
        onChange={handleValueChange}
        onFocus={() => setIsFocus(true)}
        value={selectedItem}
        //@ts-ignore
        data={itemList}
        //@ts-ignore
        labelField={'label'}
        //@ts-ignore
        valueField={'value'}
      />
    </View>
  );
}
