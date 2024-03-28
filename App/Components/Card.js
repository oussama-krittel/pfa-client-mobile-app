import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import colors from "../styles/colors";
import AppText from "./AppText";

function Card({ card, onPress }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.card}>
        <ImageBackground source={card.img} style={styles.backgroundImage}>
          <AppText style={{ color: "white" }}>cart {card.id}</AppText>
        </ImageBackground>
      </View>
    </TouchableOpacity>
  );
}

export default Card;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    height: 160,
    borderRadius: 10,
    marginRight: 15,
    width: 260,
    overflow: "hidden",
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    height: 160,
    borderRadius: 10,
    width: 260,
  },
});
