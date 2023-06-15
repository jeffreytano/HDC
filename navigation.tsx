import { NavigationContainer } from "@react-navigation/native";
import { StyleSheet, Text, View, Image, Button } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TeamBuilding from "./component/TeamBuilding";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import SearchCh from "./component/SearchCh";

const Tab = createBottomTabNavigator();

function TabGroup() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="TeamBuild" component={TeamBuilding} />
      <Tab.Screen name="Character Search" component={SearchCh} />
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

export default Navigation;
