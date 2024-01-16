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
    text: {
      color: theme.colors.text,
    },
  });

  return (
    <View
      style={{
        backgroundColor: theme.colors.primary,
        flex: 1,
        flexDirection: 'row',
        // height: 125,
        width: '100%',
        borderColor: theme.colors.border,
        borderWidth: 1,
        borderBottomWidth: slotId == 5 ? 1 : 0,
      }}
    >
      <TouchableHighlight
        style={{
          aspectRatio: 1 / 1,
          // backgroundColor: 'orange',
          borderWidth: 1,
          // flex: 1,
          borderColor: theme.colors.border,
        }}
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
        style={{
          // aspectRatio: 1 / 1,

          // backgroundColor: 'yellow',
          borderWidth: 1,
          borderColor: theme.colors.border,
          flex: 3,
        }}
      >
        <Text style={styles.text}>
          {member?.charName} {member.rarity}
        </Text>
        <Text style={styles.text}>{member?.styleName}</Text>
      </View>
      <View
        style={{
          // aspectRatio: 1 / 1,
          // backgroundColor: 'green',
          borderWidth: 1,
          borderColor: theme.colors.border,
          flexDirection: 'column',
        }}
      >
        <Button
          title="Remove"
          onPress={() => console.log('Remove pressed')}
          color={theme.colors.button}
        ></Button>
        <Button
          title="Detail"
          onPress={() => console.log('Detail pressed')}
          color={theme.colors.button}
        ></Button>
      </View>
    </View>
  );
}
