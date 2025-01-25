import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from "react-native";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Header from "@/components/Header";
import SearchBar from "@/components/SearchBar";
import { NewsDataType } from "@/types";
import BreakingNews from "@/components/BreakingNews";
import Categories from "@/components/Categories";
import NewsList from "@/components/NewsList";

type Props = {};

const Page: React.FC<Props> = () => {
  const { top: safeTop } = useSafeAreaInsets();
  const [breakingNews, setBreakingNews] = useState<NewsDataType[]>([]);
  const [news, setNews] = useState<NewsDataType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      setIsLoading(true);
      // Llama ambas APIs de manera paralela para optimizar
      const [breakingNewsResponse, generalNewsResponse] = await Promise.all([
        axios.get(
          `https://newsdata.io/api/1/news?apikey=${process.env.EXPO_PUBLIC_API_KEY}&language=es&image=1&removeduplicate=1&size=5`
        ),
        axios.get(
          `https://newsdata.io/api/1/news?apikey=${process.env.EXPO_PUBLIC_API_KEY}&language=es&image=1&removeduplicate=1&size=10`
        ),
      ]);
      // Verifica si los datos son válidos antes de asignarlos
      if (breakingNewsResponse && breakingNewsResponse.data) {
        setBreakingNews(breakingNewsResponse.data.results);
      }
      if (generalNewsResponse && generalNewsResponse.data) {
        setNews(generalNewsResponse.data.results);
      }
    } catch (err: any) {
      console.error("Error al obtener las noticias:", err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const onCatChanged = (category: string) => {
    console.log("Categoría seleccionada:", category);
  };

  return (
    <ScrollView style={[styles.container, { paddingTop: safeTop }]}>
      <Header />
      <SearchBar />
      {isLoading ? (
        <ActivityIndicator size={"large"} />
      ) : (
        <>
          <BreakingNews newList={breakingNews} />
          <Categories onCategoryChanged={onCatChanged} />
          <NewsList newList={news} />
        </>
      )}
    </ScrollView>
  );
};

export default Page;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
