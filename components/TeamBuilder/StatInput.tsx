import React, {useState} from 'react';
import {TextInput, TextInputProps, StyleSheet} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {useSelector} from 'react-redux';

interface StatInputComponentProps extends TextInputProps {
  min: number;
  max: number;
}

const StatInput: React.FC<StatInputComponentProps> = ({
  style,
  min,
  max,
  onChangeText,
  onSubmitEditing,
  defaultValue,
  ...rest
}) => {
  //   const {style, min, max, onChangeText,...rest} = props;
  const [textValue, setValue] = useState(defaultValue);
  const theme = useTheme();
  const handleTextChange = (text: string) => {
    const numericValue = parseInt(text, 10);
    if (numericValue < min) setValue(min.toString());
    else if (numericValue > max) setValue(max.toString());
    else setValue(text);
    if (onChangeText) {
      onChangeText(text);
    }
  };

  const handleInputSubmit = () => {
    if (textValue == '') {
      setValue(min.toString());
    }
  };

  const styles = StyleSheet.create({
    input: {
      // Add your custom styles here
      backgroundColor: theme.dark ? '#353535' : '#D5D5D5',
      padding: 0,
      color: theme.dark ? '#FFFFFF' : '#000000',
      width: 20,
    },
  });

  return (
    <TextInput
      value={textValue}
      onChangeText={handleTextChange}
      onSubmitEditing={handleInputSubmit}
      style={[styles.input, style]}
      keyboardType="numeric"
      {...rest}
    />
  );
};

export default StatInput;
