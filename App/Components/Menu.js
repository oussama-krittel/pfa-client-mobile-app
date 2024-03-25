import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  SectionList,
} from "react-native";

import { Link } from "@react-navigation/native";
import colors from "../styles/colors";

export default function Menu() {
  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.item}>
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

//  *******************************************     data       ***********************************

const DATA = [
  {
    title: "Starters",
    data: [
      {
        id: 1,
        name: "Garlic Bread",
        info: "Toasted bread with garlic",
        price: 5.99,
        img: require("../../assets/image1.png"),
      },
      {
        id: 2,
        name: "Caesar Salad",
        info: "Fresh salad with Caesar dressing",
        price: 8.99,
        img: require("../../assets/image2.jpeg"),
      },
      // Add more starter items here if needed
      {
        id: 3,
        name: "Bruschetta",
        info: "Toasted bread topped with tomatoes, basil, and olive oil",
        price: 6.99,
        img: require("../../assets/image3.jpeg"), // Reusing the third image
      },
      {
        id: 4,
        name: "Mozzarella Sticks",
        info: "Fried mozzarella cheese sticks with marinara sauce",
        price: 7.99,
        img: require("../../assets/image4.jpeg"), // Reusing the fourth image
      },
    ],
  },
  {
    title: "Main Courses",
    data: [
      {
        id: 5,
        name: "Spaghetti Bolognese",
        info: "Classic Italian pasta dish",
        price: 12.99,
        img: require("../../assets/image3.jpeg"),
      },
      {
        id: 6,
        name: "Grilled Salmon",
        info: "Freshly grilled salmon fillet",
        price: 15.99,
        img: require("../../assets/image4.jpeg"),
      },
      // Add more main course items here if needed
      {
        id: 7,
        name: "Chicken Parmesan",
        info: "Breaded chicken topped with marinara sauce and melted cheese",
        price: 14.99,
        img: require("../../assets/image1.png"), // Reusing the first image
      },
      {
        id: 8,
        name: "Vegetable Stir Fry",
        info: "Assorted vegetables stir-fried in a savory sauce",
        price: 11.99,
        img: require("../../assets/image2.jpeg"), // Reusing the second image
      },
    ],
  },
  // Add more sections if needed
  {
    title: "Desserts",
    data: [
      {
        id: 9,
        name: "Chocolate Cake",
        info: "Rich chocolate cake with icing",
        price: 7.99,
        img: require("../../assets/image1.png"),
      },
      {
        id: 10,
        name: "Tiramisu",
        info: "Classic Italian dessert with coffee flavor",
        price: 9.99,
        img: require("../../assets/image2.jpeg"),
      },
      // Add more dessert items here if needed
      {
        id: 11,
        name: "Cheesecake",
        info: "Creamy cheesecake with a graham cracker crust",
        price: 8.99,
        img: require("../../assets/image3.jpeg"), // Reusing the third image
      },
      {
        id: 12,
        name: "Fruit Salad",
        info: "Fresh fruit salad with honey-lime dressing",
        price: 6.99,
        img: require("../../assets/image4.jpeg"), // Reusing the fourth image
      },
    ],
  },
];
