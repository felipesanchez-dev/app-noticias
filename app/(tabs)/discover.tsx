import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import SearchBar from "@/components/SearchBar"
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Colors } from '@/constants/Colors'
import CheckBox from '@/components/CheckBox'
import { useNewsCategories } from '@/hooks/useNewsCategories'
import { useNewsCountries } from '@/hooks/useNewsCountry'

type Props = {}

const Page = (props: Props) => {
  const { top: safetop } = useSafeAreaInsets();
  const { newsCategories, toggleNewsCategory } = useNewsCategories();
  const { newsCountries, toggleNewsCountry } = useNewsCountries();
  return (
    <View style={[styles.container, 
    {paddingTop: safetop + 20}]}>
      <SearchBar withHorizontalPadding={false} />
      <Text style={styles.title}>Categorias</Text>
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
      <Text style={styles.title}>Paises</Text>
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
    </View>
  );
};

export default Page

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
});