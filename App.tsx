import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image } from "react-native";

export default function App() {
  return (
    <>
      <TopBar />
      <TeamPanel />
      <TeamDetail />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

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

const topBarStyle = StyleSheet.create({
  container: {
    flex: 1,
    // flexDirection: "row",
    paddingTop: 20,
    backgroundColor: "blue",
    alignItems: "center",
    justifyContent: "center",
  },
});

function TeamPanel() {
  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <CharSlot />
      <CharSlot />
      <CharSlot />
      <CharSlot />
      <CharSlot />
      <CharSlot />
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

function CharSlot() {
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
      <CharIcon></CharIcon>
      <CharStyle></CharStyle>
      <CharLevel></CharLevel>
    </View>
  );
}

function CharIcon() {
  let empty = true;
  let charImage = "./assets/default.png";
  return (
    <View
      style={{
        aspectRatio: 1 / 1,
        backgroundColor: "orange",
      }}
    >
      <Text>Icon</Text>
    </View>
  );
}
// return (
//   <Image source={require(charImage)} style={{ width: 40, height: 40 }} />
// );

function CharStyle() {
  return (
    <View style={{ flex: 1, backgroundColor: "red" }}>
      <Text>Styles</Text>
    </View>
  );
}

function CharLevel() {
  return (
    <View style={{ aspectRatio: 1 / 1, backgroundColor: "purple" }}>
      <Text>Level</Text>
    </View>
  );
}

const teamStyle = StyleSheet.create({
  container: {
    flex: 1,
    // flexDirection: "row",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
