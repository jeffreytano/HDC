import {
  ActivityIndicator,
  StyleSheet,
  TextComponent,
  Modal,
  TextInput,
  FlatList,
  ListRenderItemInfo,
  Pressable,
} from 'react-native';
import {Text, View} from '../../components/Themed';
import {Button, Checkbox, Divider} from 'react-native-paper';
import {
  CLASS,
  INI_CLASS,
  INI_ELEMENT,
  INI_RARITY,
  INI_ROLE,
  INI_SKILL_TARGET,
  INI_WEAPON,
} from '../../redux/constants/dataConstant';
import {useTheme} from '@react-navigation/native';
import {group} from '../../redux/dataType';
import {useState} from 'react';
import {useNavigation} from 'expo-router';

export default function FilterPage() {
  const FilterOption = {
    rarity: INI_RARITY,
    element: INI_ELEMENT,
    weapon: INI_WEAPON,
    class: INI_CLASS,
    role: INI_ROLE,
    target: INI_SKILL_TARGET,
    SP: -1,
    SPRange: 'All',
    SPequal: -1,
    SPequalRange: 'All',
    hit: -1,
    hitRange: 'All',
  };

  const [rarity, setRarity] = useState(INI_RARITY);
  const [element, setElement] = useState(INI_ELEMENT);
  const [weapon, setWeapon] = useState(INI_WEAPON);
  const [classes, setClasses] = useState(INI_CLASS);
  const [role, setRole] = useState(INI_ROLE);
  const [target, setTarget] = useState(INI_SKILL_TARGET);
  const nav = useNavigation();
  const theme = useTheme();
  const styles = StyleSheet.create({
    container: {
      backgroundColor: theme.dark ? '#121212' : '#FFFFFF',
    },
    TextBar: {
      // backgroundColor: theme.colors.primary,
      flex: 15,
      margin: 3,
      height: 40,
      paddingHorizontal: 20,
      borderColor: theme.dark ? '#B794F6' : '#2E2E2D',
      borderWidth: 1,
      color: theme.dark ? '#FFFFFF' : '#000000',
    },
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)', // semi-transparent background
    },
    modalContent: {
      backgroundColor: theme.dark ? '#222222' : '#FFFFFF', //6200EE
      padding: 12,
    },
    modalCheckBoxGroup: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      margin: 5,
    },
    checkbox: {
      margin: 10,
    },
  });

  const handleFilterFunction = (
    setter: (i: any) => void,
    // oldValue: any,
    subItem: Array<string>,
    onAll: boolean,
    target: string,
  ) => {
    if (target == 'All') {
      setter((oldValue: any) => {
        const newValue: typeof oldValue = {...oldValue};
        newValue['All'] = !onAll;
        subItem.map((rarity: string) => {
          newValue[rarity] = !onAll;
        });
        return newValue;
      });
    } else {
      setter((oldValue: any) => {
        const newValue: typeof oldValue = {...oldValue};
        newValue[target] = !oldValue[target];
        const allChecked = subItem
          .map((key: string) => {
            return newValue[key] == true;
          })
          .reduce((overall: boolean, current: boolean) => {
            return current && overall;
          });
        newValue['All'] = allChecked;
        return newValue;
      });
    }
  };

  const handleFilterChange = <T extends keyof typeof FilterOption>(
    name: string,
    group: T,
  ) => {
    switch (group) {
      case 'rarity':
        handleFilterFunction(
          setRarity,
          // rarity,
          ['A', 'S', 'SS'],
          rarity.All,
          name,
        );
        break;
      case 'class':
        handleFilterFunction(
          setClasses,
          // classes,
          ['31A', '31B', '31C', '31D', '31E', '31F', '31X', '30G', '31AB!'],
          classes.All,
          name,
        );
        break;
      case 'weapon':
        handleFilterFunction(
          setWeapon,
          // weapon,
          ['斬', '突', '打'],
          weapon.All,
          name,
        );
        break;
      case 'element':
        handleFilterFunction(
          setElement,
          // element,
          ['無', '火', '氷', '雷', '光', '闇'],
          element.All,
          name,
        );
        break;
      case 'role':
        handleFilterFunction(
          setRole,
          // role,
          [
            'Attacker',
            'Breaker',
            'Blaster',
            'Buffer',
            'Debuffer',
            'Defender',
            'Healer',
          ],
          role.All,
          name,
        );
        break;
      case 'target':
        handleFilterFunction(
          setTarget,
          // target,
          [
            '無',
            '単体',
            '全体',
            '味方前衛',
            '味方全体',
            '味方単体',
            '味方後衛',
          ],
          target.All,
          name,
        );
        break;
      default:
        return console.log('fell into default');
    }
  };

  return (
    <View>
      <View style={styles.modalCheckBoxGroup}>
        {Object.entries(rarity).map(([name, checked], index) => (
          <Pressable
            key={index}
            onPress={() => handleFilterChange(name, 'rarity')}
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
      <View style={styles.modalCheckBoxGroup}>
        {Object.entries(classes).map(([name, checked], index) => (
          <Pressable
            key={index}
            onPress={() => handleFilterChange(name, 'class')}
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
      <View style={styles.modalCheckBoxGroup}>
        {Object.entries(weapon).map(([name, checked], index) => (
          <Pressable
            key={index}
            onPress={() => handleFilterChange(name, 'weapon')}
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
      <View style={styles.modalCheckBoxGroup}>
        {Object.entries(element).map(([name, checked], index) => (
          <Pressable
            key={index}
            onPress={() => handleFilterChange(name, 'element')}
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
      <View style={styles.modalCheckBoxGroup}>
        {Object.entries(role).map(([name, checked], index) => (
          <Pressable
            key={index}
            onPress={() => handleFilterChange(name, 'role')}
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
      <View style={styles.modalCheckBoxGroup}>
        {Object.entries(target).map(([name, checked], index) => (
          <Pressable
            key={index}
            onPress={() => handleFilterChange(name, 'target')}
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
    </View>
  );
}
