import React, { useRef, useState } from "react";
import { StyleSheet, Text, View, ViewToken } from "react-native";
import { Colors } from "@/constants/Colors";
import { NewsDataType } from "@/types";
import SliderItem from "@/components/SliderItem";
import Animated, {
  useAnimatedRef,
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";
import Pagination from "@/components/Pagination";

type Props = {
  newList: Array<NewsDataType>;
};

const BreakingNews = ({ newList }: Props) => {
  const [paginationIndex, setPaginationIndex] = useState(0);
  const scrollX = useSharedValue(0);
  const ref = useAnimatedRef<Animated.FlatList<any>>();

  const onScrollHandler = useAnimatedScrollHandler({
    onScroll: (e) => {
      scrollX.value = e.contentOffset.x;
    },
  });

  const onViewableItemsChanged = ({
    viewableItems,
  }: {
    viewableItems: ViewToken[];
  }) => {
    if (viewableItems.length > 0 && viewableItems[0].index !== undefined) {
      console.log("Visible item index:", viewableItems[0].index);
      setPaginationIndex(viewableItems[0].index);
    }
  };

  const viewabilityConfig = {
    itemVisiblePercentThreshold: 50, 
  };

  const viewabilityConfigCallbackPairs = useRef([
    { viewabilityConfig, onViewableItemsChanged },
  ]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>¿Qué Pasó Hoy en el Mundo?</Text>
      <View style={styles.slideWrapper}>
        <Animated.FlatList
          ref={ref}
          data={newList}
          keyExtractor={(_, index) => `list_item_${index}`}
          renderItem={({ item, index }) => (
            <SliderItem sliderItem={item} index={index} scrollX={scrollX} />
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          onScroll={onScrollHandler}
          scrollEventThrottle={16}
          viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}
        />
        <Pagination
          items={newList}
          paginationIndex={paginationIndex}
        />
      </View>
    </View>
  );
};

export default BreakingNews;

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: Colors.black,
    marginBottom: 10,
    marginLeft: 10,
    elevation: 2,
  },
  slideWrapper: {
    justifyContent: "center",
  },
});
