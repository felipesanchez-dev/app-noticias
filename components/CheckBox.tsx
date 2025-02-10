import { StyleSheet, Text, View } from 'react-native';
import React, { useContext } from 'react';
import { Colors } from '@/constants/Colors';
import { AntDesign } from '@expo/vector-icons';
import Animated, { FadeIn, FadeOut, LinearTransition, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { ThemeContext } from '@/context/ThemeContext';

type Props = {
    label: string;
    checked: boolean;
    onPress: () => void;
};

const CheckBox = ({ label, checked, onPress }: Props) => {
    const { isDarkMode } = useContext(ThemeContext); // Obtener el modo oscuro

    const rnAnimatedContainerStyle = useAnimatedStyle(() => {
        return {
            backgroundColor: withTiming(
                checked
                    ? (isDarkMode ? "rgba(0, 122, 255, 0.1)" : "rgba(239, 142, 82, 0.1)") // Azul claro en dark mode
                    : "transparent",
                { duration: 150 }
            ),
            borderColor: withTiming(
                checked ? Colors.tint : (isDarkMode ? Colors.white : Colors.black),
                { duration: 150 }
            ),
            paddingLeft: 16,
            paddingRight: checked ? 10 : 16,
        };
    }, [checked, isDarkMode]);

    const rnTextStyle = useAnimatedStyle(() => {
        return {
            color: withTiming(
                checked ? Colors.tint : (isDarkMode ? Colors.white : Colors.black), 
                { duration: 150 }
            ),
        };
    }, [checked, isDarkMode]);

    return (
        <Animated.View 
            style={[styles.container, rnAnimatedContainerStyle]} 
            onTouchEnd={onPress}
            layout={LinearTransition.springify().mass(0.8)}
        >
            <Animated.Text style={[styles.label, rnTextStyle]}>{label}</Animated.Text>
            {checked && (
                <Animated.View
                    style={styles.iconWrapper}
                    entering={FadeIn.duration(350)}
                    exiting={FadeOut}
                >
                    <AntDesign name="checkcircle" size={14} color={isDarkMode ? "white" : Colors.tint} />
                </Animated.View>
            )}
        </Animated.View>
    );
};

export default CheckBox;

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1,
        borderColor: Colors.black,
        borderRadius: 35,
        paddingVertical: 8,
        paddingHorizontal: 16,
    },
    label: {
        fontSize: 14,
        color: Colors.black,
    },
    iconWrapper: {
        marginLeft: 8,
        height: 14,
        width: 14,
    },
});
