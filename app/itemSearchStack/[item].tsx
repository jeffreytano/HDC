import {Text, View} from '../../components/Themed';
import {useEffect, useState} from 'react';
import {Button, SegmentedButtons} from 'react-native-paper';
import {useLocalSearchParams} from 'expo-router';
import {StyleSheet, Image, FlatList, ListRenderItemInfo} from 'react-native';
import {useSelector} from 'react-redux';
import {RootState} from '../../redux/store';
// @ts-ignore
import dummyimage from '../../assets/images/hisamecchi.png';
import {useTheme} from '@react-navigation/native';
import Stat from '../../components/TeamBuilder/Stat';
import RenderItem from '../../components/SearchComponent/RenderItem';

type prop = {
  item: string;
  targetIndex: string;
};

type equipItem = {
  type: string;
  id: number;
  name: string;
  detail: string;
};

// Define your sub-pages as separate components

export default function itemSearch() {
  const theme = useTheme();
  const type = useLocalSearchParams().type;
  const targetIndex = parseInt(useLocalSearchParams<prop>().targetIndex);
  const target = useSelector(
    (state: RootState) => state.teamDraft.TeamMember[targetIndex],
  );

  const styles = StyleSheet.create({
    container: {
      backgroundColor: theme.dark ? '#121212' : '#FFFFFF',
    },
    TextBar: {
      // backgroundColor: theme.colors.primary,
      margin: 3,
      height: 40,
      paddingHorizontal: 20,
      borderColor: theme.dark ? '#B794F6' : '#2E2E2D',
      borderWidth: 1,
      color: theme.dark ? '#FFFFFF' : '#000000',
    },
  });

  const boosterList: Array<equipItem> = [
    {
      type: 'booster',
      name: 'ウツセミ',
      id: 1,
      detail: 'details1',
    },
    {
      type: 'booster',
      name: 'ウツセミ2',
      id: 2,
      detail: 'details2',
    },
  ];

  const renderItem = (item: ListRenderItemInfo<equipItem>) => (
    <RenderItem item={item.item} index={targetIndex} />
  );

  const keyExtractor = (item: equipItem) => item.id.toString();

  return (
    <View style={styles.container}>
      <FlatList
        data={boosterList}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        contentContainerStyle={{paddingBottom: 60}}
        style={styles.container}
      ></FlatList>
      {/* {styleData &&
      styleData.map((item: StyleData, index: number) => (
        <SearchItem style={item} key={index}></SearchItem>
      ))} */}
    </View>
  );
}
