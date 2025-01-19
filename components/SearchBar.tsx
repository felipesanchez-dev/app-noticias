import { StyleSheet, TextInput, View } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";

const SearchBar = () => {
  return (
    <View style={styles.container}>
      <View style={styles.searchBar}>
        <Ionicons
          name="search-outline"
          size={20}
          color={Colors.lightGrey}
          style={styles.icon}
        />
        <TextInput
          placeholder="Buscar Noticias"
          placeholderTextColor={Colors.lightGrey}
          style={styles.searchText}
          autoCapitalize="none"
        />
      </View>
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginBottom: 20,
  },
  searchBar: {
    backgroundColor: "#E4E4E4",
    paddingHorizontal: 10,
    paddingVertical: 12,
    borderRadius: 25,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  icon: {
    alignSelf: "center",
  },
  searchText: {
    fontSize: 14,
    flex: 1,
    color: Colors.darkGrey,
  },
});
