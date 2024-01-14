import {
  TextInput,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
} from 'react-native';
import Charbox from './CharBox';
import {useSelector} from 'react-redux';
import {RootState} from '../../redux/store';

export default function TeamBox() {
  const teamMembers = useSelector(
    (state: RootState) => state.teamDraft.TeamMember,
  );

  console.log('member 1', teamMembers);

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <Charbox slotId={0} member={teamMembers[0]}></Charbox>
      <Charbox slotId={1} member={teamMembers[1]}></Charbox>
      <Charbox slotId={2} member={teamMembers[2]}></Charbox>
      <Charbox slotId={3} member={teamMembers[3]}></Charbox>
      <Charbox slotId={4} member={teamMembers[4]}></Charbox>
      <Charbox slotId={5} member={teamMembers[5]}></Charbox>
    </View>
  );
}
