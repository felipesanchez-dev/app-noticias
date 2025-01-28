import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { NewsDataType } from "@/types";
import Animated, {
  Extrapolation,
  interpolate,
  SharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";
import { LinearGradient } from "expo-linear-gradient";
import { Colors } from "@/constants/Colors";
import { Link } from "expo-router";

type Props = {
  sliderItem: NewsDataType;
  index: number;
  scrollX: SharedValue<number>;
};

const { width } = Dimensions.get("screen");
const ITEM_WIDTH = width * 0.8;
const SPACING = (width - ITEM_WIDTH) / 1.1;

const SliderItem = ({ sliderItem, index, scrollX }: Props) => {
  const rnStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: interpolate(
            scrollX.value,
            [(index - 1) * width, index * width, (index + 1) * width],
            [-SPACING, 10, SPACING],
            Extrapolation.CLAMP
          ),
        },
        {
          scale: interpolate(
            scrollX.value,
            [(index - 1) * width, index * width, (index + 1) * width],
            [0.9, 1, 0.9],
            Extrapolation.CLAMP
          ),
        },
      ],
    };
  });

  return (
    <Link href={{ pathname: "/news/[id]", params: { id: sliderItem.article_id } }} asChild>
      <TouchableOpacity>
        <Animated.View style={[styles.itemWrapper, rnStyle]} key={sliderItem.article_id}>
        <Image source={{ uri: sliderItem.image_url }} style={styles.image} />
        <LinearGradient
          colors={["transparent", "rgba(0, 0, 0, 0.8)"]}
          style={styles.background}
        >
          <View style={styles.sourceInfo}>
            {sliderItem.source_icon && (
              <Image source={{ uri: sliderItem.source_icon }} style={styles.sourceIcon} />
            )}
            <Text style={styles.sourceName}>{sliderItem.source_name}</Text>
          </View>
          <Text style={styles.title} numberOfLines={2}>
            {sliderItem.title}
          </Text>
        </LinearGradient>
        </Animated.View>
    </TouchableOpacity>
  </Link>

  );
};

export default SliderItem;

const styles = StyleSheet.create({
  itemWrapper: {
    width: ITEM_WIDTH,
    marginHorizontal: SPACING / 2, 
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  image: {
    width: "100%",
    height: 180,
    borderRadius: 20,
    resizeMode: "cover",
  },
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    width: "100%",
    height: 180,
    borderRadius: 20,
    padding: 20,
  },
  sourceInfo: {
    flexDirection: "row",
    position: "absolute",
    top: 85,
    paddingHorizontal: 20,
    alignItems: "center",
    gap: 10,
  },
  sourceName: {
    color: Colors.white,
    fontSize: 14,
    fontWeight: "600",
  },
  sourceIcon: {
    width: 25,
    height: 25,
    borderRadius: 20,
  },
  title: {
    fontSize: 15,
    color: Colors.white,
    position: "absolute",
    top: 120,
    paddingHorizontal: 20,
    fontWeight: "500",
  },
});
