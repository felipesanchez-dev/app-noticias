import { ScrollView, StyleSheet, } from "react-native";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Header from "@/components/Header";
import SearchBar from "@/components/SearchBar";
import { NewsDataType } from "@/types";
import BreakingNews from "@/components/BreakingNews";
import Categories from "@/components/Categories";
import NewsList from "@/components/NewsList";
import Loading from "@/components/Loading";

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
      // Llamada a ambas APIs de manera paralela
      const [breakingNewsResponse, generalNewsResponse] = await Promise.all([
        axios.get(
          `https://newsdata.io/api/1/news?apikey=${process.env.EXPO_PUBLIC_API_KEY}&language=es&image=1&removeduplicate=1&size=5`
        ),
        axios.get(
          `https://newsdata.io/api/1/news?apikey=${process.env.EXPO_PUBLIC_API_KEY}&language=es&image=1&removeduplicate=1&size=10`
        ),
      ]);
      // Verificación si los datos son válidos
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

  const getNews = async (category: string = "") => {
    try {
      const categoryString = category.length !== 0 ? `&category=${category}` : "";
      const URL = `https://newsdata.io/api/1/news?apikey=${process.env.EXPO_PUBLIC_API_KEY}&language=es&image=1&removeduplicate=1&size=10${categoryString}`;
      const response = await axios.get(URL);
      if (response && response.data) {
        setNews(response.data.results);
      }
    } catch (err: any) {
      console.error("Error al obtener las noticias de la categoría:", err.message);
    }
  };

  const onCatChanged = (category: string) => {
    // Llamada a getNews con la categoría seleccionada
    getNews(category);
  };

  
  return (
    <ScrollView style={[styles.container, { paddingTop: safeTop }]}>
      <Header />
      <SearchBar />
      {isLoading ? (
        <Loading size={"large"} />
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
