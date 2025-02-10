import React, { useContext } from "react";
import { StyleSheet, View } from "react-native";
import Animated from "react-native-reanimated";
import { NewsDataType } from "@/types";
import { Colors } from "@/constants/Colors";
import { ThemeContext } from "@/context/ThemeContext";

type Props = {
    items: NewsDataType[];
    paginationIndex: number;
    };

    const Pagination = ({ items, paginationIndex }: Props) => {
    const { isDarkMode } = useContext(ThemeContext);

    return (
        <View style={styles.container}>
        {items.map((_, index) => (
            <Animated.View
            key={index}
            style={[
                styles.dot,
                {
                backgroundColor:
                    paginationIndex === index
                    ? Colors.tint
                    : isDarkMode
                    ? Colors.lightGrey
                    : Colors.darkGrey,
                },
            ]}
            />
        ))}
        </View>
    );
};

export default Pagination;

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        height: 40,
        justifyContent: "center",
        alignItems: "center",
        gap: 1,
    },
    dot: {
        height: 10,
        width: 10,
        marginHorizontal: 3,
        borderRadius: 8,
    },
});
