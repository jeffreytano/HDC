import {useTheme} from '@react-navigation/native';
import React, {useState} from 'react';
import RNPickerSelect from 'react-native-picker-select';
import {Dropdown} from 'react-native-element-dropdown';
import {StyleSheet} from 'react-native';
import {useDispatch} from 'react-redux';
import {ChangeBooster} from '../../redux/reducers/teamDraft';

type props = {
  items: string[];
  index: number;
};

export default function ItemPicker(input: props) {
  const theme = useTheme();
  const dispatch = useDispatch();
  const {items} = input;
  const [selectedValue, setSelectedValue] = useState('');
  const [isFocus, setIsFocus] = useState(false);
  const itemList = items.map((value: string) => {
    return {label: value, value: value};
  });
  const handleValueChange = (value: string) => {
    setSelectedValue(value);
    // dispatch(ChangeBooster({booster: value}));
    setIsFocus(false);
  };

  const styles = StyleSheet.create({
    dropdownContainer: {
      backgroundColor: theme.dark ? '#323232' : '#FFFFFF',
    },
    dropdownListContainer: {
      backgroundColor: theme.dark ? '#323232' : '#FFFFFF',
    },
    dropdownItemText: {
      color: theme.dark ? '#FFFFFF' : '#000000',
    },
  });

  return (
    <>
      <Dropdown
        placeholder="Booster"
        activeColor={theme.dark ? '#B794F6' : '#00BFA5'}
        selectedTextStyle={styles.dropdownItemText}
        placeholderStyle={styles.dropdownItemText}
        selectedStyle={styles.dropdownContainer}
        style={[styles.dropdownListContainer, isFocus && {borderColor: 'blue'}]}
        containerStyle={styles.dropdownContainer}
        itemTextStyle={styles.dropdownItemText}
        onChange={handleValueChange}
        onFocus={() => setIsFocus(true)}
        value={selectedValue}
        //@ts-ignore
        data={itemList}
        //@ts-ignore
        labelField={'label'}
        //@ts-ignore
        valueField={'value'}
      />
    </>
  );
}
