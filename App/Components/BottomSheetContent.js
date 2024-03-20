import React from "react";
import { TouchableOpacity, View } from "react-native";
import { StyleSheet } from "react-native";

import AppText from "./AppText";
import colors from "../styles/colors";
import { hexToRgb } from "../styles/hexToRgb";

function BottomSheetContent({ navigation }) {
  return (
    <View style={styles.Container}>
      <View style={styles.TextContainerStyle}>
        <AppText>Update your current location</AppText>
      </View>
      <TouchableOpacity
        style={styles.LocationBox}
        onPress={() => navigation.navigate("SetLocation")}
      >
        <AppText style={styles.TextStyle}>hello</AppText>
      </TouchableOpacity>
    </View>
  );
}

export default BottomSheetContent;

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    alignItems: "center",
  },
  LocationBox: {
    backgroundColor: "rgba(" + hexToRgb(colors.secondary) + ", 0.15)",
    height: "69%",
    width: "92%",
  },
  TextContainerStyle: {
    width: "92%",
    paddingLeft: 10,
    margin: 20,
  },
  TextStyle: {},
});
