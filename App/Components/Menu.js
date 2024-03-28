import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  SectionList,
} from "react-native";
import colors from "../styles/colors";

export default function Menu({ DATA, navigation }) {
  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() => navigation.navigate("dishScreen", { item: item })}
    >
      <View style={{ flex: 1 }}>
        <Text style={styles.dish}>{item.name}</Text>
        <Text style={styles.dishText}>{item.info}</Text>
        <Text style={styles.dishText}>${item.price}</Text>
      </View>
      <Image source={item.img} style={styles.dishImage} />
    </TouchableOpacity>
  );

  return (
    <SectionList
      contentContainerStyle={{ paddingBottom: 50 }}
      keyExtractor={(item) => `${item.id}`}
      scrollEnabled={false}
      sections={DATA}
      renderItem={renderItem}
      ItemSeparatorComponent={() => (
        <View
          style={{
            marginHorizontal: 16,
            height: 1,
            backgroundColor: colors.light,
          }}
        />
      )}
      SectionSeparatorComponent={() => (
        <View style={{ height: 2, backgroundColor: colors.light }} />
      )}
      renderSectionHeader={({ section: { title } }) => (
        <Text style={styles.sectionHeader}>{title}</Text>
      )}
      style={{ backgroundColor: colors.light }}
    />
  );
}

const styles = StyleSheet.create({
  sectionHeader: {
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 40,
    margin: 16,
  },
  item: {
    backgroundColor: "#fff",
    padding: 16,
    flexDirection: "row",
  },
  dishImage: {
    height: 80,
    width: 80,
    borderRadius: 4,
  },
  dish: {
    fontSize: 16,
    fontWeight: "bold",
  },
  dishText: {
    fontSize: 14,
    color: colors.dark,
    paddingVertical: 4,
  },
});
