import { FlatList, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import React, { useState, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { Link, Stack } from 'expo-router';
import Loading from '@/components/Loading';
import { Colors } from '@/constants/Colors';
import { useFocusEffect } from '@react-navigation/native';

type NewsItem = {
  article_id: string;
  image_url: string;
  title: string;
  description?: string;
  content?: string;
};

const BOOKMARK_KEY = 'bookmark';

const Page = () => {
  const [bookmarkNews, setBookmarkNews] = useState<NewsItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBookmarks = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const token = await AsyncStorage.getItem(BOOKMARK_KEY);
      const ids: string[] = token ? JSON.parse(token) : [];
      if (ids.length === 0) {
        setBookmarkNews([]);
        return;
      }
      const queryString = ids.join(',');
      const response = await axios.get(
        `https://newsdata.io/api/1/news?apikey=${process.env.EXPO_PUBLIC_API_KEY}&id=${queryString}`
      );
      const news = response.data.results;
      setBookmarkNews(news);
    } catch (err: any) {
      console.error('Error fetching bookmarked news:', err.message);
      setError(err.message || 'Error desconocido');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchBookmarks();
    }, [fetchBookmarks])
  );

  return (
    <>
      <Stack.Screen 
        options={{
          headerShown: true,
        }}
      />
      <View style={styles.container}>
        {isLoading ? (
          <Loading size="large" />
        ) : error ? (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>Error: {error}</Text>
            <TouchableOpacity style={styles.retryButton} onPress={fetchBookmarks}>
              <Text style={styles.retryText}>Reintentar</Text>
            </TouchableOpacity>
          </View>
        ) : bookmarkNews.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No tienes noticias guardadas.</Text>
          </View>
        ) : (
          <FlatList 
            data={bookmarkNews}
            keyExtractor={(item) => item.article_id}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <Link href={`/news/${item.article_id}`} asChild>
                <TouchableOpacity style={styles.card}>
                  <Image 
                    source={{ uri: item.image_url }} 
                    style={styles.cardImage} 
                    resizeMode="cover"
                  />
                  <Text style={styles.cardTitle}>{item.title}</Text>
                  <Text style={styles.cardDescription} numberOfLines={2}>
                    {item.description || item.content}
                  </Text>
                </TouchableOpacity>
              </Link>
            )}
          />
        )}
      </View>
    </>
  );
};

export default Page;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    padding: 20,
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
    color: Colors.black,
    marginBottom: 5,
  },
  cardDescription: {
    fontSize: 14,
    color: Colors.darkGrey,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
  },
  emptyText: {
    fontSize: 16,
    color: Colors.darkGrey,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
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
