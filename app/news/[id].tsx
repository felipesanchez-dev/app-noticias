import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router';

type Props = {}

const NewsDetails = (props: Props) => {
    const {id} = useLocalSearchParams<{id: string}>();
    return (
    <View>
        <Text>NewsDetails {id}</Text>
    </View>
    );
};

export default NewsDetails;

const styles = StyleSheet.create({})