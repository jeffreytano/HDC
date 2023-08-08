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
import { StyleDataBase } from "../component/StyleDataBase";
import { useDispatch, useSelector } from "react-redux";
const DATA: ChData[] = StyleDataBase;

function TeamBuildVersion3() {
  return (
    <ScrollView>
      <TeamPanel />
    </ScrollView>
  );
}

function TeamPanel() {
  const route = useRoute();
  const team = useSelector((state: any) => state.teamBuild.team);
  const showDetail = useSelector((state: any) => state.teamBuild.showDetail);
  return (
    <View
      style={{
        flex: 1,
      }}
    >
      {team &&
        team.map((i: any, index: number) => (
          <>
            <CharSlot styleID={i.styleID} key={index} posID={index} />
          </>
        ))}
    </View>
  );
}

//@ts-ignore
function CharSlot({ posID, styleID }) {
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
        <CharIcon posID={posID} styleID={styleID}></CharIcon>

        <View
          style={{
            flexDirection: "column",
            flex: 1,
          }}
        >
          <CharStyle posID={posID} />
          <CharStat />
        </View>
        <CharLevel />
      </View>
      <View
        style={{
          flexDirection: "row",
        }}
      >
        <Booster />
        <Accessory />
      </View>
    </View>
  );
}

function Accessory() {
  const AccessoryArray = [
    "炎のリング",
    "アタックピアス",
    "闇のブレス",
    "天命のチェン",
    "ドライブゲイン",
    "ソウル",
  ];
  return (
    <View style={{ flexDirection: "row" }}>
      <View
        style={{
          flexDirection: "column",
          justifyContent: "space-evenly",
          paddingHorizontal: 20,
        }}
      >
        {AccessoryArray.map((item) => (
          <Text style={{ alignSelf: "baseline" }}>{item}</Text>
        ))}
      </View>
      <View
        style={{
          flexDirection: "column",
          justifyContent: "space-evenly",
          paddingHorizontal: 20,
        }}
      >
        {AccessoryArray.map((item) => (
          <Text style={{ alignSelf: "flex-end" }}>
            {"\t\t"}力+3{"\t\t"}力+3{"\t\t"}力+3
          </Text>
        ))}
      </View>
    </View>
  );
}

function Booster() {
  const chipArray = ["耐性Ⅳ", "耐性Ⅳ", "耐性Ⅳ", "耐性Ⅳ"];
  return (
    <View
      style={{
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-evenly",
        borderWidth: 1,
        borderColor: "lightblue",
        paddingHorizontal: 20,
      }}
    >
      <Text>ウツセミ</Text>
      {chipArray.map((item) => (
        <View>
          <Text>{item}</Text>
        </View>
      ))}
    </View>
  );
}

//@ts-ignore
function CharIcon({ posID, styleID }) {
  const navigation = useNavigation();
  const route = useRoute();
  const IsFocused = useIsFocused();
  let charImage = "./assets/default.png";
  const changeChar = (item: number) => {
    // @ts-ignore
    navigation.navigate("CharacterSearch", item);
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
function CharStyle({ posID }) {
  const team = useSelector((state: any) => state.teamBuild.team);
  if (team[posID].charName)
    return (
      <View style={{ flex: 1, borderWidth: 1, borderColor: "lightblue" }}>
        <Text>
          {team[posID].charName} +{team[posID].tensei}
        </Text>
        <Text>
          {team[posID].rarity}
          {"\t\t"}
          {team[posID].styleName}
        </Text>
        <Text>
          レベル{team[posID].level}
          {"\t\t"}
          限界突破{team[posID].totsu}
        </Text>
      </View>
    );
  else
    return (
      <View
        style={{ flex: 1, borderWidth: 1, borderColor: "lightblue" }}
      ></View>
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

function CharLevel() {
  const dispatch = useDispatch();
  return (
    <View
      style={{
        aspectRatio: 2 / 3,
        borderWidth: 1,
        borderColor: "lightblue",
        justifyContent: "space-between",
      }}
    >
      <Button title="Remove"></Button>
      <Button title="Detail" />
    </View>
  );
}

export default TeamBuildVersion3;
