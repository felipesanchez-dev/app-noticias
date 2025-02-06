import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import SearchBar from "@/components/SearchBar";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors } from '@/constants/Colors';
import CheckBox from '@/components/CheckBox';
import { useNewsCategories } from '@/hooks/useNewsCategories';
import { useNewsCountries } from '@/hooks/useNewsCountry';
import { Link } from 'expo-router';

const Page = () => {
  const { top: safetop } = useSafeAreaInsets();
  const { newsCategories, toggleNewsCategory } = useNewsCategories();
  const { newsCountries, toggleNewsCountry } = useNewsCountries();
  const [ searchQuery, setSearchQuery ] = useState("");

  // Se derivan las categorías y países seleccionados a partir de los hooks:
  const selectedCategories = newsCategories
    .filter(item => item.selected)
    .map(item => item.slug);
    
  const selectedCountries = newsCountries
    .filter(item => item.selected)
    .map(item => item.code);

  return (
    <View style={[styles.container, { paddingTop: safetop + 20 }]}>
      <SearchBar withHorizontalPadding={false} setSearchQuery={setSearchQuery} />
      
      <Text style={styles.title}>Categorías</Text>
      <View style={styles.listContainer}>
        {newsCategories.map((item) => (
          <CheckBox 
            key={item.id} 
            label={item.title} 
            checked={item.selected}
            onPress={() => {
              toggleNewsCategory(item.id);
            }}
          />
        ))}
      </View>

      <Text style={styles.title}>Países</Text>
      <View style={styles.listContainer}>
        {newsCountries.map((item, index) => (
          <CheckBox 
            key={index} 
            label={item.name} 
            checked={item.selected}
            onPress={() => {
              toggleNewsCountry(index);
            }}
          />
        ))}
      </View>

      <Link
        href={{
          pathname: `/news/search`,
          // Se envían los parámetros: la query, y las categorías y países
          // seleccionados convertidos a cadena separada por comas
          params: { 
            query: searchQuery, 
            category: selectedCategories.join(','),
            country: selectedCountries.join(',')
          },
        }}
        asChild
      >
        <TouchableOpacity style={styles.searchBtn}>
          <Text style={styles.searchText}>Buscar</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
};

export default Page;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "800",
    color: Colors.black,
    marginBottom: 10,
  },
  listContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 16,
    marginTop: 12,
    marginBottom: 12,
  },
  searchBtn: {
    backgroundColor: Colors.tint,
    alignItems: "center",
    padding: 14,
    borderRadius: 20,
    marginVertical: 10
  },
  searchText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: "600",
  }
});
