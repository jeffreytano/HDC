import {Text, View} from '../../components/Themed';
import {useEffect, useState} from 'react';
import {router, useLocalSearchParams} from 'expo-router';
import {StyleSheet, Image, TouchableHighlight} from 'react-native';
import {useSelector} from 'react-redux';
import {RootState} from '../../redux/store';
// @ts-ignore
import dummyimage from '../../assets/images/hisamecchi.png';
import {Dropdown} from 'react-native-element-dropdown';
import {useTheme} from '@react-navigation/native';
import Stat from '../../components/TeamBuilder/Stat';
import {createStat, accessory} from '../../redux/dataType';
import {useDispatch} from 'react-redux';
import {ScrollView} from 'react-native-gesture-handler';
import {DEFAULT_STAT} from '../../redux/constants/dataConstant';

export default function AccessoryPage({index}: {index: number}) {
  const dispatch = useDispatch();
  const accessories = useSelector(
    (state: RootState) => state.teamDraft.AccessorySet[index],
  );
  const statMod = useSelector(
    (state: RootState) => state.teamDraft.StatModifier[index],
  );
  const theme = useTheme();
  const styles = StyleSheet.create({
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
      {accessories &&
        accessories.map((item, index) => (
          <TouchableHighlight
            key={index}
            onPress={() => {
              router.push({
                pathname: '/itemSearchStack/[item]',
                params: {item: item.type, targetIndex: index.toString()},
              });
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                marginVertical: 5,
                paddingHorizontal: 30,
                paddingVertical: 10,
                borderColor: theme.dark ? '#757575' : 'lightblue',
                borderWidth: 1,
              }}
            >
              <Image
                style={{
                  aspectRatio: 1 / 1,
                  width: 30,
                  height: 30,
                  resizeMode: 'contain',
                }}
                source={dummyimage}
              />
              <Text style={[styles.text]}>
                {item.name == '' ? 'Tap to select' : item.name}
                {'\n'}
              </Text>
            </View>
          </TouchableHighlight>
        ))}
    </ScrollView>
  );
}
