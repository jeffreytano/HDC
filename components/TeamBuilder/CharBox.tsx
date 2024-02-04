import {
  TextInput,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Button,
  Image,
  Modal,
  BackHandler,
  KeyboardAvoidingView,
} from 'react-native';
import {Link, useRouter} from 'expo-router';
import {TeamMemberData} from '../../redux/dataType';
import {useTheme} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {useState} from 'react';
import {RootState} from '../../redux/store';
import {Remove} from '../../redux/reducers/teamDraft';
// @ts-ignore
import dummyImage from '../../assets/images/hisamecchi.png';
import {Platform} from 'react-native';
import Stat from './StatBox';

type props = {
  slotId: number;
  member: TeamMemberData;
};

export default function Charbox(input: props) {
  const theme = useTheme();
  const {slotId, member} = input;
  const router = useRouter();
  const dispatch = useDispatch();
  const styleImage = useSelector((state: RootState) => state.styleData.image);

  const [modalVisible, setModalVisible] = useState(false);

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

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
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)', // semi-transparent background
    },
    modalContent: {
      backgroundColor: theme.dark ? '#323232' : '#FFFFFF', //6200EE
      padding: 16,
      borderRadius: 8,
    },
  });

  return (
    <KeyboardAvoidingView
      style={[styles.border, styles.container]}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
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
        {member?.Sid ? (
          <Image
            style={[
              {
                aspectRatio: 1 / 1,
                resizeMode: 'contain',
              },
              member.Sid == '-1' ? {width: 115, height: 115} : null, // temporarily fix icon overflow for dummy
            ]}
            source={
              styleImage[parseInt(member?.Sid)]
                ? {uri: styleImage[parseInt(member?.Sid)]}
                : dummyImage
            }
          />
        ) : (
          <Text style={styles.text}>Icon</Text>
        )}
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
          {member?.charName}{' '}
          {member.rarity
            ? (member.rarity = 'Free' ? 'SS' : member.rarity)
            : null}{' '}
          {member.totsu ? member.totsu + '凸' : null}
          {'\n'}
          {member?.styleName}
          {'\n'}
          {member?.level ? 'レべル: ' + member.level : null}
          {member?.tensei ? '+' + member.tensei : null}
        </Text>
        {/* <View style={[styles.border, {borderWidth: 0, borderTopWidth: 1}]}>
          <Stat />
        </View> */}
      </View>
      <View
        style={[
          styles.border,
          {
            // aspectRatio: 1 / 1,
            // backgroundColor: 'green',
            flexDirection: 'column',
            padding: 2,
            justifyContent: 'space-evenly',
          },
        ]}
      >
        <Button
          title="Remove"
          onPress={() => dispatch(Remove({index: input.slotId}))}
          color={theme.dark ? '#B794F6' : '#00BFA5'}
        ></Button>
        <Button
          title="Detail"
          onPress={() => setModalVisible(true)}
          color={theme.dark ? '#B794F6' : '#00BFA5'}
        ></Button>
      </View>
      <Modal visible={modalVisible} transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.text}>This is the modal content</Text>
            <TextInput></TextInput>
            <Button title="Close" onPress={closeModal} />
          </View>
        </View>
      </Modal>
    </KeyboardAvoidingView>
  );
}
