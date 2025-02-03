import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useLocalSearchParams } from 'expo-router';

type Props = {}

const Page = (props: Props) => {
    const {query, category, country} = useLocalSearchParams<{
        query: string,
        category: string,
        country: string
    }>();
    return (
        <View>
        <Text>search: {query}</Text>
        <Text>search: {category}</Text>
        <Text>search: {country}</Text>
        </View>
    )
};

export default Page;

const styles = StyleSheet.create({})