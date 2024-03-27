//It is a experimental page to implement bottom navigation for filters

import * as React from 'react';
import {BottomNavigation, Text} from 'react-native-paper';
import FilterPage from './FilterPage';
import {useTheme} from '@react-navigation/native';
import CloneSearchSlot from './CloneSearchSlot';
import {useState} from 'react';

export default function GroupedSearch() {
  const slotId = '1';
  const listRoute = () => <CloneSearchSlot slotId={slotId}></CloneSearchSlot>;

  const RecentsRoute = () => <Text>Recents</Text>;
  const theme = useTheme();
  const [index, setIndex] = useState(0);
  const [routes] = React.useState([
    {key: 'list', title: 'Character', focusedIcon: 'account-edit'},
    {key: 'filter', title: 'Filter', focusedIcon: 'filter'},
    {key: 'exFilter', title: 'Skill Effect', focusedIcon: 'filter-variant'},
  ]);

  const renderScene = BottomNavigation.SceneMap({
    list: listRoute,
    filter: FilterPage,
    exFilter: RecentsRoute,
  });

  return (
    <BottomNavigation
      barStyle={{
        backgroundColor: theme.dark ? '#121212' : '#FFFFFF',
      }}
      activeColor={theme.dark ? '#FFFFFF' : '#121212'}
      inactiveColor={theme.dark ? '#FFFFFF' : '#121212'}
      activeIndicatorStyle={{
        backgroundColor: theme.dark ? '#B794F6' : 'rgba(183,148,246,0.5)',
      }}
      navigationState={{index, routes}}
      onIndexChange={setIndex}
      renderScene={renderScene}
    />
  );
}
