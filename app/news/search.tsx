import { StyleSheet, Text, View, ActivityIndicator, ScrollView, Image, TouchableOpacity } from 'react-native';
import React, { useState, useEffect, useLayoutEffect } from 'react';
import { useLocalSearchParams, useNavigation, Link } from 'expo-router';
import { NewsDataType } from '@/types';
import axios from 'axios';
import { Colors } from '@/constants/Colors';

const Page = () => {
  // Se reciben los parámetros de búsqueda
    const { query, category, country } = useLocalSearchParams<{
    query: string;
    category: string;
    country: string;
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
        /* Se construyen los parámetros de la query según lo recibido.
            Nota: si category o country contienen varias opciones separadas por comas,
            se envían tal cual a la API (asegúrate de que la API las procese correctamente) */
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
        {news.length > 0 ? (
            news.map((item) => (
            <Link
                key={item.article_id}
                href={`/news/${item.article_id}`}
                asChild
            >
                <TouchableOpacity style={styles.newsCard}>
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
                    <Image source={{ uri: item.source_icon }} style={styles.sourceIcon} />
                    <Text style={styles.newsSource}>{item.source_name}</Text>
                    <Text style={styles.newsDate}>
                        {new Date(item.pubDate).toLocaleDateString()}
                    </Text>
                    </View>
                    {/* Datos adicionales: categorías, países y sentimiento */}
                    {item.category && item.category.length > 0 && (
                    <Text style={styles.extraText}>
                        Categorías: {item.category.join(', ')}
                    </Text>
                    )}
                    {item.country && item.country.length > 0 && (
                    <Text style={styles.extraText}>
                        País(es): {item.country.join(', ')}
                    </Text>
                    )}
                    {item.sentiment && (
                    <Text style={styles.extraText}>
                        Sentimiento: {item.sentiment}
                    </Text>
                    )}
                </View>
                </TouchableOpacity>
            </Link>
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
        marginBottom: 5,
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
        fontSize: 16,
        color: Colors.black,
        marginLeft: -190,
    },
    newsDate: {
        fontSize: 12,
        color: '#999',
    },
    extraText: {
        fontSize: 12,
        color: '#555',
        marginTop: 4,
    },
    oResults: {
        fontSize: 16,
        textAlign: 'center',
        marginTop: 30,
        color: '#333',
    },
    sourceIcon: {
        width: 25,
        height: 25,
        borderRadius: 20,
    },
});
