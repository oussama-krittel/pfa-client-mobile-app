import { StyleSheet, View, Text } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { Ionicons } from "@expo/vector-icons";

import LandingScreen from "../Screens/LandingScreen";
import SetLocationScreen from "../Screens/SetLocationScreen";
import RestorantScreen from "../Screens/RestorantScreen";
import AppText from "../Components/AppText";

const Stack = createStackNavigator();

export default function LandingScreenStack() {
  return (
    <Stack.Navigator
    // mode="modal"
    // screenOptions={{ headerShown: false }}
    >
      <Stack.Screen
        name="Landing"
        component={LandingScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="SetLocation"
        component={SetLocationScreen}
        options={{ title: "set your location" }}
      />
      <Stack.Screen
        name="RestorantScreen"
        component={RestorantScreen}
        options={({ route }) => ({
          title: "",
          headerTransparent: true,
          headerTintColor: "#1DE8E1",
          headerRight: () => (
            <Ionicons
              name="heart-outline"//conditionnaly render name="heart"
              size={25}
              color="red"
              style={{ marginRight: 7 }}
            />
          ),
          // title: "restorant " + route.params.id,
        })}
      />
      <Stack.Screen
        name="tutorielScreens"
        component={TutorielScreen}
        options={{ title: "tutorial" }}
      />
    </Stack.Navigator>
  );
}

function TutorielScreen() {
  return (
    <View style={styles.container}>
      <AppText>tutorial</AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
