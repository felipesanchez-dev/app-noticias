import { StyleSheet, Text, View, ActivityIndicator, ScrollView, Image, TouchableOpacity } from 'react-native';
import React, { useState, useEffect, useLayoutEffect, useContext } from 'react';
import { useLocalSearchParams, useNavigation, Link } from 'expo-router';
import { NewsDataType } from '@/types';
import axios from 'axios';
import { Colors } from '@/constants/Colors';
import { ThemeContext } from '@/context/ThemeContext';

const Page = () => {
    const { isDarkMode } = useContext(ThemeContext);
    const { query, category, country } = useLocalSearchParams<{
        query: string;
        category: string;
        country: string;
    }>();

    const navigation = useNavigation();

    useLayoutEffect(() => {
        navigation.setOptions({
            title: query ? `Resultados para: ${query}` : 'Noticias',
        });
    }, [query]);

    const [news, setNews] = useState<NewsDataType[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const getNews = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const queryString = query && query.length ? `&q=${query}` : "";
            const categoryString = category && category.length ? `&category=${category}` : "";
            const countryString = country && country.length ? `&country=${country}` : "";
            const URL = `https://newsdata.io/api/1/news?apikey=${process.env.EXPO_PUBLIC_API_KEY}&language=es&image=1&removeduplicate=1&size=10${queryString}${categoryString}${countryString}`;
            const response = await axios.get(URL);
            if (response && response.data) {
                setNews(response.data.results);
            }
        } catch (err: any) {
            console.error("Error al obtener las noticias:", err.message);
            setError(err.message || "Error desconocido");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        getNews();
    }, [query, category, country]);

    if (isLoading) {
        return (
            <View style={[styles.loadingContainer, isDarkMode ? styles.backgroundDark : styles.backgroundLight]}>
                <ActivityIndicator size="large" color={isDarkMode ? '#fff' : '#000'} />
            </View>
        );
    }

    if (error) {
        return (
            <View style={[styles.errorContainer, isDarkMode ? styles.backgroundDark : styles.backgroundLight]}>
                <Text style={[styles.errorText, { color: isDarkMode ? '#fff' : 'red' }]}>Error: {error}</Text>
                <TouchableOpacity style={styles.retryButton} onPress={getNews}>
                    <Text style={styles.retryText}>Reintentar</Text>
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <ScrollView contentContainerStyle={[
            styles.container,
            isDarkMode ? styles.backgroundDark : styles.backgroundLight
        ]}>
            {news.length > 0 ? (
                news.map((item) => (
                    <Link key={item.article_id} href={`/news/${item.article_id}`} asChild>
                        <TouchableOpacity style={[
                            styles.newsCard,
                            { backgroundColor: isDarkMode ? '#333' : '#fff' }
                        ]}>
                            {item.image_url ? (
                                <Image
                                    style={styles.newsImage}
                                    source={{ uri: item.image_url }}
                                    resizeMode="cover"
                                />
                            ) : null}
                            <View style={styles.newsContent}>
                                <Text style={[styles.newsTitle, { color: isDarkMode ? '#fff' : '#333' }]}>{item.title}</Text>
                                <Text style={[styles.newsDescription, { color: isDarkMode ? '#bbb' : '#666' }]} numberOfLines={3}>
                                    {item.description}
                                </Text>
                                <View style={styles.metaContainer}>
                                    <Image source={{ uri: item.source_icon }} style={styles.sourceIcon} />
                                    <Text style={[styles.newsSource, { color: isDarkMode ? '#fff' : Colors.black }]}>
                                        {item.source_name}
                                    </Text>
                                    <Text style={[styles.newsDate, { color: isDarkMode ? '#bbb' : '#999' }]}>
                                        {new Date(item.pubDate).toLocaleDateString()}
                                    </Text>
                                </View>
                                {item.category && item.category.length > 0 && (
                                    <Text style={[styles.extraText, { color: isDarkMode ? '#bbb' : '#555' }]}>
                                        Categorías: {item.category.join(', ')}
                                    </Text>
                                )}
                                {item.country && item.country.length > 0 && (
                                    <Text style={[styles.extraText, { color: isDarkMode ? '#bbb' : '#555' }]}>
                                        País(es): {item.country.join(', ')}
                                    </Text>
                                )}
                                {item.sentiment && (
                                    <Text style={[styles.extraText, { color: isDarkMode ? '#bbb' : '#555' }]}>
                                        Sentimiento: {item.sentiment}
                                    </Text>
                                )}
                            </View>
                        </TouchableOpacity>
                    </Link>
                ))
            ) : (
                <Text style={[styles.oResults, { color: isDarkMode ? '#bbb' : '#333' }]}>No se encontraron noticias.</Text>
            )}
        </ScrollView>
    );
};

export default Page;

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    backgroundLight: {
        backgroundColor: '#f5f5f5',
    },
    backgroundDark: {
        backgroundColor: '#121212',
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
    newsCard: {
        borderRadius: 12,
        marginBottom: 20,
        overflow: 'hidden',
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 3,
    },
    newsImage: {
        width: '100%',
        height: 200,
    },
    newsContent: {
        padding: 15,
    },
    newsTitle: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 5,
    },
    newsDescription: {
        fontSize: 14,
        marginBottom: 12,
    },
    metaContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    newsSource: {
        fontSize: 16,
    },
    newsDate: {
        fontSize: 12,
    },
    extraText: {
        fontSize: 12,
        marginTop: 4,
    },
    oResults: {
        fontSize: 16,
        textAlign: 'center',
        marginTop: 30,
    },
    sourceIcon: {
        width: 25,
        height: 25,
        borderRadius: 20,
    },
});
