import {Text, View} from '../../components/Themed';
import {useEffect, useState} from 'react';
import {Button, SegmentedButtons} from 'react-native-paper';
import {router, useLocalSearchParams} from 'expo-router';
import {StyleSheet, Image, TouchableHighlight} from 'react-native';
import {useSelector} from 'react-redux';
import {RootState} from '../../redux/store';
// @ts-ignore
import dummyimage from '../../assets/images/hisamecchi.png';
import {useTheme} from '@react-navigation/native';
import Stat from '../../components/TeamBuilder/Stat';
import BoosterPage from '../../components/EquipmentSelection/BoosterPage';
import AccessoryPage from '../../components/EquipmentSelection/AccessoryPage';

type ParamType = {
  equipment: string;
};

// Define your sub-pages as separate components

export default function equipment() {
  const theme = useTheme();
  const index: number = parseInt(useLocalSearchParams<ParamType>().equipment);
  const [activePage, setActivePage] = useState('booster');
  const target = useSelector(
    (state: RootState) => state.teamDraft.TeamMember[index],
  );
  const styleImage = useSelector((state: RootState) => state.styleData.image);

  const styles = StyleSheet.create({
    container: {
      padding: 20,
    },
    segmentButton: {
      // backgroundColor: '#FFFFFF',
      paddingHorizontal: 10,
    },
    text: {
      color: theme.dark ? '#FFFFFF' : '#000000',
    },
    border: {
      borderColor: theme.dark ? '#757575' : 'lightblue',
      borderWidth: 1,
    },
  });

  const Page2 = () => <Text style={styles.text}>This is Page 2</Text>;
  const Page3 = () => <Text style={styles.text}>This is Page 3</Text>;

  const renderPage = () => {
    switch (activePage) {
      case 'booster':
        return <BoosterPage index={index} />;
      case 'accessories':
        return <AccessoryPage index={index} />;
      case 'orbs':
        return <Page3 />;
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <View style={{flexDirection: 'row'}}>
        <Image
          style={[
            {
              aspectRatio: 1 / 1,
              resizeMode: 'contain',
              width: 115,
            },
            target.Sid == -1 ? {width: 115, height: 115} : null, // temporarily fix icon overflow for dummy

            // backgroundColor: 'orange',
            // flex: 1,
          ]}
          source={
            styleImage[target?.Sid]
              ? {uri: styleImage[target?.Sid]}
              : dummyimage
          }
        />
        <Text style={[styles.text, {padding: 15}]}>
          {target?.charName}{' '}
          {target.rarity
            ? (target.rarity = 'Free' ? 'SS' : target.rarity)
            : null}{' '}
          {'\n'}
          {target?.styleName}
        </Text>
      </View>
      <View style={[styles.border, {padding: 5, marginVertical: 20}]}>
        <Stat stat={target.Stat} />
      </View>
      <SegmentedButtons
        value={activePage}
        onValueChange={setActivePage}
        style={styles.segmentButton}
        theme={{colors: {onSurface: theme.dark ? '#FFFFFF' : '#000000'}}}
        buttons={[
          {
            value: 'booster',
            label: 'Booster',
          },
          {
            value: 'accessories',
            label: 'Accessories',
          },
          {value: 'orbs', label: 'Orbs'},
        ]}
      />

      {renderPage()}
    </View>
  );
}
