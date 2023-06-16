import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image, Button } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Navigation from "./Navigation";
import SearchCh from "./component/SearchCh";

export default function App() {
  return (
    <Navigation></Navigation>
    // <NavigationContainer>
    //   <TopBar />
    //   <TeamPanel teamMember={Team2} />
    //   <TeamDetail />
    // </NavigationContainer>
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

// const Stack = createNativeStackNavigator();

// const MyStack = () => {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator>
//         <Stack.Screen
//           name="Home"
//           component={HomeScreen}
//           options={{ title: "Welcome" }}
//         />
//         <Stack.Screen name="Profile" component={DetailsScreen} />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// };

// function HomeScreen({ navigation }) {
//   return (
//     <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
//       <Text>Home Screen</Text>
//       <Button
//         title="Go to Details"
//         onPress={() => navigation.navigate("Details")}
//       />
//     </View>
//   );
// }

// function DetailsScreen({ navigation }) {
//   return (
//     <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
//       <Text>Details Screen</Text>
//       <Button
//         title="Go to Details... again"
//         onPress={() => navigation.navigate("Details")}
//       />
//     </View>
//   );
// }

// interface Cha {
//   charName: string;
//   styleName: string;
//   level: number;
//   LimitBreak: number;
//   Rein: number;
// }

// // type team = {
// //   teamMember: Cha[];
// // };

// interface team {
//   teamMember: Cha[];
// }

// function TopBar() {
//   return (
//     <View
//       style={{
//         backgroundColor: "blue",
//         height: 70,
//       }}
//     ></View>
//   );
// }

// function TeamPanel(input: team) {
//   const teams = input as team;
//   return (
//     <View
//       style={{
//         flex: 1,
//       }}
//     >
//       {teams.teamMember.map((item, index) => (
//         <CharSlot
//           styleName={item.styleName}
//           charName={item.charName}
//           level={item.level}
//           Rein={item.Rein}
//           LimitBreak={item.LimitBreak}
//         />
//       ))}
//     </View>
//   );
// }

// function CharSlot(input: Cha) {
//   let bColor: String = "#fff";
//   return (
//     <View
//       style={{
//         borderWidth: 1,
//         borderColor: "lightblue",
//         backgroundColor: "#fff",
//         flex: 1,
//         flexDirection: "row",
//       }}
//     >
//       <CharIcon></CharIcon>
//       <CharStyle
//         styleName={input.styleName}
//         charName={input.charName}
//         level={input.level}
//         Rein={input.Rein}
//         LimitBreak={input.LimitBreak}
//       ></CharStyle>
//       <CharLevel
//         styleName={input.styleName}
//         charName={input.charName}
//         level={input.level}
//         Rein={input.Rein}
//         LimitBreak={input.LimitBreak}
//       ></CharLevel>
//     </View>
//   );
// }

// function TeamDetail() {
//   return (
//     <View
//       style={{
//         backgroundColor: "green",
//         height: 100,
//       }}
//     ></View>
//   );
// }

// function CharIcon() {
//   let empty = true;
//   let charImage = "./assets/default.png";
//   return (
//     <View
//       style={{
//         aspectRatio: 1 / 1,
//         backgroundColor: "orange",
//       }}
//     >
//       <Text>Icon</Text>
//     </View>
//   );
// }
// // return (
// //   <Image source={require(charImage)} style={{ width: 40, height: 40 }} />
// // );

// function CharStyle(input: Cha) {
//   return (
//     <View style={{ flex: 1, backgroundColor: "red" }}>
//       <Text>{input.styleName}</Text>
//     </View>
//   );
// }

// function CharLevel(input: Cha) {
//   return (
//     <View style={{ aspectRatio: 1 / 1, backgroundColor: "purple" }}>
//       <Button title="Details"></Button>
//       <Text>
//         LimitBreaked: {input.LimitBreak}
//         {"\n"} Level: {input.level}
//         {"\n"} Reincarnation: {input.Rein}
//         {"\n"}
//       </Text>
//     </View>
//   );
// }
