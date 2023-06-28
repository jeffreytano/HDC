import { NavigationContainer } from "@react-navigation/native";
import { StyleSheet, Text, View, Image, Button } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TeamBuildingOriginalBackup from "./component/TeamBuildingOriginalBackup";
import TeamBuildVersion2 from "./component/TeamBuildingVersion2";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import SearchCh from "./component/SearchCh";
import Ionicons from "@expo/vector-icons";
import { createAppContainer } from "react-navigation";
import { createContext, useState } from "react";
import TeamBuild from "./component/TeamBuilding";
import BossBattle from "./component/BossBattle";
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

type MemberSlot = {
  styleID?: string;
  level?: number;
  charName?: string;
  styleName?: string;
  LimitBreak?: number;
  Rein?: number;
};
const emptySlot = {
  styleID: "-1",
  level: 0,
  charName: "Empty",
  styleName: "Empty",
  LimitBreak: 0,
  Rein: 0,
} as MemberSlot;

// const intialMemberSlot = Array(6).fill(emptySlot);

// const [memberState, setMemberState] = useState(Array(6).fill(emptySlot));
// let state = {
//   data: "text",
// };

// export const Context = createContext(state);

function StackGroup() {
  return (
    // <Context.Provider value={{}}>
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="TeamBuild" component={TeamBuild} />
      <Stack.Screen name="CharacterSearch" component={SearchCh} />
    </Stack.Navigator>
    // </Context.Provider>
  );
}

// const screens = {
//   Home:{
//     screen: TeamBuilding
//   },
//   Search:{
//     screen: SearchCh
//   }
// }

function TabGroup() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen name="StackGroup" component={StackGroup} />
      <Tab.Screen name="Boss" component={BossBattle} />
      <Stack.Screen name="TB2" component={TeamBuildVersion2} />
    </Tab.Navigator>
  );
}

function Navigation() {
  return (
    <NavigationContainer>
      <TabGroup />
    </NavigationContainer>
  );
}

// export default createAppContainer(Stack);
export default Navigation;
