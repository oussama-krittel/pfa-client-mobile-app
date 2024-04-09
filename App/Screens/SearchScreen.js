import React, { useState, useEffect, useRef } from "react";
import {
  View,
  TextInput,
  FlatList,
  TouchableOpacity,
  Text,
  StyleSheet,
  Image,
} from "react-native";

import restaurantData from "../../assets/data/restaurantData";

function SearchScreen({ navigation }) {
  const [searchText, setSearchText] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const textInputRef = useRef(null);

  useEffect(() => {
    // Focus on the text input when the component mounts
    const focusListener = navigation.addListener("focus", () => {
      textInputRef.current.focus();
    });

    return focusListener;
  }, [navigation]);

  // Function to filter and sort suggestions based on search text
  const updateSearch = (text) => {
    setSearchText(text);
    const filteredRestaurants = restaurantData.filter((restaurant) =>
      restaurant.name.toLowerCase().startsWith(text.toLowerCase())
    );
    const remainingRestaurants = restaurantData.filter(
      (restaurant) =>
        restaurant.name.toLowerCase().includes(text.toLowerCase()) &&
        !restaurant.name.toLowerCase().startsWith(text.toLowerCase())
    );
    const sortedSuggestions = [...filteredRestaurants, ...remainingRestaurants];
    setSuggestions(sortedSuggestions);
  };

  return (
    <View style={styles.container}>
      <TextInput
        ref={textInputRef}
        style={styles.input}
        placeholder="Search for restaurants..."
        onChangeText={updateSearch}
        value={searchText}
      />
      <FlatList
        style={styles.list}
        data={suggestions}
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
    borderColor: "#ddd", // Change border color
    borderWidth: 1,
    borderRadius: 8, // Increase border radius
    paddingHorizontal: 15, // Increase horizontal padding
    marginBottom: 20, // Increase bottom margin
    fontSize: 16, // Increase font size
  },
  list: {
    flex: 1,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20, // Increase bottom margin
    borderWidth: 1,
    borderColor: "#ddd", // Change border color
    borderRadius: 10, // Increase border radius
    padding: 15, // Increase padding
    backgroundColor: "#f9f9f9", // Add background color
  },
  coverImage: {
    width: 100,
    height: 100,
    marginRight: 15, // Increase right margin
    borderRadius: 10, // Increase border radius
  },
  detailsContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  logo: {
    width: 33,
    height: 33,
    margin:7,
    marginBottom:3,
    marginLeft:0,
    borderRadius: 25,
  },
  textContainer: {
    marginLeft: 15, // Increase left margin
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333", // Change text color
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

export default SearchScreen;
