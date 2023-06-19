import {
  TextInput,
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  FlatList,
  TouchableWithoutFeedback,
} from "react-native";
import { useState } from "react";
import Cha from "./TeamBuilding";
import { useNavigation, useRoute } from "@react-navigation/native";
import CharDataBase from "./CharacterData/CharDataBase";

interface ChData {
  id: string;
  chName: string;
  styleName: string;
  rarity: string;
  Ult: string;
  Skill: string;
  SearchKey: string;
}

const DATA: ChData[] = [
  {
    id: "1-1",
    chName: "茅森月歌",
    styleName: "Attack or Music",
    rarity: "A",
    Ult: "N/A",
    Skill: "クロス斬り",
    SearchKey: "茅森月歌 kayamoriruka Attack or Music",
  },
  {
    id: "1-2",
    chName: "茅森月歌",
    styleName: "戦場のフレット",
    rarity: "S",
    Ult: "N/A",
    Skill: "フルブレイカー",
    SearchKey: "茅森月歌 kayamoriruka kayamori ruka 戦場のフレット",
  },
  {
    id: "1-3",
    chName: "茅森月歌",
    styleName: "閃光のサーキットバースト",
    rarity: "SS",
    Ult: "夢幻泡影",
    Skill: "リカバー",
    SearchKey: "茅森月歌 kayamori ruka 閃光のサーキットバースト",
  },
  {
    id: "2-1",
    chName: "和泉ユキ",
    styleName: "Attack or March",
    rarity: "A",
    Ult: "N/A",
    Skill: "ブレイクバースト",
    SearchKey:
      "和泉ユキ izumiyuki izumi yuki yukki ユッキ ゆっき 和泉ゆき Attack or March",
  },
  {
    id: "2-2",
    chName: "和泉ユキ",
    styleName: "夢幻のSleeping Ocelot",
    rarity: "S",
    Ult: "N/A",
    Skill: "クールダウン",
    SearchKey:
      "和泉ユキ izumiyuki izumi yuki yukki ユッキ ゆっき 和泉ゆき 夢幻のSleeping Ocelot",
  },
  {
    id: "2-3",
    chName: "和泉ユキ",
    styleName: "",
    rarity: "SS",
    Ult: "流星",
    Skill: "",
    SearchKey: "和泉ユキ izumiyuki izumi yuki yukki ユッキ ゆっき 和泉ゆき",
  },
  {
    id: "3-1",
    chName: "逢川めぐみ",
    styleName: "Plain or Wild",
    rarity: "A",
    Ult: "N/A",
    Skill: "スタンブレード",
    SearchKey:
      "逢川めぐみ aikawamegumi aikawa megumi meguminn めぐみん Plain or Wild",
  },
  {
    id: "3-2",
    chName: "逢川めぐみ",
    styleName: "Impact Stream",
    rarity: "S",
    Ult: "N/A",
    Skill: "ハードブレード",
    SearchKey:
      "逢川めぐみ aikawamegumi aikawa megumi meguminn めぐみん Impact Stream",
  },
];

function SearchCh() {
  type ItemProps = { item: ChData };

  const navigation = useNavigation();
  const route = useRoute();
  const posID = route.params;
  // const { posID, setSelected } = route.params;
  console.log(posID, "From Searchch", typeof posID);

  const Item = ({ item }: ItemProps) => (
    <TouchableWithoutFeedback
      onPress={() => {
        // @ts-ignore
        navigation.navigate("TeamBuild", item.id);
      }}
    >
      <View
        style={{
          backgroundColor: "#CCCCCC",
          padding: 10,
          marginVertical: 2,
          marginHorizontal: 4,
          flexDirection: "row",
        }}
      >
        {/* <TouchableWithoutFeedback
          onPress={() => {
            // setSelected(posID);
            // navigation.goBack();
            // @ts-ignore
            navigation.navigate("TeamBuild", item.id);
          }}
        > */}
        <Image source={require("./icon/21.png")}></Image>
        {/* </TouchableWithoutFeedback> */}
        <Text
          style={{
            marginHorizontal: 10,
          }}
        >
          {item.chName}
          {"\t\t"}
          {item.rarity}
          {"\n"}
          {item.styleName}
        </Text>
      </View>
    </TouchableWithoutFeedback>
  );

  const oneCh = ({ item }: { item: ChData }) => <Item item={item} />;

  const [queryKeyword, setQueryKeyWords] = useState("");
  const [resultData, setResultData] = useState<ChData[]>(DATA);
  const handleSearch = (query: string) => {
    if (query) {
      const newData = DATA.filter((item) => {
        const itemData = item.SearchKey
          ? item.SearchKey.toUpperCase()
          : "".toUpperCase();
        const textData = query.toUpperCase();
        // console.log(itemData);
        // console.log(textData);
        // console.log(itemData.indexOf(textData));
        return itemData.indexOf(textData) > -1;
      });
      // console.log(newData);
      setResultData(newData);
      setQueryKeyWords(query);
    } else {
      setResultData(DATA);
      setQueryKeyWords(query);
    }
  };

  return (
    <>
      <View
        style={{
          height: 70,
        }}
      ></View>
      <TextInput
        style={{
          marginHorizontal: 10,
          height: 35,
          borderWidth: 1,
          borderColor: "#0C0C0C",
          borderRadius: 5,
        }}
        placeholder="Type here to search"
        onChangeText={(newText) => {
          console.log(newText);
          handleSearch(newText);
        }}
        value={queryKeyword}
      ></TextInput>

      <View>
        <FlatList
          data={resultData}
          renderItem={oneCh}
          keyExtractor={(data) => data.id}
        ></FlatList>
      </View>
    </>
  );
}

// function Searchbar() {
//   const [queryKeyword, setQueryKeyWords] = useState("");
//   const [resultData, setResultData] = useState<ChData[]>([]);
//   const handleSearch = (query: string) => {
//     if (query) {
//       const newData = DATA.filter((item) => {
//         const itemData = item.chName;
//         // ? item.chName.toUpperCase()
//         // : "".toUpperCase();
//         const textData = query;
//         console.log(itemData);
//         console.log(textData);
//         console.log(itemData.indexOf(textData));
//         return itemData.indexOf(textData) > -1;
//       });
//       console.log(newData);
//       setResultData(newData);
//       setQueryKeyWords(query);
//     } else {
//       setResultData(DATA);
//       setQueryKeyWords(query);
//     }
//   };

//   return (
//     <TextInput
//       style={{
//         marginHorizontal: 10,
//         height: 35,
//         borderWidth: 1,
//         borderColor: "#0C0C0C",
//         borderRadius: 5,
//       }}
//       placeholder="Type here to search"
//       onChangeText={(newText) => {
//         console.log(newText);
//         handleSearch(newText);
//       }}
//       value={queryKeyword}
//     ></TextInput>
//   );
// }

export default SearchCh;
