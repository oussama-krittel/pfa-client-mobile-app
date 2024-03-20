import { createStackNavigator } from "@react-navigation/stack";

import LandingScreen from "../Screens/LandingScreen";
import SetLocationScreen from "../Screens/SetLocationScreen";

const Stack = createStackNavigator();

export default function LandingScreenStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Landing"
        component={LandingScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen name="SetLocation" component={SetLocationScreen} />
    </Stack.Navigator>
  );
}
