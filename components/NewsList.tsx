import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useContext } from 'react';
import { NewsDataType } from '@/types';
import { Colors } from '@/constants/Colors';
import Loading from '@/components/Loading';
import { Link } from 'expo-router';
import { ThemeContext } from '@/context/ThemeContext';

type Props = {
    newList: NewsDataType[];
};

const NewsList = ({ newList }: Props) => {
    const { isDarkMode } = useContext(ThemeContext);

    return (
        <View style={styles.container}>
            {newList.length === 0 ? (
                <Loading size="large" />
            ) : (
                newList.map((item) => (
                    <Link
                        key={item.article_id}
                        href={{
                            pathname: "/news/[id]",
                            params: { id: item.article_id },
                        }}
                        asChild
                    >
                        <TouchableOpacity>
                            <View
                                style={[
                                    styles.itemContainer,
                                    { backgroundColor: isDarkMode ? '#121212' : Colors.white },
                                ]}
                            >
                                <Image source={{ uri: item.image_url }} style={styles.itemImage} />
                                <View style={styles.itemInfo}>
                                    <Text style={[styles.itemCategory, { color: isDarkMode ? Colors.lightGrey : Colors.darkGrey }]}>
                                        {item.category}
                                    </Text>
                                    <Text style={[styles.itemTitle, { color: isDarkMode ? Colors.white : Colors.black }]}>
                                        {item.title}
                                    </Text>
                                    <View style={styles.itemSourceInfo}>
                                        <Image source={{ uri: item.source_icon }} style={styles.itemSourceImg} />
                                        <Text style={[styles.itemSourceName, { color: isDarkMode ? Colors.lightGrey : Colors.darkGrey }]}>
                                            {item.source_name}
                                        </Text>
                                    </View>
                                </View>
                            </View>
                        </TouchableOpacity>
                    </Link>
                ))
            )}
        </View>
    );
};

export default NewsList;

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 20,
        marginBottom: 40,
    },
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        flex: 1,
        gap: 10,
        borderRadius: 12,
        padding: 10,
    },
    itemImage: {
        width: 90,
        height: 100,
        borderRadius: 20,
        margin: 10,
    },
    itemInfo: {
        flex: 1,
        gap: 10,
        justifyContent: 'space-between',
    },
    itemCategory: {
        fontSize: 14,
        textTransform: 'capitalize',
        fontWeight: '900'
    },
    itemTitle: {
        fontSize: 16,
        fontWeight: '900',
    },
    itemSourceInfo: {
        flexDirection: 'row',
        gap: 8,
        alignItems: 'center',
    },
    itemSourceImg: {
        width: 20,
        height: 20,
        borderRadius: 20,
    },
    itemSourceName: {
        fontSize: 14,
        fontWeight: '900',
    },
});
