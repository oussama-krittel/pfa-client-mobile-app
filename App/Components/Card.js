import React from "react";
import { StyleSheet, View, Text } from "react-native";

function Card({ card }) {
  return (
    <View style={styles.card}>
      {/* Render your card component here */}
      <Text>{card}</Text>
    </View>
  );
}

export default Card;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    height: 160,
    borderRadius: 10,
    padding: 20,
    marginRight: 15,
    width: 260, // Adjust according to your card content
    // Add more styles as needed for your card
  },
});
