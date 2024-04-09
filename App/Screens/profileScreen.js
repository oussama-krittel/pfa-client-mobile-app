import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Platform,
  Alert,
  Linking,
  ScrollView,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import * as ImagePicker from "expo-image-picker";

import colors from "../styles/colors";
import { hexToRgb } from "../styles/hexToRgb";
import AppText from "../Components/AppText";

const initialUserData = {
  firstName: "John",
  lastName: "Doe",
  email: "johndoe@example.com",
  phoneNumber: "123-456-7890",
  birthdate: "01/01/1990",
  gender: "",
};

export default function ProfileScreen({ navigation }) {
  const [userData, setUserData] = useState(initialUserData);
  const [isEditing, setIsEditing] = useState(false);
  const [isRequiredVisible, setIsRequiredVisible] = useState(false);
  const [profileImage, setProfileImage] = useState(null);

  const requestMediaLibraryPermission = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permission Required",
        "Please grant permission to access your media library to change the profile image.",
        [
          {
            text: "Cancel",
            style: "cancel",
          },
          {
            text: "Go to Settings",
            onPress: () => Linking.openSettings(),
          },
        ]
      );
      return false;
    }
    return true;
  };

  const handleEditPress = () => {
    if (isEditing) {
      setIsEditing(false);
      setIsRequiredVisible(false);
    } else {
      setIsEditing(true);
    }
  };

  const handleSavePress = () => {
    if (!isRequiredFieldsFilled()) {
      setIsRequiredVisible(true);
      return;
    }

    setIsRequiredVisible(false);
    setIsEditing(false);
    console.log("Updated user data:", userData);
    console.log("Profile image:", profileImage);
  };

  const handleCancelPress = () => {
    setUserData(initialUserData);
    setIsEditing(false);
    setIsRequiredVisible(false);
    setProfileImage(null); // Reset profile image on cancel
  };

  const isRequiredFieldsFilled = () => {
    if (!userData.firstName || !userData.lastName || !userData.email) {
      return false;
    }
    return true;
  };

  const handleChangeText = (key, value) => {
    setUserData({
      ...userData,
      [key]: value,
    });
  };

  const pickImage = async () => {
    const granted = await requestMediaLibraryPermission();
    if (granted) {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.cancelled) {
        console.log(result.uri);
        setProfileImage(result.uri);
      }
    }
  };

  return (
    <ScrollView>
      <View style={styles.Topheader}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.navigate("Home")}
        >
          <Ionicons name="arrow-back-outline" size={28} color="white" />
        </TouchableOpacity>
        <AppText style={styles.TopheaderTitle}>Account</AppText>
        <View style={styles.rightEmptySpace} />
      </View>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Personal Details</Text>
          {isEditing ? (
            <View style={styles.editButtons}>
              <TouchableOpacity onPress={handleCancelPress}>
                <FontAwesome
                  name="times"
                  size={24}
                  color={colors.primary}
                  style={styles.icon}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={handleSavePress}>
                <FontAwesome
                  name="check"
                  size={24}
                  color={colors.secondary}
                  style={styles.icon}
                />
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity onPress={handleEditPress}>
              <FontAwesome name="pencil" size={24} color={colors.medium} />
            </TouchableOpacity>
          )}
        </View>
        {isEditing && isRequiredVisible && (
          <Text style={styles.requiredText}>* Required information</Text>
        )}
        <TouchableOpacity onPress={isEditing ? pickImage : null}>
          <View style={styles.profileImageContainer}>
            {profileImage ? (
              <Image
                source={{ uri: profileImage }}
                style={styles.profileImage}
              />
            ) : (
              <FontAwesome
                name="user-circle"
                size={120}
                color={colors.medium}
              />
            )}
            {isEditing && (
              <FontAwesome
                name="pencil"
                size={24}
                color={colors.secondary}
                style={styles.editIcon}
              />
            )}
          </View>
        </TouchableOpacity>
        <View style={styles.inputContainer}>
          <Text style={styles.inputTitle}>
            First Name{isEditing && <Text style={styles.required}> *</Text>}
          </Text>
          <TextInput
            style={styles.input}
            editable={isEditing}
            value={userData.firstName}
            onChangeText={(text) => handleChangeText("firstName", text)}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputTitle}>
            Last Name{isEditing && <Text style={styles.required}> *</Text>}
          </Text>
          <TextInput
            style={styles.input}
            editable={isEditing}
            value={userData.lastName}
            onChangeText={(text) => handleChangeText("lastName", text)}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputTitle}>
            Email{isEditing && <Text style={styles.required}> *</Text>}
          </Text>
          <TextInput
            style={styles.input}
            editable={isEditing}
            value={userData.email}
            onChangeText={(text) => handleChangeText("email", text)}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputTitle}>Phone Number</Text>
          <TextInput
            style={styles.input}
            editable={isEditing}
            value={userData.phoneNumber}
            onChangeText={(text) => handleChangeText("phoneNumber", text)}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputTitle}>Birthdate</Text>
          <TextInput
            style={styles.input}
            editable={isEditing}
            value={userData.birthdate}
            onChangeText={(text) => handleChangeText("birthdate", text)}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputTitle}>Gender</Text>
          <Picker
            style={styles.input}
            selectedValue={userData.gender}
            onValueChange={(itemValue) => handleChangeText("gender", itemValue)}
            enabled={isEditing}
          >
            <Picker.Item label="Select Gender" value="" />
            <Picker.Item label="Male" value="male" />
            <Picker.Item label="Female" value="female" />
          </Picker>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
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
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  requiredText: {
    color: "red",
    marginBottom: 10,
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputTitle: {
    color: colors.medium,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    width: "100%",
    borderRadius: 5,
  },
  required: {
    color: "red",
  },
  editButtons: {
    flexDirection: "row",
  },
  icon: {
    marginLeft: 15,
  },
  profileImageContainer: {
    alignItems: "center",
    marginBottom: 20,
    position: "relative",
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  editIcon: {
    position: "absolute",
    bottom: 10,
    right: 119,
    backgroundColor: "white",
    borderRadius: 12,
    padding: 3,
  },
});
