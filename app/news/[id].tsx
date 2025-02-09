import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View, Alert } from 'react-native';
import React, { useState, useEffect, useLayoutEffect, useCallback } from 'react';
import { router, Stack, useLocalSearchParams, useNavigation } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import { NewsDataType } from '@/types';
import Loading from '@/components/Loading';
import { Colors } from '@/constants/Colors';
import Moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BOOKMARK_KEY = 'bookmark';

const NewsDetails = () => {
    const { id } = useLocalSearchParams<{ id: string }>();
    const [news, setNews] = useState<NewsDataType[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [bookmark, setBookmark] = useState(false);
    const navigation = useNavigation();

    const fetchNews = useCallback(async () => {
        if (!id) {
        setIsLoading(false);
        return;
        }
        setIsLoading(true);
        setError(null);
        try {
        const URL = `https://newsdata.io/api/1/news?apikey=${process.env.EXPO_PUBLIC_API_KEY}&id=${id}`;
        const response = await axios.get(URL);
        if (response?.data) {
            setNews(response.data.results);
        }
        } catch (err: any) {
        console.error('Error al obtener las noticias:', err.message);
        setError(err.message || 'Error desconocido');
        } finally {
        setIsLoading(false);
        }
    }, [id]);

    const getBookmarks = useCallback(async () => {
        try {
        const stored = await AsyncStorage.getItem(BOOKMARK_KEY);
        return stored ? JSON.parse(stored) as string[] : [];
        } catch (error) {
        console.error('Error al leer bookmarks:', error);
        return [];
        }
    }, []);

    const checkBookmark = useCallback(async (newsId: string) => {
        const bookmarks = await getBookmarks();
        setBookmark(bookmarks.includes(newsId));
    }, [getBookmarks]);

    const updateBookmarkStorage = useCallback(async (bookmarks: string[]) => {
        try {
        await AsyncStorage.setItem(BOOKMARK_KEY, JSON.stringify(bookmarks));
        } catch (error) {
        console.error('Error al actualizar bookmarks:', error);
        }
    }, []);

    const toggleBookmark = useCallback(async (newsId: string) => {
        const bookmarks = await getBookmarks();
        if (bookmarks.includes(newsId)) {
        const updated = bookmarks.filter((id) => id !== newsId);
        await updateBookmarkStorage(updated);
        setBookmark(false);
        Alert.alert('Eliminado', 'Noticia eliminada de favoritos');
        } else {
        bookmarks.push(newsId);
        await updateBookmarkStorage(bookmarks);
        setBookmark(true);
        Alert.alert('Guardado', 'Noticia guardada con éxito');
        }
    }, [getBookmarks, updateBookmarkStorage]);

    useEffect(() => {
        fetchNews();
    }, [fetchNews]);

    useEffect(() => {
        if (!isLoading && news.length > 0) {
        checkBookmark(news[0].article_id);
        }
    }, [isLoading, news, checkBookmark]);

    useLayoutEffect(() => {
        navigation.setOptions({
        title: 'Detalle de la noticia',
        headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={25} color={Colors.black} />
            </TouchableOpacity>
        ),
        headerRight: () => (
            <TouchableOpacity
            onPress={() => {
                if (news.length > 0) {
                toggleBookmark(news[0].article_id);
                }
            }}
            disabled={news.length === 0}
            >
            <Ionicons
                name={bookmark ? 'heart' : 'heart-outline'}
                size={25}
                color={bookmark ? 'red' : Colors.black}
            />
            </TouchableOpacity>
        ),
        });
    }, [navigation, news, bookmark, toggleBookmark]);

    if (isLoading) {
        return <Loading size="large" />;
    }

    if (error) {
        return (
        <View style={styles.errorContainer}>
            <Text style={styles.errorText}>Error: {error}</Text>
            <TouchableOpacity style={styles.retryButton} onPress={fetchNews}>
            <Text style={styles.retryText}>Reintentar</Text>
            </TouchableOpacity>
        </View>
        );
    }

    if (!id || news.length === 0) {
        return (
        <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No hay noticias disponibles.</Text>
        </View>
        );
    }

    const currentNews = news[0];

    return (
        <>
        <Stack.Screen options={{ title: 'Detalle de la noticia' }} />
        <ScrollView contentContainerStyle={styles.contentContainer} style={styles.container}>
            <Text style={styles.title}>{currentNews.title}</Text>
            <View style={styles.newsInfoWrapper}>
            <Text style={styles.newsInfo}>
                {Moment(currentNews.pubDate).format('MMMM DD, hh:mm a')}
            </Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Image source={{ uri: currentNews.source_icon }} style={styles.sourceIcon} />
                <Text style={[styles.newsInfo, { marginLeft: 5 }]}>{currentNews.source_name}</Text>
            </View>
            </View>
            <Image source={{ uri: currentNews.image_url }} style={styles.newsImg} />
            <Text style={styles.newsContent}>
            {currentNews.content ? currentNews.content : currentNews.description}
            </Text>
        </ScrollView>
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
        color: '#555',
        letterSpacing: 0.8,
        lineHeight: 25,
    },
    sourceIcon: {
        width: 25,
        height: 25,
        borderRadius: 20,
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
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
