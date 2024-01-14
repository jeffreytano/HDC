import {
  TextInput,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
} from 'react-native';
import {Link, useRouter} from 'expo-router';
import {TeamMemberData} from '../../redux/dataType';

type props = {
  slotId: number;
  member: TeamMemberData;
};

export default function Charbox(input: props) {
  const {slotId, member} = input;
  const router = useRouter();
  return (
    <View
      style={{
        backgroundColor: '#bbb',
        flex: 1,
        flexDirection: 'row',
        // height: 125,
        width: '100%',
        borderColor: 'lightblue',
        borderWidth: 1,
      }}
    >
      <TouchableHighlight
        style={{
          aspectRatio: 1 / 1,
          backgroundColor: 'orange',
          borderWidth: 1,
          // flex: 1,
          borderColor: 'lightblue',
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
        <Text>Icon</Text>
      </TouchableHighlight>
      <View
        style={{
          // aspectRatio: 1 / 1,

          backgroundColor: 'yellow',
          borderWidth: 1,
          borderColor: 'lightblue',
          flex: 3,
        }}
      >
        <Text>
          {member?.charName} {member.rarity}
        </Text>
        <Text>{member?.styleName}</Text>
      </View>
      <View
        style={{
          // aspectRatio: 1 / 1,
          backgroundColor: 'green',
          borderWidth: 1,
          borderColor: 'lightblue',
          flex: 1,
        }}
      >
        <Text>Char manage</Text>
      </View>
    </View>
  );
}
