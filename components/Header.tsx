import React, { useContext } from "react";
import { View, Image, StyleSheet, TouchableOpacity, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import { ThemeContext } from "@/context/ThemeContext";

const Header = () => {
  const { isDarkMode } = useContext(ThemeContext);

  return (
    <View style={[styles.container, isDarkMode && styles.containerDark]}>
      <View style={styles.userInf}>
        <Image
          source={require("@/assets/images/avatar.png")}
          style={styles.userImg}
        />
        <View style={styles.userTextContainer}>
          <Text style={[styles.welcomeText, isDarkMode && styles.welcomeTextDark]}>
            Hola
          </Text>
          <Text style={[styles.userName, isDarkMode && styles.userNameDark]}>
            Pipedev!
          </Text>
        </View>
      </View>
      <TouchableOpacity onPress={() => {}}>
        <Ionicons
          name="notifications-outline"
          size={24}
          color={isDarkMode ? Colors.white : Colors.black}
        />
      </TouchableOpacity>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    backgroundColor: Colors.white,
  },
  containerDark: {
    backgroundColor: "#333333",
  },
  userImg: {
    width: 50,
    height: 50,
    borderRadius: 30,
  },
  userInf: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  userTextContainer: {
    gap: 3,
  },
  welcomeText: {
    fontSize: 12,
    color: Colors.darkGrey,
  },
  welcomeTextDark: {
    color: Colors.lightGrey,
  },
  userName: {
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.black,
  },
  userNameDark: {
    color: Colors.white,
  },
});
