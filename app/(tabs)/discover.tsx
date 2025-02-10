import React, { useState, useCallback, useEffect, useContext } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, ActivityIndicator, FlatList, Image } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors } from '@/constants/Colors';
import CheckBox from '@/components/CheckBox';
import SearchBar from '@/components/SearchBar';
import { useNewsCategories } from '@/hooks/useNewsCategories';
import { useNewsCountries } from '@/hooks/useNewsCountry';
import { Link, useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios';
import { ThemeContext } from '@/context/ThemeContext'; // Importa el ThemeContext

type NewsItem = {
  article_id: string;
  image_url: string;
  title: string;
  description?: string;
  content?: string;
};

const Page = () => {
  const { top: safetop } = useSafeAreaInsets();
  const { newsCategories, toggleNewsCategory } = useNewsCategories();
  const { newsCountries, toggleNewsCountry } = useNewsCountries();
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  // Estados para obtener los IDs guardados de AsyncStorage
  const [bookmarks, setBookmarks] = useState<string[]>([]);
  const [bookmarksLoading, setBookmarksLoading] = useState<boolean>(false);
  const [bookmarkError, setBookmarkError] = useState<string | null>(null);

  // Estados para almacenar los detalles de las noticias guardadas
  const [bookmarkNews, setBookmarkNews] = useState<NewsItem[]>([]);
  const [newsLoading, setNewsLoading] = useState<boolean>(false);
  const [newsError, setNewsError] = useState<string | null>(null);

  // Obtener el estado de dark mode desde el contexto
  const { isDarkMode } = useContext(ThemeContext);

  // Función para obtener los IDs guardados
  const fetchBookmarks = useCallback(async () => {
    setBookmarksLoading(true);
    setBookmarkError(null);
    try {
      const stored = await AsyncStorage.getItem('bookmark');
      const parsed: string[] = stored ? JSON.parse(stored) : [];
      setBookmarks(parsed);
    } catch (error: any) {
      console.error('Error fetching bookmarks:', error);
      setBookmarkError('No se pudieron obtener las noticias guardadas.');
    } finally {
      setBookmarksLoading(false);
    }
  }, []);

  // Actualiza los bookmarks cada vez que la pantalla tiene foco
  useFocusEffect(
    useCallback(() => {
      fetchBookmarks();
      return () => {};
    }, [fetchBookmarks])
  );

  // Se derivan las categorías y países seleccionados a partir de los hooks:
  const selectedCategories = newsCategories
    .filter((item) => item.selected)
    .map((item) => item.slug);

  const selectedCountries = newsCountries
    .filter((item) => item.selected)
    .map((item) => item.code);

  // Cuando se actualizan los IDs guardados, se consulta la API para obtener los detalles de cada noticia
  useEffect(() => {
    const fetchBookmarkNews = async () => {
      if (bookmarks.length === 0) {
        setBookmarkNews([]);
        return;
      }
      setNewsLoading(true);
      setNewsError(null);
      try {
        const queryString = bookmarks.join(',');
        const response = await axios.get(
          `https://newsdata.io/api/1/news?apikey=${process.env.EXPO_PUBLIC_API_KEY}&id=${queryString}`
        );
        const news: NewsItem[] = response.data.results;
        setBookmarkNews(news);
      } catch (error: any) {
        console.error('Error fetching bookmarked news:', error.message);
        setNewsError('Error al obtener las noticias guardadas.');
      } finally {
        setNewsLoading(false);
      }
    };

    fetchBookmarkNews();
  }, [bookmarks]);

  // Componente de cabecera para el FlatList (contenido estático)
  const ListHeader = () => (
    <>
      <SearchBar withHorizontalPadding={false} setSearchQuery={setSearchQuery} />

      <Text style={[styles.title, { color: isDarkMode ? Colors.white : Colors.black }]}>Categorías</Text>
      <View style={styles.listContainer}>
        {newsCategories.map((item) => (
          <CheckBox
            key={item.id}
            label={item.title}
            checked={item.selected}
            onPress={() => toggleNewsCategory(item.id)}
          />
        ))}
      </View>

      <Text style={[styles.title, { color: isDarkMode ? Colors.white : Colors.black }]}>Países</Text>
      <View style={styles.listContainer}>
        {newsCountries.map((item, index) => (
          <CheckBox
            key={index}
            label={item.name}
            checked={item.selected}
            onPress={() => toggleNewsCountry(index)}
          />
        ))}
      </View>

      <Link
        href={{
          pathname: `/news/search`,
          params: {
            query: searchQuery,
            category: selectedCategories.join(','),
            country: selectedCountries.join(','),
          },
        }}
        asChild
      >
        <TouchableOpacity style={styles.searchBtn}>
          <Text style={styles.searchText}>Buscar</Text>
        </TouchableOpacity>
      </Link>

      <Text style={[styles.title, { color: isDarkMode ? Colors.white : Colors.black }]}>Noticias guardadas</Text>

      {(bookmarksLoading || newsLoading) && (
        <ActivityIndicator size="large" color={isDarkMode ? Colors.white : Colors.tint} />
      )}

      {(bookmarkError || newsError) && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{bookmarkError || newsError}</Text>
          <TouchableOpacity style={styles.retryButton} onPress={fetchBookmarks}>
            <Text style={styles.retryText}>Reintentar</Text>
          </TouchableOpacity>
        </View>
      )}

      {bookmarkNews.length === 0 &&
        !(bookmarksLoading || newsLoading || bookmarkError || newsError) && (
          <View style={styles.emptyContainer}>
              <Text style={[styles.emptyText, { color: isDarkMode ? 'white' : 'black' }]}>
                  No tienes noticias guardadas.
              </Text>
          </View>
    )}

    </>
  );

  return (
    <View style={[styles.container,
      { paddingTop: safetop + 20,
      backgroundColor: isDarkMode ? '#121212' : Colors.white }]}>
      <FlatList
  data={bookmarkNews}
  keyExtractor={(item) => item.article_id}
  showsVerticalScrollIndicator={false}
  ListHeaderComponent={ListHeader}
  renderItem={({ item }) => (
    <Link href={`/news/${item.article_id}`} asChild>
      <TouchableOpacity
        style={[styles.card, { backgroundColor: isDarkMode ? 'red' : 'red' }]}
      >
        <Image
          source={{ uri: item.image_url }}
          style={styles.cardImage}
          resizeMode="cover"
        />
        <Text
          style={[styles.cardTitle, { color: isDarkMode ? '#fff' : Colors.black }]}
        >
          {item.title}
        </Text>
        <Text
          style={[
            styles.cardDescription,
            { color: isDarkMode ? '#ccc' : Colors.darkGrey },
          ]}
          numberOfLines={2}
        >
          {item.description || item.content}
        </Text>
      </TouchableOpacity>
    </Link>
  )}
  ListFooterComponent={<View style={{ height: 20 }} />}
/>

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
    fontWeight: '800',
    marginBottom: 10,
    marginTop: 20,
  },
  listContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    marginTop: 12,
    marginBottom: 12,
  },
  searchBtn: {
    backgroundColor: "#333333",
    alignItems: 'center',
    padding: 14,
    borderRadius: 20,
    marginVertical: 10,
  },
  searchText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '600',
  },
  card: {
    backgroundColor: Colors.white,
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  cardImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 5,
  },
  cardDescription: {
    fontSize: 14,
  },
  emptyContainer: {
    paddingVertical: 20,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
  },
  errorContainer: {
    paddingVertical: 20,
    alignItems: 'center',
  },
  errorText: {
    fontSize: 16,
    color: 'red',
    marginBottom: 10,
  },
  retryButton: {
    backgroundColor: Colors.black,
    padding: 10,
    borderRadius: 5,
  },
  retryText: {
    color: Colors.white,
    fontSize: 14,
  },
});
