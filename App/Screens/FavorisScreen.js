import React, { useState, useCallback } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Text,
  Image,
  RefreshControl,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import colors from "../styles/colors";

import restaurantData from "../../assets/data/restaurantData";

export default function FavorisScreen({ navigation }) {
  const [favorites, setFavorites] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  // Function to handle favoriting an item
  const toggleFavorite = (id) => {
    if (favorites.includes(id)) {
      // Item already favorited, so remove it from favorites
      setFavorites(favorites.filter((favId) => favId !== id));
    } else {
      // Item not favorited, so add it to favorites
      setFavorites([...favorites, id]);
    }
  };

  // Function to check if an item is favorited
  const isFavorite = (id) => {
    return favorites.includes(id);
  };

  // Function to handle pull down to refresh
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    // Perform data fetching or any other actions
    // Once done, set refreshing to false to stop the refreshing indicator
    setTimeout(() => {
      setRefreshing(false);
    }, 2000); // Simulating data fetching delay
  }, []);

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
            <TouchableOpacity
              onPress={() => toggleFavorite(item.id)}
              style={styles.favoriteButton}
            >
              <Ionicons
                name={!isFavorite(item.id) ? "heart" : "heart-outline"}
                size={25}
                color={!isFavorite(item.id) ? colors.primary : "gray"}
              />
            </TouchableOpacity>
          </TouchableOpacity>
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
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
  list: {
    flex: 1,
  },
  itemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
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
  favoriteButton: {
    padding: 5,
  },
});
