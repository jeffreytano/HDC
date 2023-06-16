import { StyleSheet, Text, View, Image, Button } from "react-native";
import { TouchableHighlight } from "react-native";
import { useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  useNavigation,
  useRoute,
  useIsFocused,
} from "@react-navigation/native";

function TeamBuilding() {
  const emptyCha = {
    posID: -1,
    styleName: "Empty",
    charName: "Empty",
    level: 0,
    LimitBreak: 0,
    Rein: 0,
  } as Cha;
  const emptyTeam = Array(6).fill(emptyCha);
  const [team, setTeam] = useState(emptyTeam);
  const route = useRoute();

  let Team = Array(6).fill(emptyCha);
  console.log(Team);
  return (
    <>
      <TopBar />
      {/* <TeamPanel teamMember={Team} /> */}
      <TeamPanel teamMember={team} />
      {/* <TeamDetail /> */}
    </>
  );
}

export interface Cha {
  posID: number;
  charName: string;
  styleName: string;
  level: number;
  LimitBreak: number;
  Rein: number;
}

// type team = {
//   teamMember: Cha[];
// };

interface team {
  teamMember: Cha[];
}

function TopBar() {
  return (
    <View
      style={{
        backgroundColor: "blue",
        height: 70,
      }}
    ></View>
  );
}

function TeamPanel(input: team) {
  // const teams = input as team;
  return (
    <View
      style={{
        flex: 1,
      }}
    >
      {input.teamMember.map((item, index) => (
        <>
          <CharSlot
            posID={index}
            styleName={item.styleName}
            charName={item.charName}
            level={item.level}
            Rein={item.Rein}
            LimitBreak={item.LimitBreak}
          />
        </>
      ))}
    </View>
  );
}

function CharSlot(input: Cha) {
  let bColor: String = "#fff";
  console.log("key", input.posID);
  return (
    <View
      style={{
        borderWidth: 1,
        borderColor: "lightblue",
        backgroundColor: "#fff",
        flex: 1,
        flexDirection: "row",
      }}
    >
      <CharIcon
        posID={input.posID}
        styleName={input.styleName}
        charName={input.charName}
        level={input.level}
        Rein={input.Rein}
        LimitBreak={input.LimitBreak}
      ></CharIcon>
      <CharStyle
        posID={input.posID}
        styleName={input.styleName}
        charName={input.charName}
        level={input.level}
        Rein={input.Rein}
        LimitBreak={input.LimitBreak}
      ></CharStyle>
      <CharLevel
        posID={input.posID}
        styleName={input.styleName}
        charName={input.charName}
        level={input.level}
        Rein={input.Rein}
        LimitBreak={input.LimitBreak}
      ></CharLevel>
    </View>
  );
}

function TeamDetail() {
  return (
    <View
      style={{
        backgroundColor: "green",
        height: 100,
      }}
    ></View>
  );
}

function CharIcon(prop: Cha) {
  const navigation = useNavigation();
  const route = useRoute();
  // const [selected, setSelected] = useState(-1);
  const IsFocused = useIsFocused();
  let charImage = "./assets/default.png";
  const changeChar = (item: number) => {
    // setSelected(item);
    // console.log("seleced: ", selected);
    navigation.navigate("CharacterSearch", item);
  };

  return (
    <TouchableHighlight
      style={{
        aspectRatio: 1 / 1,
        backgroundColor: "orange",
      }}
      onPress={() => changeChar(prop.posID)}
    >
      <View>
        <Text>Icon</Text>
      </View>
    </TouchableHighlight>
  );
}
// return (
//   <Image source={require(charImage)} style={{ width: 40, height: 40 }} />
// );

function CharStyle(input: Cha) {
  return (
    <View style={{ flex: 1, backgroundColor: "red" }}>
      <Text>{input.styleName}</Text>
    </View>
  );
}

function CharLevel(input: Cha) {
  return (
    <View style={{ aspectRatio: 1 / 1, backgroundColor: "purple" }}>
      <Button title="Details"></Button>
      <Text>
        LimitBreaked: {input.LimitBreak}
        {"\n"} Level: {input.level}
        {"\n"} Reincarnation: {input.Rein}
        {"\n"}
      </Text>
    </View>
  );
}

export default TeamBuilding;
