import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { NewsDataType } from "@/types";
import { SharedValue } from "react-native-reanimated";
import { LinearGradient } from "expo-linear-gradient";

type Props = {
  sliderItem: NewsDataType;
  index: number;
  scrollX: SharedValue<number>;
};
const { width } = Dimensions.get("screen");
const SliderItem = ({ sliderItem, index, scrollX }: Props) => {
  return (
    <View style={styles.itemWrapper} key={sliderItem.article_id}>
      <Image source={{ uri: sliderItem.image_url }} style={styles.image} />
      <LinearGradient colors={["transparent", "rgba(0,0,0,0.8)"]} style={styles.background}>
        <Text>{sliderItem.title}</Text>
      </LinearGradient>
    </View>
  );
};

export default SliderItem;

const styles = StyleSheet.create({
  itemWrapper: {
    position: "relative",
    width: width,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: width,
    height: 180,
    borderRadius: 20,
  },
  background: {
    
  }
});
