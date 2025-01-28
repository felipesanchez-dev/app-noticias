import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import { router, Stack, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import { NewsDataType } from '@/types';
import Loading from '@/components/Loading';

type Props = {};

const NewsDetails = (props: Props) => {
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
                <Loading size={"large"}/>
            ): (
                <View>
                    <Text>{news[0].title}</Text>
                    <Text>{news[0].content}</Text>
                </View>
            )}
        </>
    );
};

export default NewsDetails;

const styles = StyleSheet.create({});
