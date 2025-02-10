import React, { useState, useEffect, useCallback, useLayoutEffect, useContext } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Image, Alert } from 'react-native';
import { useNavigation, useLocalSearchParams, Stack, Link } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ThemeContext } from '@/context/ThemeContext';
import { Colors } from '@/constants/Colors';

const BOOKMARK_KEY = 'bookmark';

const NewsDetails = () => {
    const { id } = useLocalSearchParams<{ id: string }>();
    const [news, setNews] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [bookmark, setBookmark] = useState(false);
    const navigation = useNavigation();
    const { isDarkMode } = useContext(ThemeContext);

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
            if (response?.data?.results) {
                setNews(response.data.results);
            } else {
                setError('No se encontraron resultados');
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
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={25} color={isDarkMode ? Colors.white : Colors.black} />
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
                        color={bookmark ? 'red' : (isDarkMode ? Colors.white : Colors.black)}
                    />
                </TouchableOpacity>
            ),
        });
    }, [navigation, news, bookmark, toggleBookmark, isDarkMode]);

    if (isLoading) {
        return <View style={[styles.loadingContainer, isDarkMode ? styles.backgroundDark : styles.backgroundLight]}>
            <Text style={{ color: isDarkMode ? Colors.white : Colors.black }}>Cargando...</Text>
        </View>;
    }

    if (error) {
        return (
            <View style={[styles.errorContainer, isDarkMode ? styles.backgroundDark : styles.backgroundLight]}>
                <Text style={[styles.errorText, isDarkMode && styles.darkErrorText]}>Error: {error}</Text>
                <TouchableOpacity style={styles.retryButton} onPress={fetchNews}>
                    <Text style={[styles.retryText, isDarkMode && styles.darkRetryText]}>Reintentar</Text>
                </TouchableOpacity>
            </View>
        );
    }

    if (!id || news.length === 0) {
        return (
            <View style={styles.emptyContainer}>
                <Text style={[styles.emptyText, isDarkMode && styles.darkEmptyText]}>No hay noticias disponibles.</Text>
            </View>
        );
    }

    const currentNews = news[0];

    return (
        <>
            <Stack.Screen options={{ title: 'Detalle de la noticia' }} />
            <ScrollView 
                contentContainerStyle={[
                    styles.contentContainer,
                    isDarkMode ? styles.backgroundDark : styles.backgroundLight
                ]}
                style={[
                    styles.container,
                    isDarkMode ? styles.backgroundDark : styles.backgroundLight
                ]}
            >
                <Text style={[styles.title, isDarkMode && styles.darkTitle]}>{currentNews.title}</Text>
                <View style={styles.newsInfoWrapper}>
                    {/* Información adicional si la hubiera */}
                </View>
                <Image source={{ uri: currentNews.image_url }} style={styles.newsImg} />
                <Text style={[styles.newsContent, isDarkMode && styles.darkNewsContent]}>
                    {currentNews.content}
                </Text>
            </ScrollView>
        </>
    );
};

export default NewsDetails;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    backgroundLight: {
        backgroundColor: Colors.white,
    },
    backgroundDark: {
        backgroundColor: '#121212',
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
    darkTitle: {
        color: Colors.white,
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
    newsContent: {
        fontSize: 16,
        color: '#555',
        letterSpacing: 0.8,
        lineHeight: 25,
    },
    darkNewsContent: {
        color: Colors.lightGrey,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
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
    darkErrorText: {
        color: 'lightcoral',
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
    darkRetryText: {
        color: Colors.lightGrey,
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
    darkEmptyText: {
        color: Colors.lightGrey,
    },
});
