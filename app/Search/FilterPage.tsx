import {
  ActivityIndicator,
  StyleSheet,
  TextComponent,
  Modal,
  TextInput,
  FlatList,
  ListRenderItemInfo,
  Pressable,
  ScrollView,
} from 'react-native';
import {Text, View} from '../../components/Themed';
import {Button, Checkbox, Divider, SegmentedButtons} from 'react-native-paper';
import {
  CLASS,
  INI_CLASS,
  INI_ELEMENT,
  INI_RARITY,
  INI_ROLE,
  INI_SKILL_TARGET,
  INI_WEAPON,
  INI_DAMAGEBUFF,
  INI_DEFBUFF,
  INI_DAMAGEDEBUFF,
  INI_DEFDEBUFF,
} from '../../redux/constants/dataConstant';
import {useTheme} from '@react-navigation/native';
import {group} from '../../redux/dataType';
import {useState} from 'react';
import {useNavigation} from 'expo-router';
import {Dropdown} from 'react-native-element-dropdown';
import {changeFilter} from '../../redux/reducers/styleData';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../redux/store';

export default function FilterPage() {
  const INI_SELECTEDMODE = {All: true, 以上: false, のみ: false, 以下: false};
  const skillEffect = {
    damageBuff: INI_DAMAGEBUFF,
    defendBuff: INI_DEFBUFF,
    damageDebuff: INI_DAMAGEDEBUFF,
    defendDebuff: INI_DEFDEBUFF,
  };

  const FilterOption = {
    rarity: INI_RARITY,
    element: INI_ELEMENT,
    weapon: INI_WEAPON,
    class: INI_CLASS,
    role: INI_ROLE,
    target: INI_SKILL_TARGET,
    SP: -1,
    SPMode: INI_SELECTEDMODE,
    SPequal: -1,
    SpEqualMode: INI_SELECTEDMODE,
    hit: -1,
    hitMode: INI_SELECTEDMODE,
  };

  const initial_rarity: typeof INI_RARITY = useSelector(
    (state: RootState) => state.styleData.rarity,
  );

  const [rarity, setRarity] = useState(INI_RARITY);
  const [element, setElement] = useState(INI_ELEMENT);
  const [weapon, setWeapon] = useState(INI_WEAPON);
  const [classes, setClasses] = useState(INI_CLASS);
  const [role, setRole] = useState(INI_ROLE);
  const [target, setTarget] = useState(INI_SKILL_TARGET);
  const [SPUsage, setSPUsage] = useState('1');
  const [SpEqual, setSpEqual] = useState('0');
  const [hit, setHit] = useState('0');
  const [isSPFocus, setIsSPFocus] = useState(false);
  const SPUsageList = Array.from({length: 20}, (_, index) => {
    return {label: (index + 1).toString(), value: (index + 1).toString()};
  });
  const SPEqualList = Array.from({length: 41}, (_, index) => {
    return {label: (index / 2).toString(), value: (index / 2).toString()};
  });
  const hitList = Array.from({length: 21}, (_, index) => {
    return {label: index.toString(), value: index.toString()};
  });
  const [SPUsageMode, setSPUsageMode] = useState(INI_SELECTEDMODE);
  const [SpEqualMode, setSpEqualMode] = useState(INI_SELECTEDMODE);
  const [hitMode, setHitMode] = useState(INI_SELECTEDMODE);
  const [damageBuff, setDamageBuff] = useState(INI_DAMAGEBUFF);
  const [defendBuff, setDefendBuff] = useState(INI_DEFBUFF);
  const [damageDebuff, setDamageDebuff] = useState(INI_DAMAGEDEBUFF);
  const [defendDebuff, setDefendDebuff] = useState(INI_DEFDEBUFF);
  const nav = useNavigation();
  const theme = useTheme();
  const dispatch = useDispatch();
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
      case 'SPMode':
        handleFilterFunction(
          setSPUsageMode,
          // target,
          ['以上', 'のみ', '以下'],
          SPUsageMode.All,
          name,
        );
        break;
      case 'SpEqualMode':
        handleFilterFunction(
          setSpEqualMode,
          // target,
          ['以上', 'のみ', '以下'],
          SpEqualMode.All,
          name,
        );
        break;
      case 'hitMode':
        handleFilterFunction(
          setHitMode,
          // target,
          ['以上', 'のみ', '以下'],
          hitMode.All,
          name,
        );
        break;
      default:
        return console.log('fell into default');
    }
  };

  const transformPayload = (
    item:
      | typeof INI_RARITY
      | typeof INI_CLASS
      | typeof INI_ELEMENT
      | typeof INI_WEAPON
      | typeof INI_ROLE
      | typeof INI_SKILL_TARGET,
  ) => {
    if (item.All) {
      return ['All'];
    } else {
      return Object.entries(item)
        .filter(([_, value]) => value === true)
        .map(([key]) => key);
    }
  };

  const submitFilter = () => {
    const payload = {
      rarity: transformPayload(rarity),
      classes: transformPayload(classes),
      weapon: transformPayload(weapon),
      element: transformPayload(element),
      role: transformPayload(role),
      target: transformPayload(target),
      SpUsage: {SP: SPUsage, Mode: SPUsageMode},
      SpEqual: {SP: SpEqual, Mode: SpEqualMode},
      hit: {hit: hit, Mode: hitMode},
    };
    dispatch(changeFilter(payload));
    nav.goBack();
  };
  return (
    <>
      <ScrollView style={styles.container}>
        <View style={styles.GroupContainer}>
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
        <View style={styles.GroupContainer}>
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
        <View style={styles.GroupContainer}>
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
        <View style={styles.GroupContainer}>
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
        <View style={styles.GroupContainer}>
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
        <View style={styles.GroupContainer}>
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
        <View style={[styles.GroupContainer]}>
          <Text
            style={[styles.text, {paddingHorizontal: 10, alignSelf: 'center'}]}
          >
            SP消費
          </Text>
          <Dropdown
            dropdownPosition="auto"
            placeholder="selected"
            activeColor={theme.dark ? '#B794F6' : '#00BFA5'}
            selectedTextStyle={styles.dropdownPlaceholderText}
            placeholderStyle={styles.dropdownPlaceholderText}
            // selectedStyle={styles.dropdownContainer}r
            style={[
              styles.dropdownListContainer,
              // isSPFocus && {borderColor: 'blue'},
            ]}
            containerStyle={styles.dropdownContainer}
            itemTextStyle={styles.text}
            onChange={(item: {label: string; value: string}) => {
              setSPUsage(item.value);
            }}
            // onFocus={() => setIsSPFocus(true)}
            data={SPUsageList}
            value={SPUsage}
            labelField="label"
            valueField="value"
            onChangeText={(item) => console.log('change text')}
          />
          <View style={{flexDirection: 'row', alignSelf: 'center'}}>
            {Object.entries(SPUsageMode).map(([name, checked], index) => (
              <Pressable
                key={index}
                onPress={() => handleFilterChange(name, 'SPMode')}
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
        </View>
        <Divider />
        <View style={[styles.GroupContainer]}>
          <Text
            style={[styles.text, {paddingHorizontal: 10, alignSelf: 'center'}]}
          >
            SP相当
          </Text>
          <Dropdown
            dropdownPosition="top"
            placeholder="selected"
            activeColor={theme.dark ? '#B794F6' : '#00BFA5'}
            selectedTextStyle={styles.dropdownPlaceholderText}
            placeholderStyle={styles.dropdownPlaceholderText}
            // selectedStyle={styles.dropdownContainer}r
            style={[
              styles.dropdownListContainer,
              // isSPFocus && {borderColor: 'blue'},
            ]}
            containerStyle={styles.dropdownContainer}
            itemTextStyle={styles.text}
            onChange={(item: {label: string; value: string}) => {
              setSpEqual(item.value);
            }}
            // onFocus={() => setIsSPFocus(true)}
            data={SPEqualList}
            value={SpEqual}
            labelField="label"
            valueField="value"
            onChangeText={(item) => console.log('change text')}
          />
          <View style={{flexDirection: 'row', alignSelf: 'center'}}>
            {Object.entries(SpEqualMode).map(([name, checked], index) => (
              <Pressable
                key={index}
                onPress={() => handleFilterChange(name, 'SpEqualMode')}
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
        </View>
        <Divider />
        <View style={[styles.GroupContainer]}>
          <Text style={[styles.text, {paddingLeft: 10, alignSelf: 'center'}]}>
            ヒット数
          </Text>
          <Dropdown
            dropdownPosition="top"
            placeholder="selected"
            activeColor={theme.dark ? '#B794F6' : '#00BFA5'}
            selectedTextStyle={styles.dropdownPlaceholderText}
            placeholderStyle={styles.dropdownPlaceholderText}
            // selectedStyle={styles.dropdownContainer}r
            style={[
              styles.dropdownListContainer,
              // isSPFocus && {borderColor: 'blue'},
            ]}
            containerStyle={styles.dropdownContainer}
            itemTextStyle={styles.text}
            onChange={(item: {label: string; value: string}) => {
              setHit(item.value);
            }}
            // onFocus={() => setIsSPFocus(true)}
            data={hitList}
            value={hit}
            labelField="label"
            valueField="value"
            onChangeText={(item) => console.log('change text')}
          />
          <View style={{flexDirection: 'row', alignSelf: 'center'}}>
            {Object.entries(hitMode).map(([name, checked], index) => (
              <Pressable
                key={index}
                onPress={() => handleFilterChange(name, 'hitMode')}
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
        </View>
        <Divider />
        {/* <Button
          mode={'contained-tonal'}
          style={{width: '40%', alignSelf: 'center', margin: 10}}
          onPress={() => {
            SetShowExtendedFilter(!showExtendedFilter);
          }}
        >
          スキル効果選択
        </Button> */}
        <Button
          mode={'contained-tonal'}
          style={{width: '30%', alignSelf: 'center', margin: 10}}
          onPress={() => {
            console.log('reset');
          }}
        >
          Reset
        </Button>
        <Button
          mode={'contained-tonal'}
          style={{width: '30%', alignSelf: 'center', margin: 10}}
          onPress={() => {
            submitFilter();
            nav.canGoBack();
          }}
        >
          Save
        </Button>
      </ScrollView>
    </>
  );
}
