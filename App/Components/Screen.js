import React from "react";

import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { View } from "react-native";

export default function Screen({ children, style }) {
  return (
    <SafeAreaView style={[{ flex: 1 }, style]}>
      <View style={[{ flex: 1 }, style]}>
        {children}
        <StatusBar style="auto"   />
      </View>
    </SafeAreaView>
  );
}
