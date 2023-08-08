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
import { useNavigation, useRoute } from "@react-navigation/native";
import { StyleDataBase } from "./StyleDataBase";
import { useDispatch } from "react-redux";
import { changeMember } from "../Redux/TeamBuild";

interface ChData {
  id: string;
  chName: string;
  styleName: string;
  rarity: string;
  Ult: string;
  Skill: string;
  SearchKey: string;
  image: any;
}

const DATA: ChData[] = StyleDataBase;

function SearchCh() {
  type ItemProps = { item: ChData };
  const navigation = useNavigation();
  const route = useRoute();
  const posID = route.params;
  const dispatch = useDispatch();

  const Item = ({ item }: ItemProps) => (
    <TouchableWithoutFeedback
      onPress={() => {
        const payLoad = {
          pos: posID,
          charName: item.chName,
          styleID: item.id,
          styleName: item.styleName,
          rare: item.rarity,
          image: item.image,
        };
        console.log("Before dispatching", posID);
        dispatch(changeMember(payLoad));
        // @ts-ignore
        navigation.navigate("TeamBuild", item.id);
      }}
    >
      <View
        style={{
          backgroundColor: "#CCCCCC",
          padding: 10,
          height: 125,
          marginVertical: 2,
          marginHorizontal: 4,
          flexDirection: "row",
        }}
      >
        <Image
          style={{
            aspectRatio: 1 / 1,
            width: 105,
            height: 105,
            resizeMode: "contain",
          }}
          source={item.image}
        />
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
        return itemData.indexOf(textData) > -1;
      });
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
        <FlatList
          data={resultData}
          renderItem={oneCh}
          keyExtractor={(data) => data.id}
          contentContainerStyle={{ paddingBottom: 110 }}
        ></FlatList>
      </View>
    </>
  );
}

export default SearchCh;
