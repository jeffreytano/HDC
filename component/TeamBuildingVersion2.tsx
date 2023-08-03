import { StyleSheet, Text, View, Image, Button } from "react-native";
import { TouchableHighlight, TextInput, ScrollView } from "react-native";
import { useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  useNavigation,
  useRoute,
  useIsFocused,
} from "@react-navigation/native";
interface ChData {
  id: string;
  chName: string;
  styleName: string;
  rarity: string;
  Ult: string;
  Skill: string;
}
import { CharDataBase } from "./CharDataBase";
const DATA: ChData[] = CharDataBase;

function TeamBuildVersion2() {
  return (
    <ScrollView>
      <TopBar />
      <TeamPanel />
    </ScrollView>
  );
}

interface teamList {
  style: string[];
}

function TopBar() {
  return (
    <View
      style={{
        height: 70,
      }}
    ></View>
  );
}

function TeamPanel() {
  const emptyTeam = Array(6).fill("Empty");
  // const emptyState = Array(6).fill(false);
  // const [selected, setSelected] = useState(emptyState);
  const [selected, setSelected] = useState(-1);
  const [Team, setTeam] = useState(emptyTeam);
  const route = useRoute();
  // let newTeam = Team;
  // newTeam[selected] = route.params;
  // Team.map((item,index)=>{
  //   if(selected[index]){
  //     Team[index] = route.params;
  //   }
  // })
  Team[selected] = route.params;

  // setTeam(newTeam);
  return (
    <View
      style={{
        flex: 1,
      }}
    >
      {Team.map((i, index) => (
        <>
          <CharSlot
            styleID={i}
            key={index}
            posID={index}
            setSelected={setSelected}
          />
        </>
      ))}
    </View>
  );
}

//@ts-ignore
function CharSlot({ posID, styleID, setSelected }) {
  let bColor: String = "#fff";
  return (
    <View
      style={{
        flexDirection: "column",
      }}
    >
      <View
        style={{
          backgroundColor: "#fff",
          flexDirection: "row",
        }}
      >
        <CharIcon
          posID={posID}
          styleID={styleID}
          setSelected={setSelected}
        ></CharIcon>

        <View
          style={{
            flexDirection: "column",
            flex: 1,
          }}
        >
          <CharStyle posID={posID} styleID={styleID}></CharStyle>
          <CharStat></CharStat>
        </View>
        <Booster />
      </View>
      <Accessory></Accessory>
    </View>
  );
}

function Accessory() {
  const AccessoryArray = [1, 2, 3, 4, 5, 6];
  return (
    <View
      style={{
        flexDirection: "row",
        alignSelf: "center",
        height: 100,
        borderWidth: 1,
        borderColor: "lightblue",
      }}
    >
      {AccessoryArray.map((item) => (
        <Text style={{ alignSelf: "center" }}>{item}</Text>
      ))}
    </View>
  );
}

function Booster() {
  const chipArray = [1, 1, 1, 1];
  return (
    <View
      style={{
        flexDirection: "column",
        alignItems: "center",
        height: 100,
        width: 80,
        borderWidth: 1,
        borderColor: "lightblue",
      }}
    >
      <Text>Booster1</Text>
      {chipArray.map((item) => (
        <View>
          <Text>{item}</Text>
        </View>
      ))}
    </View>
  );
}

//@ts-ignore
function CharIcon({ posID, styleID, setSelected }) {
  const navigation = useNavigation();
  const route = useRoute();
  const IsFocused = useIsFocused();
  let charImage = "./assets/default.png";
  const changeChar = (item: number) => {
    // @ts-ignore
    navigation.navigate("CharacterSearch", item);
    setTimeout(() => {
      setSelected(item);
    }, 170);
  };

  return (
    <TouchableHighlight
      style={{
        aspectRatio: 1 / 1,
        borderWidth: 1,
        borderColor: "lightblue",
      }}
      onPress={() => changeChar(posID)}
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

//@ts-ignore
function CharStyle({ posID, styleID }) {
  const found = DATA.find((obj) => {
    return obj.id === styleID;
  });
  return (
    <View style={{ flex: 1, borderWidth: 1, borderColor: "lightblue" }}>
      <Text>{found?.chName}</Text>
      <Text>{found?.styleName}</Text>
    </View>
  );
}

function CharStat() {
  return (
    <View
      style={{ flexDirection: "row", borderWidth: 1, borderColor: "lightblue" }}
    >
      <Text>力 体力 知性 {"\n"}器用さ 精神 運</Text>
    </View>
  );
}

export default TeamBuildVersion2;
