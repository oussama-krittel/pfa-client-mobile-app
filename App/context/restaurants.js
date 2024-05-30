import { createSlice } from "@reduxjs/toolkit";
const image1 = require("../../assets/image1.png");
const image2 = require("../../assets/image2.jpeg");
const image3 = require("../../assets/image3.jpeg");
const image4 = require("../../assets/image4.jpeg");
const images = require("../../assets/images.jpeg");
const logo1 = require("../../assets/logo1.jpeg");
const logo2 = require("../../assets/logo2.png");
const logo3 = require("../../assets/logo3.png");
const logo = require("../../assets/logo.jpeg");
const initialState = [
  {
    id: 1,
    name: "Delizioso Italiano",
    location: { latitude: 31.7917, longitude: -7.0926 },
    coverImage: image1,
    logo: logo,
    cuisine: "Italian",
    rating: 4.5,
    description:
      "A cozy restaurant serving delicious food from around the world.",
    instagram: "_ilal_",
    phoneNumber: "1234567890",
    email: "info@deliciousbites.com",
    likes: 1000,
    priceRange: "$$$",
    points: 61,
  },
  {
    id: 2,
    name: "Taco Paradise",
    location: { latitude: 33.9716, longitude: -6.8498 },
    coverImage: image3,
    logo: logo2,
    cuisine: "Mexican",
    rating: 4.2,
    description:
      "A cozy restaurant serving delicious food from around the world.",
    instagram: "_ilal_",
    phoneNumber: "1234567890",
    email: "info@deliciousbites.com",
    likes: 1000,
    priceRange: "$$",
    points: 89,
  },
  {
    id: 3,
    name: "Sushi Haven",
    location: { latitude: 30.4278, longitude: -9.5981 },
    coverImage: image4,
    logo: logo1,
    cuisine: "Japanese",
    rating: 4.8,
    description:
      "A cozy restaurant serving delicious food from around the world.",
    instagram: "_ilal_",
    phoneNumber: "1234567890",
    email: "info@deliciousbites.com",
    likes: 1000,
    priceRange: "$$$$",
    points: 99,
  },
  {
    id: 4,
    name: "Burger Joint",
    location: { latitude: 34.0209, longitude: -6.8411 },
    coverImage: images,
    logo: logo2,
    cuisine: "American",
    rating: 4.0,
    description:
      "A cozy restaurant serving delicious food from around the world.",
    instagram: "_ilal_",
    phoneNumber: "1234567890",
    email: "info@deliciousbites.com",
    likes: 1000,
    priceRange: "$$",
    points: 190,
  },
  {
    id: 5,
    name: "Curry House",
    location: { latitude: 31.6333, longitude: -8.0 },
    coverImage: image2,
    logo: logo3,
    cuisine: "Indian",
    rating: 4.3,
    description:
      "A cozy restaurant serving delicious food from around the world.",
    instagram: "_ilal_",
    phoneNumber: "1234567890",
    email: "info@deliciousbites.com",
    likes: 1000,
    priceRange: "$$",
    points: 0,
  },
  {
    id: 6,
    name: "Seafood Delight",
    location: { latitude: 32.3106, longitude: -9.2362 },
    coverImage: image4,
    logo: logo1,
    cuisine: "Seafood",
    rating: 4.7,
    description:
      "A cozy restaurant serving delicious food from around the world.",
    instagram: "_ilal_",
    phoneNumber: "1234567890",
    email: "info@deliciousbites.com",
    likes: 1000,
    priceRange: "$$$",
    points: 289,
  },
  {
    id: 7,
    name: "Pho Noodle House",
    location: { latitude: 31.6356, longitude: -8.0083 },
    coverImage: image3,
    logo: logo,
    cuisine: "Vietnamese",
    rating: 4.3,
    description:
      "A cozy restaurant serving delicious food from around the world.",
    instagram: "_ilal_",
    phoneNumber: "1234567890",
    email: "info@deliciousbites.com",
    likes: 1000,
    priceRange: "$$",
    points: 1,
  },
  {
    id: 166,
    name: "Pizza Palace",
    location: { latitude: 32.2995, longitude: -9.2371 },
    coverImage: image4,
    logo: logo3,
    cuisine: "Pizza",
    rating: 4.6,
    description:
      "A cozy restaurant serving delicious food from around the world.",
    instagram: "_ilal_",
    phoneNumber: "1234567890",
    email: "info@deliciousbites.com",
    likes: 1000,
    priceRange: "$$",
    points: 89,
  },
  {
    id: 167,
    name: "Barbecue Heaven",
    location: { latitude: 30.4333, longitude: -9.6 },
    coverImage: image3,
    logo: logo2,
    cuisine: "Barbecue",
    rating: 4.7,
    description:
      "A cozy restaurant serving delicious food from around the world.",
    instagram: "_ilal_",
    phoneNumber: "1234567890",
    email: "info@deliciousbites.com",
    likes: 1000,
    priceRange: "$$$",
    points: 18,
  },
  {
    id: 168,
    name: "Mediterranean Delight",
    location: { latitude: 35.6751, longitude: -5.911 },
    coverImage: images,
    logo: logo,
    cuisine: "Mediterranean",
    rating: 4.4,
    description:
      "A cozy restaurant serving delicious food from around the world.",
    instagram: "_ilal_",
    phoneNumber: "1234567890",
    email: "info@deliciousbites.com",
    likes: 1000,
    priceRange: "$$$",
    points: 80,
  },
  {
    id: 169,
    name: "Vegetarian Delight",
    location: { latitude: 30.4515, longitude: -9.5005 },
    coverImage: images,
    logo: logo1,
    cuisine: "Vegetarian",
    rating: 4.5,
    description:
      "A cozy restaurant serving delicious food from around the world.",
    instagram: "_ilal_",
    phoneNumber: "1234567890",
    email: "info@deliciousbites.com",
    likes: 1000,
    priceRange: "$$",
    points: 819,
  },
  {
    id: 170,
    name: "Steakhouse Supreme",
    location: { latitude: 30.4667, longitude: -9.6 },
    coverImage: image4,
    logo: logo2,
    cuisine: "Steakhouse",
    rating: 4.8,
    description:
      "A cozy restaurant serving delicious food from around the world.",
    instagram: "_ilal_",
    phoneNumber: "1234567890",
    email: "info@deliciousbites.com",
    likes: 1000,
    priceRange: "$$$",
    points: 319,
  },
];

const restaurantSlice = createSlice({
  name: "restaurants",
  initialState,
  reducers: {
    addPoints: (state, action) => {
      const { id, points } = action.payload;
      const restaurant = state.find((restaurant) => restaurant.id === id);
      if (restaurant) {
        restaurant.points += points;
      }
    },
    reducePoints: (state, action) => {
      const { id, points } = action.payload;
      const restaurant = state.find((restaurant) => restaurant.id === id);
      if (restaurant) {
        restaurant.points -= points;
      }
    },
  },
});

export const { addPoints, reducePoints } = restaurantSlice.actions;
export default restaurantSlice.reducer;




