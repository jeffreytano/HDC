import {StyleSheet, Pressable, ScrollView} from 'react-native';
import {Text, View} from '../../components/Themed';
import {Button, Checkbox, Divider} from 'react-native-paper';
import {
  INI_DAMAGEBUFF,
  INI_DEFBUFF,
  INI_DAMAGEDEBUFF,
  INI_DEFDEBUFF,
} from '../../redux/constants/dataConstant';
import {useTheme} from '@react-navigation/native';
import {useState} from 'react';
import {useNavigation} from 'expo-router';

export default function FilterPage() {
  const skillEffect = {
    damageBuff: INI_DAMAGEBUFF,
    defendBuff: INI_DEFBUFF,
    damageDebuff: INI_DAMAGEDEBUFF,
    defendDebuff: INI_DEFDEBUFF,
  };

  const [isSPFocus, setIsSPFocus] = useState(false);
  const [damageBuff, setDamageBuff] = useState(INI_DAMAGEBUFF);
  const [defendBuff, setDefendBuff] = useState(INI_DEFBUFF);
  const [damageDebuff, setDamageDebuff] = useState(INI_DAMAGEDEBUFF);
  const [defendDebuff, setDefendDebuff] = useState(INI_DEFDEBUFF);
  const nav = useNavigation();
  const theme = useTheme();
  const styles = StyleSheet.create({
    container: {
      backgroundColor: theme.dark ? '#121212' : '#FFFFFF',
    },
    GroupContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      margin: 5,
    },
    checkbox: {
      margin: 10,
    },
    dropdownContainer: {
      backgroundColor: theme.dark ? '#323232' : '#FFFFFF',
    },
    dropdownListContainer: {
      backgroundColor: theme.dark ? '#323232' : '#CCCCCC',
      margin: 10,
      width: '18%',
    },
    text: {
      color: theme.dark ? '#FFFFFF' : '#000000',
    },
    dropdownPlaceholderText: {
      paddingHorizontal: 10,
      color: theme.dark ? '#FFFFFF' : '#000000',
    },
  });

  const handleExFilterChange = <T extends keyof typeof skillEffect>(
    name: string,
    group: T,
  ) => {
    switch (group) {
      case 'damageBuff':
        setDamageBuff((oldValue: any) => {
          const newValue: typeof oldValue = {...oldValue};
          newValue[name] = !newValue[name];
          return newValue;
        });
        break;
      case 'defendBuff':
        setDefendBuff((oldValue: any) => {
          const newValue: typeof oldValue = {...oldValue};
          newValue[name] = !newValue[name];
          return newValue;
        });
        break;
      case 'damageDebuff':
        setDamageDebuff((oldValue: any) => {
          const newValue: typeof oldValue = {...oldValue};
          newValue[name] = !newValue[name];
          return newValue;
        });
        break;
      case 'defendDebuff':
        setDefendDebuff((oldValue: any) => {
          const newValue: typeof oldValue = {...oldValue};
          newValue[name] = !newValue[name];
          return newValue;
        });
        break;
    }
  };

  return (
    <>
      <ScrollView style={styles.container}>
        <Text style={[styles.text, {margin: 10, alignSelf: 'center'}]}>
          スキル効果
        </Text>
        <Divider />
        <View style={styles.GroupContainer}>
          {Object.entries(damageBuff).map(([name, checked], index) => (
            <Pressable
              key={index}
              onPress={() => handleExFilterChange(name, 'damageBuff')}
            >
              <View style={{flexDirection: 'row'}}>
                <Checkbox
                  status={checked ? 'checked' : 'unchecked'}
                  // style={styles.checkbox}
                  color={theme.dark ? '#B794F6' : '#2E2E2D'}
                />
                <Text style={{alignSelf: 'center'}}>{name}</Text>
              </View>
            </Pressable>
          ))}
        </View>
        <Divider />
        <View style={styles.GroupContainer}>
          {Object.entries(defendBuff).map(([name, checked], index) => (
            <Pressable
              key={index}
              onPress={() => handleExFilterChange(name, 'defendBuff')}
            >
              <View style={{flexDirection: 'row'}}>
                <Checkbox
                  status={checked ? 'checked' : 'unchecked'}
                  // style={styles.checkbox}
                  color={theme.dark ? '#B794F6' : '#2E2E2D'}
                />
                <Text style={{alignSelf: 'center'}}>{name}</Text>
              </View>
            </Pressable>
          ))}
        </View>
        <Divider />
        <View style={styles.GroupContainer}>
          {Object.entries(damageDebuff).map(([name, checked], index) => (
            <Pressable
              key={index}
              onPress={() => handleExFilterChange(name, 'damageDebuff')}
            >
              <View style={{flexDirection: 'row'}}>
                <Checkbox
                  status={checked ? 'checked' : 'unchecked'}
                  // style={styles.checkbox}
                  color={theme.dark ? '#B794F6' : '#2E2E2D'}
                />
                <Text style={{alignSelf: 'center'}}>{name}</Text>
              </View>
            </Pressable>
          ))}
        </View>
        <Divider />
        <View style={styles.GroupContainer}>
          {Object.entries(defendDebuff).map(([name, checked], index) => (
            <Pressable
              key={index}
              onPress={() => handleExFilterChange(name, 'defendDebuff')}
            >
              <View style={{flexDirection: 'row'}}>
                <Checkbox
                  status={checked ? 'checked' : 'unchecked'}
                  // style={styles.checkbox}
                  color={theme.dark ? '#B794F6' : '#2E2E2D'}
                />
                <Text style={{alignSelf: 'center'}}>{name}</Text>
              </View>
            </Pressable>
          ))}
        </View>
        <Divider />
        <Button
          mode={'contained-tonal'}
          style={{width: '30%', alignSelf: 'center', margin: 10}}
          onPress={() => {
            console.log('close');
            nav.goBack();
          }}
        >
          Submit
        </Button>
      </ScrollView>
    </>
  );
}
