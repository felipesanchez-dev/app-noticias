import { FlatList, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import React, { useState, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { Link, Stack } from 'expo-router';
import Loading from '@/components/Loading';
import { Colors } from '@/constants/Colors';
import { useFocusEffect } from '@react-navigation/native';

type Props = {};

type NewsItem = {
  article_id: string;
  image_url: string;
  title: string;
  description?: string;
  content?: string;
};

const Page = (props: Props) => {
  const [bookmarkNews, setBookmarkNews] = useState<NewsItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchBookmark = async () => {
    const token = await AsyncStorage.getItem("bookmark");
    if (token) {
      const res = JSON.parse(token);
      if (res) {
        let query_string = res.join(",");
        const response = await axios.get(
          `https://newsdata.io/api/1/news?apikey=${process.env.EXPO_PUBLIC_API_KEY}&id=${query_string}`
        );
        const news = response.data.results;
        setBookmarkNews(news);
      } else {
        setBookmarkNews([]);
      }
    } else {
      setBookmarkNews([]);
    }
    setIsLoading(false);
  };

  // Se vuelve a llamar a fetchBookmark cada vez que la pantalla se enfoca
  useFocusEffect(
    useCallback(() => {
      fetchBookmark();
    }, [])
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
          <Loading size={"large"} />
        ) : (
          <FlatList 
            data={bookmarkNews}
            keyExtractor={(_, index) => `list_item${index}`}
            showsVerticalScrollIndicator={false}
            renderItem={({ item, index }) => (
              <Link href={`/news/${item.article_id}`} asChild key={index}>
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
});
