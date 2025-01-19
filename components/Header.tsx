import { View, Image, StyleSheet, TouchableOpacity, Text } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";

const Header = () => {
  return (
    <View style={styles.container}>
      <View style={styles.userInf}>
        <Image
          source={require("@/assets/images/avatar.png")}
          style={styles.userImg}
        />
        <View style={{ gap: 3 }}>
          <Text style={styles.welcomeText}>Hola</Text>
          <Text style={styles.userName}>Pipedev!</Text>
        </View>
      </View>
      <TouchableOpacity onPress={() => {}}>
        <Ionicons name="notifications-outline" size={24} color={Colors.black} />
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
  welcomeText: {
    fontSize: 12,
    color: Colors.darkGrey,
  },
  userName: {
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.black,
  },
});
