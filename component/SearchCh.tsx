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
    id: "1",
    chName: "Kayamori Ruka",
    styleName: "Rock star",
    rarity: "A",
    Ult: "N/A",
    Skill: "",
  },
  {
    id: "2",
    chName: "Izumi Yuki",
    styleName: "Rock star",
    rarity: "S",
    Ult: "N/A",
    Skill: "",
  },
  {
    id: "3",
    chName: "Asakura Karen",
    styleName: "Rock star",
    rarity: "SS",
    Ult: "N/A",
    Skill: "",
  },
  {
    id: "4",
    chName: "Toujo Tsukasa",
    styleName: "Rock star",
    rarity: "SS",
    Ult: "N/A",
    Skill: "",
  },
  {
    id: "5",
    chName: "Aikawa megumi",
    styleName: "Rock star",
    rarity: "SS",
    Ult: "N/A",
    Skill: "",
  },
  {
    id: "6",
    chName: "Kunimi Tama",
    styleName: "Rock star",
    rarity: "SS",
    Ult: "N/A",
    Skill: "",
  },
  {
    id: "7",
    chName: "Asakura Karen",
    styleName: "Rock star",
    rarity: "SS",
    Ult: "N/A",
    Skill: "",
  },
  {
    id: "8",
    chName: "Asakura Karen",
    styleName: "Rock star",
    rarity: "SS",
    Ult: "N/A",
    Skill: "",
  },
];

function SearchCh() {
  type ItemProps = { item: ChData };

  const Item = ({ item }: ItemProps) => (
    <TouchableWithoutFeedback onPress={() => console.log(item.chName)}>
      <View
        style={{
          backgroundColor: "#CCCCCC",
          padding: 10,
          marginVertical: 2,
          marginHorizontal: 4,
          flexDirection: "row",
        }}
      >
        <Image source={require("./icon/21.png")}></Image>
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
        const itemData = item.chName;
        // ? item.chName.toUpperCase()
        // : "".toUpperCase();
        const textData = query;
        console.log(itemData);
        console.log(textData);
        console.log(itemData.indexOf(textData));
        return itemData.indexOf(textData) > -1;
      });
      console.log(newData);
      setResultData(newData);
      setQueryKeyWords(query);
    } else {
      setResultData(DATA);
      setQueryKeyWords(query);
    }
  };

  return (
    <>
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
        <FlatList data={resultData} renderItem={oneCh}></FlatList>
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
