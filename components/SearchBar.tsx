import React, { useContext } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import { ThemeContext } from "@/context/ThemeContext";

type Props = {
  withHorizontalPadding: boolean;
  setSearchQuery: (query: string) => void;
};

const SearchBar = ({ withHorizontalPadding, setSearchQuery }: Props) => {
  const { isDarkMode } = useContext(ThemeContext);

  return (
    <View
      style={[
        styles.container,
        withHorizontalPadding && { paddingHorizontal: 20 },
      ]}
    >
      <View style={[styles.searchBar, isDarkMode && styles.searchBarDark]}>
        <Ionicons
          name="search-outline"
          size={20}
          color={Colors.lightGrey}
          style={styles.icon}
        />
        <TextInput
          placeholder="Buscar Noticias"
          placeholderTextColor={Colors.lightGrey}
          style={[styles.searchText, isDarkMode && styles.searchTextDark]}
          autoCapitalize="none"
          onChangeText={(query) => setSearchQuery(query)}
        />
      </View>
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  container: {
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
  searchBarDark: {
    backgroundColor: "#333333", // Color de fondo para el modo oscuro
  },
  icon: {
    alignSelf: "center",
  },
  searchText: {
    fontSize: 14,
    flex: 1,
    color: Colors.darkGrey,
  },
  searchTextDark: {
    color: Colors.white, // Color del texto en modo oscuro
  },
});
