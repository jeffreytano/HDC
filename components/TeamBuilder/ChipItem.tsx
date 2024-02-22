import React, {useState} from 'react';
import RNPickerSelect from 'react-native-picker-select';
import {Dropdown} from 'react-native-element-dropdown';
import {useTheme} from '@react-navigation/native';
import {StyleSheet, Pressable, View} from 'react-native';
import {IconButton, Text} from 'react-native-paper';

type props = {
  items: string[];
  max: number;
  index: number;
};

export default function ChipItem(input: props) {
  const theme = useTheme();
  const {max, items, index} = input;
  const [amount, setAmount] = useState(0);
  const [selectedItem, setSelectedItem] = useState('');
  const [isFocus, setIsFocus] = useState(false);
  const itemList = items.map((value: string) => {
    return {label: value, value: value};
  });
  const handleValueChange = (value: string) => {
    setSelectedItem(value);
    setIsFocus(false);
  };

  const handleAmountIncrement = () => {
    if (amount < max) {
      setAmount(amount + 1);
      const stat = selectedItem;
    }
  };

  const handleAmountDecrement = () => {
    if (amount > 0) {
      setAmount(amount - 1);
      const stat = selectedItem;
    }
  };

  const styles = StyleSheet.create({
    dropdownContainer: {
      backgroundColor: theme.dark ? '#323232' : '#FFFFFF',
    },
    dropdownListContainer: {
      backgroundColor: theme.dark ? '#323232' : '#FFFFFF',
      width: '40%',
    },
    text: {
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
        placeholder="selected"
        activeColor={theme.dark ? '#B794F6' : '#00BFA5'}
        selectedTextStyle={styles.text}
        placeholderStyle={styles.text}
        selectedStyle={styles.dropdownContainer}
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
      <View style={styles.buttonContainer}>
        <IconButton
          icon="numeric-negative-1"
          iconColor={theme.dark ? '#FFFFFF' : '#000000'}
          size={20}
          onPress={handleAmountDecrement}
        />
        <Text variant="bodyLarge" style={styles.indicator}>
          {amount}
        </Text>
        <IconButton
          icon="numeric-positive-1"
          iconColor={theme.dark ? '#FFFFFF' : '#000000'}
          size={20}
          onPress={handleAmountIncrement}
        />
      </View>
    </View>
  );
}
