import { StyleSheet, Text, View, Image, Button } from "react-native";
import { TouchableHighlight, TextInput, ScrollView } from "react-native";
import { useState } from "react";
import {
  useNavigation,
  useRoute,
  useIsFocused,
} from "@react-navigation/native";
import { StyleDataBase } from "../component/StyleDataBase";
import { useDispatch, useSelector } from "react-redux";
import { EMPTY_MEMBER_DATA } from "../Redux/DataType";
interface ChData {
  id: string;
  chName: string;
  styleName: string;
  rarity: string;
  Ult: string;
  Skill: string;
}
const DATA: ChData[] = StyleDataBase;

function TeamBuild2() {
  const navigation = useNavigation();
  const team = useSelector((state: any) => state.teamBuild.team);
  console.log(team);
  const [showDetail, setShowDetail] = useState(-1);
  const dispatch = useDispatch();
  const chipArray = ["耐性Ⅳ", "耐性Ⅳ", "耐性Ⅳ", "耐性Ⅳ"];
  const AccessoryArray = [
    "炎のリング",
    "アタックピアス",
    "闇のブレス",
    "天命のチェン",
    "ドライブゲイン",
    "ソウル",
  ];

  const changeChar = (item: number) => {
    // @ts-ignore
    navigation.navigate("CharacterSearch", item);
  };
  return (
    <ScrollView>
      <View
        style={{
          flex: 1,
        }}
      >
        {team
          ? team.map((teamMember: any, index: number) => (
              <View
                key={index}
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
                  <TouchableHighlight
                    style={{
                      aspectRatio: 1 / 1,
                      borderWidth: 1,
                      borderColor: "lightblue",
                    }}
                    onPress={() => changeChar(index)}
                  >
                    <Image
                      style={{ resizeMode: "contain", height: 110, width: 110 }}
                      source={teamMember.image}
                    ></Image>
                  </TouchableHighlight>
                  <View
                    style={{
                      flexDirection: "column",
                      flex: 1,
                    }}
                  >
                    {teamMember != EMPTY_MEMBER_DATA ? (
                      <View
                        style={{
                          flex: 1,
                          borderWidth: 1,
                          borderColor: "lightblue",
                        }}
                      >
                        <Text>
                          {teamMember.charName} +{teamMember.tensei}
                        </Text>
                        <Text>
                          {teamMember.rarity == "Free"
                            ? "SS"
                            : teamMember.rarity}
                          {"\t\t"}
                          {teamMember.styleName}
                        </Text>
                        <Text>
                          レベル{teamMember.level} / {teamMember.levelGap}
                          {"\t\t"}
                          限界突破{teamMember.totsu}
                        </Text>
                      </View>
                    ) : (
                      <View
                        style={{
                          flex: 1,
                          borderWidth: 1,
                          borderColor: "lightblue",
                        }}
                      />
                    )}
                    <View
                      style={{
                        flexDirection: "row",
                        borderWidth: 1,
                        borderColor: "lightblue",
                      }}
                    >
                      <Text>力 体力 知性 DP{"\n"}器用さ 精神 運 HP</Text>
                    </View>
                  </View>
                  <View
                    style={{
                      aspectRatio: 2 / 3,
                      borderWidth: 1,
                      borderColor: "lightblue",
                      justifyContent: "space-evenly",
                    }}
                  >
                    <Button title="Remove"></Button>
                    <Button
                      title="Detail"
                      onPress={() =>
                        showDetail == index
                          ? setShowDetail(-1)
                          : setShowDetail(index)
                      }
                    />
                  </View>
                </View>
                {showDetail == index ? (
                  <View
                    style={{
                      flexDirection: "row",
                    }}
                  >
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
                      {chipArray.map((item, index) => (
                        <Text>{item}</Text>
                      ))}
                    </View>
                    <View style={{ flexDirection: "row" }}>
                      <View
                        style={{
                          flexDirection: "column",
                          justifyContent: "space-evenly",
                          paddingHorizontal: 20,
                        }}
                      >
                        {AccessoryArray.map((item, index) => (
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
                        {AccessoryArray.map(() => (
                          <Text style={{ alignSelf: "flex-end" }}>
                            {"\t\t"}力+3{"\t\t"}力+3{"\t\t"}力+3
                          </Text>
                        ))}
                      </View>
                    </View>
                  </View>
                ) : null}
              </View>
            ))
          : null}
      </View>
    </ScrollView>
  );
}

export default TeamBuild2;
