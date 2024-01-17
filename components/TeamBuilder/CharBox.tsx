import {
  TextInput,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Button,
  BackHandler,
} from 'react-native';
import {Link, useRouter} from 'expo-router';
import {TeamMemberData} from '../../redux/dataType';
import {useTheme} from '@react-navigation/native';

type props = {
  slotId: number;
  member: TeamMemberData;
};

export default function Charbox(input: props) {
  const theme = useTheme();
  const {slotId, member} = input;
  const router = useRouter();

  const styles = StyleSheet.create({
    container: {
      backgroundColor: theme.dark ? '#121212' : '#FFFFFF',
      flex: 1,
      flexDirection: 'row',
      // height: 125,
      width: '100%',
      borderBottomWidth: slotId == 5 ? 1 : 0,
    },
    text: {
      color: theme.dark ? '#FFFFFF' : '#000000',
    },
    border: {
      borderColor: theme.dark ? '#757575' : 'lightblue',
      borderWidth: 1,
    },
    button: {
      color: theme.dark ? '#B794F6' : '#00BFA5',
    },
  });

  return (
    <View style={[styles.border, styles.container]}>
      <TouchableHighlight
        style={[
          styles.border,
          {
            aspectRatio: 1 / 1,
            // backgroundColor: 'orange',
            // flex: 1,
          },
        ]}
        onPress={() => {
          const id = slotId;
          console.log('icon pressed', id);
          router.push({
            pathname: '/Search/[SearchSlot]',
            params: {SearchSlot: id.toString()},
          });
        }}
      >
        <Text style={styles.text}>Icon</Text>
      </TouchableHighlight>
      <View
        style={[
          styles.border,
          {
            // aspectRatio: 1 / 1,

            // backgroundColor: 'yellow',
            flex: 3,
          },
        ]}
      >
        <Text style={styles.text}>
          {member?.charName} {member.rarity}
        </Text>
        <Text style={styles.text}>{member?.styleName}</Text>
      </View>
      <View
        style={[
          styles.border,
          {
            // aspectRatio: 1 / 1,
            // backgroundColor: 'green',
            flexDirection: 'column',
            padding: 4,
            justifyContent: 'space-evenly',
          },
        ]}
      >
        <Button
          title="Remove"
          onPress={() => console.log('Remove pressed')}
          color={theme.dark ? '#B794F6' : '#00BFA5'}
        ></Button>
        <Button
          title="Detail"
          onPress={() => console.log('Detail pressed')}
          color={theme.dark ? '#B794F6' : '#00BFA5'}
        ></Button>
      </View>
    </View>
  );
}
