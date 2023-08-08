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
import { StyleDataBase } from "./StyleDataBase";
const DATA: ChData[] = StyleDataBase;

function TeamBuild() {
  return (
    <ScrollView>
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

  console.log(Team);

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
        backgroundColor: "#fff",
        flex: 1,
        flexDirection: "row",
        height: 125,
      }}
    >
      <CharIcon
        posID={posID}
        styleID={styleID}
        setSelected={setSelected}
      ></CharIcon>
      <CharStyle posID={posID} styleID={styleID}></CharStyle>
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

//@ts-ignore
function CharIcon({ posID, styleID, setSelected }) {
  const navigation = useNavigation();
  const route = useRoute();
  const IsFocused = useIsFocused();
  let charImage = "./icon/gosumori.png";
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
      <Image
        source={require(charImage)}
        style={{ resizeMode: "contain", height: 125, width: 125 }}
      />
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
      {/* <Text>
        レベル<TextInput keyboardType="numeric">110</TextInput>
      </Text>
      <Text>
        限界突破<TextInput keyboardType="numeric">0</TextInput>
      </Text>
      <Text>
        転生<TextInput keyboardType="numeric">0</TextInput>
      </Text> */}
      <Text>{found?.chName}</Text>
      <Text>{found?.styleName}</Text>
    </View>
  );
}

function CharLevel() {
  return (
    <View
      style={{ aspectRatio: 2 / 3, borderWidth: 1, borderColor: "lightblue" }}
    >
      <Button title="Details"></Button>
      <Text>
        レベル<TextInput keyboardType="numeric">110</TextInput>
      </Text>
      <Text>
        限界突破<TextInput keyboardType="numeric">0</TextInput>
      </Text>
      <Text>
        転生<TextInput keyboardType="numeric">0</TextInput>
      </Text>
    </View>
  );
}

export default TeamBuild;
