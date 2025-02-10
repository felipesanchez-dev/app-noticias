import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useRef, useState, useContext } from 'react';
import { Colors } from '@/constants/Colors';
import newsCategoryList from '@/constants/Categories';
import { ThemeContext } from '@/context/ThemeContext';

type Props = {
    onCategoryChanged: (category: string) => void;
};

const Categories = ({ onCategoryChanged }: Props) => {
    const { isDarkMode } = useContext(ThemeContext);
    const scrollRef = useRef<ScrollView>(null);
    const itemRef = useRef<TouchableOpacity[] | null[]>([]);
    const [activeIndex, setActiveIndex] = useState(0);

    const handleSelectCategory = (index: number) => {
        const selected = itemRef.current[index];
        setActiveIndex(index);
        selected?.measureLayout(
            scrollRef.current?.getScrollableNode(),
            (x) => {
                scrollRef.current?.scrollTo({ x: x - 20, y: 0, animated: true });
            }
        );
        onCategoryChanged(newsCategoryList[index].slug);
    };

    return (
        <View>
            <Text style={[styles.title, { color: isDarkMode ? Colors.white : Colors.black }]}>En Boca de Todos</Text>
            <ScrollView
                ref={scrollRef}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.itemsWrapper}
            >
                {newsCategoryList.map((item, index) => (
                    <TouchableOpacity
                        ref={(el) => (itemRef.current[index] = el)}
                        key={index}
                        style={[
                            styles.item,
                            { borderColor: isDarkMode ? Colors.lightGrey : Colors.darkGrey },
                            activeIndex === index && { backgroundColor: Colors.tint, borderColor: Colors.tint },
                        ]}
                        onPress={() => handleSelectCategory(index)}
                    >
                        <Text
                            style={[
                                styles.itemText,
                                { color: isDarkMode ? Colors.lightGrey : Colors.darkGrey },
                                activeIndex === index && { color: Colors.white },
                            ]}
                        >
                            {item.title}
                        </Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );
};

export default Categories;

const styles = StyleSheet.create({
    itemsWrapper: {
        gap: 12,
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginBottom: 10,
    },
    item: {
        borderWidth: 1,
        paddingVertical: 10,
        paddingHorizontal: 16,
        borderRadius: 20,
    },
    title: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 10,
        marginLeft: 20,
    },
    itemText: {
        fontSize: 14,
        fontWeight: '800',
        letterSpacing: 0.5,
    },
});
