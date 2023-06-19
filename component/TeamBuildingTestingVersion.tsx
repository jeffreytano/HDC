import { StyleSheet, Text, View, Image, Button } from "react-native";
import { TouchableHighlight } from "react-native";
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
const DATA: ChData[] = [
  {
    id: "1-1",
    chName: "茅森月歌",
    styleName: "Attack or Music",
    rarity: "A",
    Ult: "N/A",
    Skill: "クロス斬り",
  },
  {
    id: "1-2",
    chName: "茅森月歌",
    styleName: "戦場のフレット",
    rarity: "S",
    Ult: "N/A",
    Skill: "フルブレイカー",
  },
  {
    id: "1-3",
    chName: "茅森月歌",
    styleName: "閃光のサーキットバースト",
    rarity: "SS",
    Ult: "夢幻泡影",
    Skill: "リカバー",
  },
  {
    id: "2-1",
    chName: "和泉ユキ",
    styleName: "Attack or March",
    rarity: "A",
    Ult: "N/A",
    Skill: "ブレイクバースト",
  },
  {
    id: "2-2",
    chName: "和泉ユキ",
    styleName: "夢幻のSleeping Ocelot",
    rarity: "S",
    Ult: "N/A",
    Skill: "クールダウン",
  },
  {
    id: "2-3",
    chName: "和泉ユキ",
    styleName: "",
    rarity: "SS",
    Ult: "流星",
    Skill: "",
  },
  {
    id: "3-1",
    chName: "逢川めぐみ",
    styleName: "Plain or Wild",
    rarity: "A",
    Ult: "N/A",
    Skill: "スタンブレード",
  },
  {
    id: "3-2",
    chName: "逢川めぐみ",
    styleName: "Impact Stream",
    rarity: "S",
    Ult: "N/A",
    Skill: "ハードブレード",
  },
];

function TeamBuildVersion2() {
  return (
    <>
      <TopBar />
      <TeamPanel />
    </>
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

function CharLevel() {
  return (
    <View
      style={{ aspectRatio: 2 / 3, borderWidth: 1, borderColor: "lightblue" }}
    >
      <Button title="Details"></Button>
      <Text>レベル</Text>
      <Text>限界突破</Text>
      <Text>転生</Text>
    </View>
  );
}

export default TeamBuildVersion2;
