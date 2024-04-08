import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  Alert,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons"; // Import Ionicons
import { hexToRgb } from "../styles/hexToRgb";

import AppText from "../Components/AppText";
import colors from "../styles/colors";

const SecurityScreen = ({ navigation }) => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);
  const [error, setError] = useState("");

  const handlePasswordSubmit = () => {
    if (oldPassword !== "123456789") {
      setError("Incorrect old password");
      return;
    }

    if (newPassword !== confirmNewPassword) {
      setError("New password and confirmation do not match");
      return;
    }

    if (
      !/\d/.test(newPassword) ||
      !/[a-zA-Z]/.test(newPassword) ||
      !/[!@#$%^&*(),.?":{}|<>]/.test(newPassword)
    ) {
      setError(
        "New password must contain at least one letter, one digit, and one special character"
      );
      return;
    }

    // Success: Password changed
    Alert.alert("Success", "Password changed successfully", [
      { text: "OK", onPress: () => navigation.navigate("Landing") },
    ]);
  };

  return (
    <>
      <View style={styles.Topheader}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.navigate("Home")}
        >
          <Ionicons name="arrow-back-outline" size={28} color="white" />
        </TouchableOpacity>
        <AppText style={styles.TopheaderTitle}>Password & security</AppText>
        <View style={styles.rightEmptySpace} />
      </View>
      <View style={styles.container}>
        <Text style={styles.header}>Change Password</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Old Password"
            secureTextEntry={!showOldPassword}
            value={oldPassword}
            onChangeText={setOldPassword}
          />
          <TouchableOpacity
            onPress={() => setShowOldPassword(!showOldPassword)}
            style={styles.eyeIcon}
          >
            <FontAwesome
              name={showOldPassword ? "eye-slash" : "eye"}
              size={20}
              color={colors.medium}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="New Password"
            secureTextEntry={!showNewPassword}
            value={newPassword}
            onChangeText={setNewPassword}
          />
          <TouchableOpacity
            onPress={() => setShowNewPassword(!showNewPassword)}
            style={styles.eyeIcon}
          >
            <FontAwesome
              name={showNewPassword ? "eye-slash" : "eye"}
              size={20}
              color={colors.medium}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Confirm New Password"
            secureTextEntry={!showConfirmNewPassword}
            value={confirmNewPassword}
            onChangeText={setConfirmNewPassword}
          />
          <TouchableOpacity
            onPress={() => setShowConfirmNewPassword(!showConfirmNewPassword)}
            style={styles.eyeIcon}
          >
            <FontAwesome
              name={showConfirmNewPassword ? "eye-slash" : "eye"}
              size={20}
              color={colors.medium}
            />
          </TouchableOpacity>
        </View>
        {error ? <Text style={styles.error}>{error}</Text> : null}
        <TouchableOpacity
          style={styles.submitButton}
          onPress={handlePasswordSubmit}
        >
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 45,
    color: colors.secondary,
  },
  Topheader: {
    flexDirection: "row",
    alignItems: "center",
    height: 85,
    paddingHorizontal: 20,
    paddingTop: 25,
    backgroundColor: "rgba(" + hexToRgb(colors.secondary) + ", 0.8)",
    marginBottom: 10,
  },
  backButton: {
    width: 50,
    height: "100%",
    justifyContent: "center",
  },
  TopheaderTitle: {
    fontSize: 22,
    color: "white",
    fontWeight: "bold",
    flex: 1,
    textAlign: "center",
  },
  rightEmptySpace: {
    width: 40,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: colors.medium,
    padding: 14,
    borderRadius: 9,
    marginRight: 10,
    marginBottom: 14,
  },
  eyeIcon: {
    margin: 8,
    position: "absolute",
    right: 10,
    top:10,
  },
  error: {
    color: "red",
    marginBottom: 20,
  },
  submitButton: {
    backgroundColor: colors.primary,
    width: "100%",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 5,
  },
  submitButtonText: {
    color: "white",
    fontSize: 19,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default SecurityScreen;
