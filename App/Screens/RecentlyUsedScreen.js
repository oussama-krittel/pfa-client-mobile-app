import React from "react";
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Text,
  Image,
} from "react-native";
import { useSelector } from "react-redux";

export default function RecentlyUsedScreen({ navigation }) {
  const restaurantData = useSelector((state) => state.restaurants);

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.list}
        data={restaurantData}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.itemContainer}
            onPress={() =>
              navigation.navigate("RestorantScreen", { id: item.id })
            }
          >
            <Image source={item.coverImage} style={styles.coverImage} />
            <View style={styles.detailsContainer}>
              <View style={styles.textContainer}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Image source={item.logo} style={styles.logo} />
                  <Text style={styles.name}>{item.name}</Text>
                </View>
                <Text style={styles.cuisine}>{item.cuisine}</Text>
                <Text style={styles.rating}>Rating: {item.rating}</Text>
                <Text style={styles.priceRange}>
                  Price Range: {item.priceRange}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#fff",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  list: {
    flex: 1,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
  },
  coverImage: {
    width: 100,
    height: 100,
    marginRight: 10,
    borderRadius: 5,
  },
  detailsContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  logo: {
    width: 33,
    height: 33,
    margin: 7,
    marginBottom: 3,
    marginLeft: 0,
    borderRadius: 25,
  },
  textContainer: {
    marginLeft: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
  },
  location: {
    fontSize: 14,
    color: "#555",
  },
  cuisine: {
    fontSize: 14,
    color: "#555",
  },
  rating: {
    fontSize: 14,
    color: "#555",
  },
  priceRange: {
    fontSize: 14,
    color: "#555",
  },
});
