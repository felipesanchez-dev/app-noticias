import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { NewsDataType } from "@/types";
import Animated from "react-native-reanimated";
import { Colors } from "@/constants/Colors";

type Props = {
    items: NewsDataType[];
    paginationIndex: number;
};

const Pagination = ({ items, paginationIndex }: Props) => {
    return (
        <View style={styles.container}>
        {items.map((_, index) => (
            <Animated.View
            key={index}
            style={[
            styles.dot,
            {
                backgroundColor:
                paginationIndex === index ? Colors.tint :  Colors.darkGrey
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
    backgroundColor: "#333",
    },
});
