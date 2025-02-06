import { StyleSheet, Text, View, ActivityIndicator, ScrollView, Image } from 'react-native';
import React, { useState, useEffect, useLayoutEffect } from 'react';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import { NewsDataType } from '@/types';
import axios from 'axios';

const Page = () => {
    // parámetros de búsqueda
    const { query, category, country } = useLocalSearchParams<{
    query: string,
    category: string,
    country: string
    }>();
    const navigation = useNavigation();
    // Cambia el título del header según la búsqueda
    useLayoutEffect(() => {
    navigation.setOptions({
        title: query ? `Resultados para: ${query}` : 'Noticias'
    });
    }, [query]);
    
    const [news, setNews] = useState<NewsDataType[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    
    const getNews = async () => {
    try {
        // Construir la query según los parámetros recibidos
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
    } finally {
        setIsLoading(false);
    }
    };
    
    useEffect(() => {
        getNews();
    }, [query, category, country]);
    
    if (isLoading) {
        return (
        <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#000" />
        </View>
        );
    }
    
    return (
    <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.searchParams}>
            <Text style={styles.searchParam}>Query: {query}</Text>
            <Text style={styles.searchParam}>Categoría: {category}</Text>
            <Text style={styles.searchParam}>País: {country}</Text>
        </View>
    
    {news.length > 0 ? (
        news.map((item) => (
            <View key={item.article_id} style={styles.newsCard}>
                {item.image_url ? (
                <Image
                    style={styles.newsImage}
                    source={{ uri: item.image_url }}
                    resizeMode="cover"
                />
                ) : null}
                <View style={styles.newsContent}>
                    <Text style={styles.newsTitle}>{item.title}</Text>
                    <Text style={styles.newsDescription} numberOfLines={3}>
                        {item.description}
                    </Text>
                    <View style={styles.metaContainer}>
                        <Text style={styles.newsSource}>{item.source_name}</Text>
                        <Text style={styles.newsDate}>
                            {new Date(item.pubDate).toLocaleDateString()}
                        </Text>
                    </View>
                </View>
            </View>
        ))
        ) : (
        <Text style={styles.oResults}>No se encontraron noticias.</Text>
        )}
    </ScrollView>
    );
};

export default Page;

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    searchParams: {
        marginBottom: 15,
    },
    searchParam: {
        fontSize: 16,
        color: '#555',
    },
    newsCard: {
        backgroundColor: '#fff',
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
        marginBottom: 8,
        color: '#333',
    },
    newsDescription: {
        fontSize: 14,
        color: '#666',
        marginBottom: 12,
    },
    metaContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    newsSource: {
        fontSize: 12,
        color: '#999',
    },
    newsDate: {
        fontSize: 12,
        color: '#999',
    },
    oResults: {
        fontSize: 16,
        textAlign: 'center',
        marginTop: 30,
        color: '#333',
    },
});
