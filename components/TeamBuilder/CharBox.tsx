import {
  TextInput,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Button,
  Image,
  Modal,
} from 'react-native';
import {Link, useRouter} from 'expo-router';
import {TeamMemberData, chipDetails} from '../../redux/dataType';
import {useTheme} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {useState} from 'react';
import {RootState} from '../../redux/store';
import {
  Level,
  Remove,
  LimitBreak,
  Tensei,
} from '../../redux/reducers/teamDraft';
// @ts-ignore
import dummyImage from '../../assets/images/hisamecchi.png';
import Stat from './Stat';
import StatInput from './StatInput';
import ItemPicker from './ItemPicker';
import {Dropdown} from 'react-native-element-dropdown';
import {IconButton} from 'react-native-paper';

type props = {
  slotId: number;
  member: TeamMemberData;
};

export default function Charbox(input: props) {
  const defaultPerk = {
    stat: 'none',
    amount: 0,
  };
  const theme = useTheme();
  const {slotId, member} = input;
  const router = useRouter();
  const dispatch = useDispatch();
  const BoosterSet = useSelector(
    (state: RootState) => state.teamDraft.BoosterSet,
  );
  const styleImage = useSelector((state: RootState) => state.styleData.image);
  const [showDetail, setShowDetail] = useState(-1);
  const [modalVisible, setModalVisible] = useState(false);
  const [chipNumber, setChipNumber] = useState(0);
  const [maxChip, setMaxChip] = useState(4);
  const [perks, setPerks] = useState<Perk[]>([defaultPerk]);

  const handleChipChange = (number: number) => {
    console.log(chipNumber);
    if (
      (number == 1 && chipNumber < maxChip) ||
      (number == -1 && chipNumber > 0)
    ) {
      setChipNumber(chipNumber + number);
    }
  };
  type Perk = {
    stat: string;
    amount: number;
  };

  const updatePerk = ({
    index,
    stat,
    amount,
  }: {
    index: number;
    stat: string;
    amount: number;
  }) => {
    let newPerks = perks;
    newPerks[index] = {stat: stat, amount: amount};
    setPerks(newPerks);
    console.log(newPerks);
  };
  const addPerk = () => {
    if (perks.length < maxChip) {
      setPerks(perks.concat(defaultPerk));
    }
  };

  const removePerk = (index: number) => {
    if (perks.length > 1) {
      setPerks(perks.splice(index));
    }
  };

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
    TextInput: {
      backgroundColor: theme.dark ? '#353535' : '#D5D5D5',
      padding: 0,
      color: theme.dark ? '#FFFFFF' : '#000000',
      width: 40,
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
    dropdownContainer: {
      backgroundColor: theme.dark ? '#323232' : '#FFFFFF',
    },
    dropdownListContainer: {
      backgroundColor: theme.dark ? '#323232' : '#FFFFFF',
    },
    dropdownItemText: {
      color: theme.dark ? '#FFFFFF' : '#000000',
    },
  });

  return (
    <View style={[styles.border, {flexDirection: 'column'}]}>
      <View style={[styles.container]}>
        <TouchableHighlight
          style={[
            styles.border,
            {
              aspectRatio: 1 / 1,
              // backgroundColor: 'orange',
              // flex: 1,
              width: 115,
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
                member.Sid == -1 ? {width: 115, height: 115} : null, // temporarily fix icon overflow for dummy
              ]}
              source={
                styleImage[member?.Sid]
                  ? {uri: styleImage[member?.Sid]}
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
              padding: 3,
              flex: 3,
            },
          ]}
        >
          <Text style={styles.text}>
            {member?.charName}{' '}
            {member.rarity
              ? (member.rarity = 'Free' ? 'SS' : member.rarity)
              : null}{' '}
            {'\n'}
            {member?.styleName}
          </Text>
          {member?.level && member.Sid != -1 ? (
            <View style={{flexDirection: 'row'}}>
              <Text style={[styles.text]}>レべル </Text>
              <StatInput
                defaultValue={member.level.toString()}
                min={1}
                max={member.levelGap}
                style={{width: 30}}
                onChangeText={(text) =>
                  dispatch(Level({index: slotId, level: parseInt(text)}))
                }
              ></StatInput>
              <Text style={styles.text}> 限界突破 </Text>
              <StatInput
                defaultValue={member?.totsu.toString()}
                min={0}
                max={
                  member.rarity == 'SS' || member.rarity == 'Free'
                    ? 4
                    : member.rarity == 'S'
                      ? 10
                      : 20
                }
                onChangeText={(text) => {
                  if (text) {
                    dispatch(
                      LimitBreak({index: slotId, limitBreak: parseInt(text)}),
                    );
                  }
                }}
              ></StatInput>
              <Text style={styles.text}> 転生 </Text>
              <StatInput
                defaultValue={member?.tensei.toString()}
                min={0}
                max={20}
                onChangeText={(text) =>
                  dispatch(Tensei({index: slotId, tensei: parseInt(text)}))
                }
              ></StatInput>
            </View>
          ) : null}
          {/* <ValuePicker min={1} max={110} valueType={'level'} /> */}

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
            onPress={() => setShowDetail(showDetail == slotId ? -1 : slotId)}
            color={theme.dark ? '#B794F6' : '#00BFA5'}
          />
        </View>
      </View>
      {showDetail == slotId && (
        <View style={{paddingTop: 10}}>
          <Stat stat={member?.Stat} />
          <View
            style={{
              width: '40%',
              alignSelf: 'center',
              paddingTop: 3,
              paddingBottom: 10,
            }}
          >
            <Button
              title="Edit"
              onPress={() => {
                router.push({
                  pathname: '/equipment/[equipment]',
                  params: {equipment: slotId},
                });
              }}
              color={theme.dark ? '#B794F6' : '#00BFA5'}
            ></Button>
          </View>
        </View>
      )}
      {/* <Modal visible={modalVisible} transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <ItemPicker index={slotId} items={['B1', 'B2', 'B3']}></ItemPicker>
            {perks.map((item, chipIndex) => (
              <View key={chipIndex} style={{flexDirection: 'row'}}>
                <ChipItem
                  index={slotId}
                  items={['B1', 'B2', 'B3']}
                  chipIndex={chipIndex}
                  // max={maxChip}
                  // handleChipChange={handleChipChange}
                  // total={chipNumber}
                ></ChipItem>
                <IconButton
                  icon="minus-thick"
                  iconColor={theme.dark ? '#FFFFFF' : '#000000'}
                  size={16}
                  onPress={(event) => removePerk(chipIndex)}
                ></IconButton>
              </View>
            ))}
            {perks.length > 0 &&
              perks.length < maxChip &&
              chipNumber < maxChip && (
                <IconButton
                  icon="plus-thick"
                  iconColor={theme.dark ? '#FFFFFF' : '#000000'}
                  size={16}
                  onPress={addPerk}
                ></IconButton>
              )}
            <Stat boosterSet={BoosterSet[slotId]} raw={false}></Stat>
            <Button title="Close" onPress={closeModal} />
          </View>
        </View>
      </Modal> */}
    </View>
  );
}
