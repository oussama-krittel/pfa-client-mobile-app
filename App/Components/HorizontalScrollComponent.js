import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import Card from "./Card";

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
            onPress={() => navigation.navigate("RestorantScreen",{id:card.id})}
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
    fontSize: 18,
    fontWeight: "bold",
    margin: 20,
  },
});
