import React, {useState} from 'react';
import RNPickerSelect from 'react-native-picker-select';

type props = {
  min: number;
  max: number;
  valueType: string;
};

export default function ValuePicker(input: props) {
  const {min, max, valueType} = input;
  const [selectedValue, setSelectedValue] = useState(min);
  const valueList = [...Array(max)].map((_, index) => index + 1);
  const itemList = valueList.map((value: number) => {
    return {label: value.toString(), value: value};
  });
  const handleValueChange = (value: number) => {
    setSelectedValue(value);
  };

  return (
    <>
      <RNPickerSelect
        value={selectedValue}
        onValueChange={handleValueChange}
        items={itemList}
      />
    </>
  );
}
