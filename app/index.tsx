import {
  ImageBackground,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import { Colors } from "@/constants/Colors";
import Animated, { FadeInDown, FadeInRight } from "react-native-reanimated";
const Page = () => {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <ImageBackground
        source={require("@/assets/images/welcome.jpg")}
        style={{ flex: 1 }}
        resizeMode="cover"
      >
        <View style={styles.wrapper}>
          <Animated.Text
            style={styles.title}
            entering={FadeInRight.delay(300).duration(500)}
          >
            Tu Portal de Noticias Confiable
          </Animated.Text>
          <Animated.Text
            style={styles.description}
            entering={FadeInRight.delay(700).duration(500)}
          >
            Mantente al día con las noticias más relevantes y actualizadas del
            mundo. Todo lo que necesitas saber, en un solo lugar.
          </Animated.Text>
          <Animated.View entering={FadeInDown.delay(1200).duration(500)}>
            <TouchableOpacity
              style={styles.btn}
              onPress={() => router.replace("/(tabs)")}
            >
              <Text style={styles.btnText}>Explorar Noticias</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </ImageBackground>
    </View>
  );
};

export default Page;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrapper: {
    flex: 1,
    justifyContent: "flex-end",
    paddingBottom: 50,
    paddingHorizontal: 30,
    gap: 10,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  title: {
    color: Colors.white,
    fontSize: 24,
    fontWeight: "900",
    letterSpacing: 0.5,
    lineHeight: 36,
    textAlign: "center",
  },
  description: {
    color: Colors.white,
    fontSize: 18,
    fontWeight: "400",
    letterSpacing: 0.5,
    lineHeight: 22,
    textAlign: "center",
  },
  btn: {
    backgroundColor: Colors.softText,
    paddingVertical: 15,
    marginVertical: 20,
    alignItems: "center",
    borderRadius: 100,
  },
  btnText: {
    color: Colors.white,
    fontSize: 18,
    fontWeight: "700",
    letterSpacing: 0.5,
    lineHeight: 22,
  },
});
