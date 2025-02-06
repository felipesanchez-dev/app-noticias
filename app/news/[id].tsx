import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import { router, Stack, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import { NewsDataType } from '@/types';
import Loading from '@/components/Loading';
import { Colors } from '@/constants/Colors';
import Moment from 'moment';

const NewsDetails = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [news, setNews] = useState<NewsDataType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getNews();
  }, []);

  const getNews = async () => {
    try {
      const URL = `https://newsdata.io/api/1/news?apikey=${process.env.EXPO_PUBLIC_API_KEY}&id=${id}`;
      const response = await axios.get(URL);
      if (response && response.data) {
        setNews(response.data.results);
        setIsLoading(false);
      }
    } catch (err: any) {
      console.error("Error al obtener las noticias:", err.message);
    }
  };

  return (
    <>
      <Stack.Screen
        options={{
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()}>
              <Ionicons name="arrow-back" size={25} />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity onPress={() => console.log('Like')}>
              <Ionicons name="heart-outline" size={25} />
            </TouchableOpacity>
          ),
          title: '',
        }}
      />
      {isLoading ? (
        <Loading size={"large"} />
      ) : (
        <ScrollView contentContainerStyle={styles.contentContainer} style={styles.container}>
          <Text style={styles.title}>{news[0].title}</Text>
          <View style={styles.newsInfoWrapper}>
            <Text style={styles.newsInfo}>{Moment(news[0].pubDate).format("MMMM DD, hh:mm a")}</Text>
            <Text style={styles.newsInfo}>{news[0].source_name}</Text>
          </View>
          <Image source={{ uri: news[0].image_url }} style={styles.newsImg} />
          {news[0].content ? (
            <Text style={styles.newsContent}>{news[0].content}</Text>
          ) : (
            <Text style={styles.newsContent}>{news[0].description}</Text>
          )}
        </ScrollView>
      )}
    </>
  );
};

export default NewsDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.black,
    marginVertical: 20,
    letterSpacing: 0.5,
  },
  newsImg: {
    width: '100%',
    height: 300,
    marginBottom: 20,
    borderRadius: 10,
  },
  newsInfoWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  newsInfo: {
    fontSize: 13,
    color: Colors.darkGrey,
  },
  newsContent: {
    fontSize: 16,
    color: "#555",
    letterSpacing: 0.8,
    lineHeight: 25,
  },
});
