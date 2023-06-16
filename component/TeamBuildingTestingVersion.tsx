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
  const intialTeam = Array(6).fill("-1");
  const [team, setTeam] = useState(intialTeam);
  const [selected, setSelected] = useState(-1);
  const route = useRoute();
  const focus = useIsFocused();
  let pos = 0;
  const handlePress = () => {
    const style = "kayamori";
    const newteam = team.map((i, index) => {
      if (pos === index) {
        return style;
      } else {
        return i;
      }
    });
    setTeam(newteam);
    pos = pos + 1;
  };

  return (
    <>
      <TopBar />
      <Button title="button" onPress={handlePress}></Button>

      {/* <TeamPanel teamMember={Team} /> */}
      <TeamPanel style={team as string[]} />
      {/* <TeamDetail /> */}
    </>
  );
}

interface teamList {
  style: string[];
}

interface singleStyle {
  posID: number;
  style: string;
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

function TeamPanel(item: teamList) {
  // const teams = input as team;
  return (
    <View
      style={{
        flex: 1,
      }}
    >
      {item.style.map((i, index) => (
        <>
          <CharSlot style={i} key={index} posID={index} />
        </>
      ))}
    </View>
  );
}

function CharSlot(input: singleStyle) {
  let bColor: String = "#fff";
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
      <CharIcon posID={input.posID} style={input.style}></CharIcon>
      <CharStyle posID={input.posID} style={input.style}></CharStyle>
      <CharLevel></CharLevel>
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

function CharIcon(prop: singleStyle) {
  const navigation = useNavigation();
  const route = useRoute();
  // const [selected, setSelected] = useState(-1);
  const IsFocused = useIsFocused();
  let charImage = "./assets/default.png";
  const changeChar = (item: number) => {
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

function CharStyle(input: singleStyle) {
  return (
    <View style={{ flex: 1, backgroundColor: "red" }}>
      <Text>{input.style}</Text>
    </View>
  );
}

function CharLevel() {
  return (
    <View style={{ aspectRatio: 1 / 1, backgroundColor: "purple" }}>
      <Button title="Details"></Button>
      <Text>hello</Text>
    </View>
  );
}

export default TeamBuilding;
