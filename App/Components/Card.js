import React from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  ImageBackground,
} from "react-native";
import AppText from "./AppText";
import { FontAwesome } from "@expo/vector-icons"; // Import FontAwesome

function Card({ card, onPress, distance }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.card}>
        <ImageBackground
          source={card.coverImage}
          style={styles.backgroundImage}
        >
          <View style={styles.overlay}>
            <View style={styles.logoContainer}>
              <Image source={card.logo} style={styles.logo} />
            </View>
            <View style={styles.detailsContainer}>
              <View style={styles.ratingContainer}>
                <FontAwesome
                  name="star"
                  size={18}
                  color="gold"
                  style={styles.starIcon}
                />
                <AppText style={styles.rating}>{card.rating}</AppText>
              </View>
              <AppText style={styles.name}>{card.name}</AppText>
              <AppText style={styles.cuisine}>{card.cuisine}</AppText>
            </View>
          </View>
        </ImageBackground>
        {distance && (
          <View style={styles.distanceContainer}>
            <AppText style={styles.distanceText}>{distance} km</AppText>
          </View>
        )}
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
  overlay: {
    flex: 1,
    borderRadius: 10,
    padding: 10,
  },
  logoContainer: {
    alignItems: "left",
  },
  logo: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginBottom: 10,
  },
  detailsContainer: {
    flex: 1,
    justifyContent: "flex-end",
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  starIcon: {
    marginRight: 5,
  },
  name: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    textShadowColor: "rgba(0, 0, 0, 0.75)", 
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
  },
  cuisine: {
    color: "white",
    fontSize: 14,
    textShadowColor: "rgba(0, 0, 0, 0.75)", 
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
  },
  rating: {
    color: "white",
    fontSize: 14,
    textShadowColor: "rgba(0, 0, 0, 0.75)", 
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
  },
  distanceContainer: {
    position: "absolute",
    bottom: 10,
    right: 10,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 5,
  },
  distanceText: {
    color: "gold",
    fontSize: 12,
    fontWeight: "bold",
  },
});
