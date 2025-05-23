// app/(tabs)/index.tsx
import React, { useContext, useEffect, useState } from "react";
import { ScrollView, StyleSheet } from "react-native";
import axios from "axios";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Header from "@/components/Header";
import SearchBar from "@/components/SearchBar";
import { NewsDataType } from "@/types";
import BreakingNews from "@/components/BreakingNews";
import Categories from "@/components/Categories";
import NewsList from "@/components/NewsList";
import Loading from "@/components/Loading";
import { ThemeContext } from "@/context/ThemeContext";
import { Colors } from "@/constants/Colors";

type Props = {
  newList: NewsDataType[];
  item?: any;
};

const Page: React.FC<Props> = () => {
  const { top: safeTop } = useSafeAreaInsets();
  const { isDarkMode } = useContext(ThemeContext);

  const [breakingNews, setBreakingNews] = useState<NewsDataType[]>([]);
  const [news, setNews] = useState<NewsDataType[]>([]);
  const [isLoadingBreaking, setIsLoadingBreaking] = useState(true);
  const [isLoadingGeneral, setIsLoadingGeneral] = useState(true);

  useEffect(() => {
    fetchBreakingNews(); // se obtienen las noticias de urgencia
  }, []);

  const fetchBreakingNews = async () => {
    try {
      setIsLoadingBreaking(true);
      const breakingNewsResponse = await axios.get(
        `https://newsdata.io/api/1/news?apikey=${process.env.EXPO_PUBLIC_API_KEY}&language=es&image=1&removeduplicate=1&size=5`
      );
      if (breakingNewsResponse && breakingNewsResponse.data) {
        setBreakingNews(breakingNewsResponse.data.results);
      }
    } catch (err: any) {
      console.error("Error al obtener las noticias de urgencia:", err.message);
    } finally {
      setIsLoadingBreaking(false);
      fetchGeneralNews(); // Después de obtener las noticias de urgencia, obtenemos las generales
    }
  };

  const fetchGeneralNews = async () => {
    try {
      setIsLoadingGeneral(true);
      const generalNewsResponse = await axios.get(
        `https://newsdata.io/api/1/news?apikey=${process.env.EXPO_PUBLIC_API_KEY}&language=es&image=1&removeduplicate=1&size=10`
      );
      if (generalNewsResponse && generalNewsResponse.data) {
        setNews(generalNewsResponse.data.results);
      }
    } catch (err: any) {
      console.error("Error al obtener las noticias generales:", err.message);
    } finally {
      setIsLoadingGeneral(false);
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
    <ScrollView
      style={[
        styles.container,
        { paddingTop: safeTop },
        isDarkMode && styles.containerDark,
      ]}
    >
      <Header />
      <SearchBar withHorizontalPadding={true} setSearchQuery={() => {}} />
      {isLoadingBreaking || isLoadingGeneral ? (
        <Loading size={"large"} />
      ) : (
        <>
          <BreakingNews
            newList={breakingNews.filter((item) => item.image_url !== null)}
          />
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
    backgroundColor: Colors.white, 
  },
  containerDark: {
    backgroundColor: "#121212", 
  },
});
