import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState, useEffect, useLayoutEffect } from 'react';
import { router, Stack, useLocalSearchParams, useNavigation } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import { NewsDataType } from '@/types';
import Loading from '@/components/Loading';
import { Colors } from '@/constants/Colors';
import Moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';

const NewsDetails = () => {
    const { id } = useLocalSearchParams<{ id: string }>();
    const [news, setNews] = useState<NewsDataType[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const navigation = useNavigation();
    const [bookmark, setBookmark] = useState(false);

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

    const saveBookmark = async (newsId: string) => {
        setBookmark(true);
        try {
        const token = await AsyncStorage.getItem("bookmark");
        if (token) {
            const bookmarks = JSON.parse(token);
            // Si ya existe la noticia no la agregamos
            if (!bookmarks.includes(newsId)) {
            bookmarks.push(newsId);
            await AsyncStorage.setItem("bookmark", JSON.stringify(bookmarks));
            alert("Noticia guardada con éxito");
            }
        } else {
            const bookmarkArr = [newsId];
            await AsyncStorage.setItem("bookmark", JSON.stringify(bookmarkArr));
            alert("Noticia guardada con éxito");
        }
        } catch (error) {
        console.error("Error guardando el bookmark:", error);
        }
    };


    // Actualizamos el header cuando se carguen las noticias y/o cambie el estado del bookmark
    useLayoutEffect(() => {
        navigation.setOptions({
        title: 'Detalle de la noticia',
        headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={25} />
            </TouchableOpacity>
        ),
        headerRight: () => (
            <TouchableOpacity
            onPress={() => {
                // Solo se ejecuta si ya hay datos
                if (news.length > 0) {
                saveBookmark(news[0].article_id);
                }
            }}
            disabled={news.length === 0} // Se deshabilita si aún no hay noticias
            >
            <Ionicons 
                name={bookmark ? "heart" : "heart-outline"} 
                size={25}
                color={bookmark ? "red" : Colors.black} 
            />
            </TouchableOpacity>
        ),
        });
    }, [navigation, news, bookmark]);

    return (
        <>
        <Stack.Screen
            options={{
            title: 'Detalle de la noticia',
            }}
        />
        {isLoading ? (
            <Loading size={"large"} />
        ) : (
            <ScrollView contentContainerStyle={styles.contentContainer} style={styles.container}>
            <Text style={styles.title}>{news[0].title}</Text>
            <View style={styles.newsInfoWrapper}>
                <Text style={styles.newsInfo}>
                {Moment(news[0].pubDate).format("MMMM DD, hh:mm a")}
                </Text>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Image source={{ uri: news[0].source_icon }} style={styles.sourceIcon} />
                <Text style={[styles.newsInfo, { marginLeft: 5 }]}>{news[0].source_name}</Text>
                </View>
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
        alignItems: 'center', 
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
    sourceIcon: {
        width: 25,
        height: 25,
        borderRadius: 20,
    },
});
