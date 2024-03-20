import React from "react";
import { StyleSheet, View, Text } from "react-native";

import colors from "../styles/colors";

import AppText from "../Components/AppText";

function DrawerHeader(props) {
  return (
    <View style={styles.header}>
      <View style={styles.circle}>
        <Text style={styles.circleText}>OK</Text>
      </View>
      <AppText style={styles.headerText}>Hi Oussama,</AppText>
    </View>
  );
}

export default DrawerHeader;

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  header: {
    flexDirection: "column",
    height: 200,
    justifyContent: "space-evenly",
    backgroundColor: colors.primary,
    paddingLeft: 16,
  },
  circle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  circleText: {
    fontSize: 24,
    fontWeight: "bold",
  },
  headerText: {
    color: "white",
    fontSize: 24,
  },
});
