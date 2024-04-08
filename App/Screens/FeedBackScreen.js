import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import colors from "../styles/colors";

function FeedBackScreen({ navigation }) {
  const [feedbackText, setFeedbackText] = useState("");
  const [rating, setRating] = useState(0);

  const handleFeedbackSubmit = () => {
    if (feedbackText.trim() === "" || rating === 0) {
      Alert.alert("Error", "Please provide both feedback text and rating");
      return;
    }
    // Handle feedback submission logic here, for now, just show an alert
    Alert.alert("Thank You", "Thanks for your feedback!");
    // Navigate back
    navigation.goBack();
  };

  const handleStarPress = (selectedRating) => {
    setRating(selectedRating);
  };

  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <TouchableOpacity key={i} onPress={() => handleStarPress(i)}>
          <FontAwesome
            name={i <= rating ? "star" : "star-o"}
            size={30}
            color={colors.secondary}
            style={{ marginRight: 5 }}
          />
        </TouchableOpacity>
      );
    }
    return stars;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>
        Leave Feedback or Notes to Improve Our Service
      </Text>
      <TextInput
        style={styles.textInput}
        placeholder="Your feedback here..."
        multiline
        numberOfLines={3}
        value={feedbackText}
        onChangeText={(text) => setFeedbackText(text)}
      />
      <View style={styles.starContainer}>{renderStars()}</View>
      <TouchableOpacity
        style={styles.submitButton}
        onPress={handleFeedbackSubmit}
      >
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding:25,
    paddingHorizontal: 20,
    backgroundColor: "#f8f8f8",
  },
  headerText: {
    fontSize: 20,
    marginBottom: 20,
    fontWeight: "bold",
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    width: "100%",
    marginBottom: 20,
    minHeight: 160,
    borderRadius: 15,
    textAlignVertical: "top", // For Android
    textAlign: "left", // For iOS
  },
  starContainer: {
    flexDirection: "row",
    marginBottom: 50,
  },
  submitButton: {
    backgroundColor: colors.primary,
    paddingVertical: 10,
    width: "100%",
    alignItems: "center",
    borderRadius: 15,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
  },
});

export default FeedBackScreen;
