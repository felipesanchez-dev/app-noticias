import React, { useEffect, useRef, useState, useContext } from "react";
import { StyleSheet, Text, useWindowDimensions, View, ViewToken } from "react-native";
import { Colors } from "@/constants/Colors";
import { NewsDataType } from "@/types";
import SliderItem from "@/components/SliderItem";
import Animated, {
  scrollTo,
  useAnimatedRef,
  useAnimatedScrollHandler,
  useDerivedValue,
  useSharedValue,
} from "react-native-reanimated";
import Pagination from "@/components/Pagination";
import { ThemeContext } from "@/context/ThemeContext";

type Props = {
  newList: Array<NewsDataType>;
};

const BreakingNews = ({ newList }: Props) => {
  const { isDarkMode } = useContext(ThemeContext);
  const [paginationIndex, setPaginationIndex] = useState(0);
  const scrollX = useSharedValue(0);
  const ref = useAnimatedRef<Animated.FlatList<any>>();
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const interval = useRef<NodeJS.Timeout>();
  const offset = useSharedValue(0);
  const { width } = useWindowDimensions();

  const onScrollHandler = useAnimatedScrollHandler({
    onScroll: (e) => {
      scrollX.value = e.contentOffset.x;
    },
    onMomentumEnd: (e) => {
      offset.value = e.contentOffset.x;
    },
  });

  const onViewableItemsChanged = ({
    viewableItems,
  }: {
    viewableItems: ViewToken[];
  }) => {
    if (viewableItems.length > 0 && viewableItems[0].index !== undefined) {
      if (viewableItems[0].index !== null) {
        setPaginationIndex(viewableItems[0].index);
      }
    }
  };

  useEffect(() => {
    if (isAutoPlay === true) {
      interval.current = setInterval(() => {
        offset.value = (offset.value + width) % (newList.length * width);
      }, 5000);
    } else {
      clearInterval(interval.current);
    }
    return () => {
      clearInterval(interval.current);
    };
  }, [isAutoPlay, offset, width, newList.length]);

  useDerivedValue(() => {
    scrollTo(ref, offset.value, 0, true);
  });

  const viewabilityConfig = {
    itemVisiblePercentThreshold: 50,
  };

  const viewabilityConfigCallbackPairs = useRef([
    { viewabilityConfig, onViewableItemsChanged },
  ]);

  return (
    <View style={[styles.container, isDarkMode && styles.containerDark]}>
      <Text style={[styles.title, isDarkMode && styles.titleDark]}>
        ¿Qué Pasó Hoy en el Mundo?
      </Text>
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
          onScrollBeginDrag={() => {
            setIsAutoPlay(false);
          }}
          onScrollEndDrag={() => {
            setIsAutoPlay(true);
          }}
        />
        <Pagination items={newList} paginationIndex={paginationIndex} />
      </View>
    </View>
  );
};

export default BreakingNews;

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  containerDark: {
    backgroundColor: "#121212", // Color de fondo para el modo oscuro
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: Colors.black,
    marginBottom: 10,
    marginLeft: 10,
    elevation: 2,
  },
  titleDark: {
    color: Colors.white, // Color del título en modo oscuro
  },
  slideWrapper: {
    justifyContent: "center",
  },
});
