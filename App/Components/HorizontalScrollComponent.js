import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import Card from "./Card";
import colors from "../styles/colors";

export default function HorizontalScrollComponent({
  title,
  cards,
  navigation,
}) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        {cards.map((card, index) => (
          <Card
            key={index}
            card={card}
            onPress={() =>
              navigation.navigate("RestorantScreen", { id: card.id })
            }
          />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    padding: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 12,
    color: colors.secondary,
    textShadowColor: "rgba(0, 0, 0, 0.25)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
    letterSpacing: 0.5,
  },
});
