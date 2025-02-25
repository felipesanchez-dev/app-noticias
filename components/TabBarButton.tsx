import { Pressable, StyleSheet, GestureResponderEvent } from "react-native";
import React, { useEffect } from "react";
import { icon, } from "@/constants/Icons";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { Colors } from "@/constants/Colors";

const TabBarButton = ({
  onPress,
  onLongPress,
  isFocused,
  routeName,
  label,
}: {
  onPress: (event: GestureResponderEvent) => void;
  onLongPress: (event: GestureResponderEvent) => void;
  isFocused: boolean;
  routeName: keyof typeof icon;
  label: string;
}) => {
  const opacity = useSharedValue(0);
  useEffect(() => {
    opacity.value = withSpring(
      typeof isFocused === "boolean" ? (isFocused ? 1 : 0) : isFocused,
      { duration: 50 }
    );
  }, [opacity, isFocused]);
  const animatedTextStyle = useAnimatedStyle(() => {
    const opacityValue = interpolate(opacity.value, [0, 1], [1, 0]);
    return {
      opacity: opacityValue,
    };
  });
  return (
    <Pressable
      onPress={onPress}
      onLongPress={onLongPress}
      style={styles.tabbarBtn}
    >
      {icon[routeName]({
        color: isFocused ? Colors.tint : Colors.tabIconDefault,
        focused: isFocused,
      })}
      <Animated.Text
        style={[
          {
            color: isFocused ? Colors.tint : Colors.tabIconDefault,
            fontSize: 12,
          },
          animatedTextStyle,
        ]}
      >
        {label}
      </Animated.Text>
    </Pressable>
  );
};
export default TabBarButton;
const styles = StyleSheet.create({
  tabbarBtn: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
  },
});
