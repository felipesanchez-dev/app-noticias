import { StyleSheet, Switch, Text, TouchableOpacity, View, Animated, Linking  } from 'react-native';
import React, { useContext, useRef } from 'react';
import { Stack, useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';
import { ThemeContext } from '@/context/ThemeContext';

const Page = () => {
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);
  const router = useRouter();
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handleToggle = () => {
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 1.1,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
    toggleTheme();
  };

  const Acercade = () => {
    Linking.openURL('https://github.com/felipesanchez-dev/app-noticias');
  };

  const ReportarBug = () => {
    Linking.openURL('https://github.com/felipesanchez-dev/app-noticias/issues/new');
  };
  const PoliticasDePrivacidad = () => {
    Linking.openURL('https://github.com/felipesanchez-dev/app-noticias/issues/new');
  };

  return (
      <>
      <Stack.Screen
        options={{
        headerShown: true,
        title: 'Ajustes',
        headerStyle: {
          backgroundColor: isDarkMode ? '#121212' : '#f2f2f2', 
        },
        headerTintColor: isDarkMode ? '#ffffff' : '#000000', 
        headerTitleStyle: {
          color: isDarkMode ? '#ffffff' : '#000000',
        },
      }}
    />


      <View style={[styles.container, isDarkMode && styles.containerDark]}>
        <Text style={[styles.heading, isDarkMode && styles.headingDark]}>
          Ajustes generales
        </Text>

        {/* Botón Reportar un bug */}
        <TouchableOpacity 
          style={[styles.itemBtn, isDarkMode && styles.itemBtnDark]}
          onPress={ReportarBug}>
          <Text style={[styles.itemBtnTxt, isDarkMode && styles.itemBtnTxtDark]}>
            Reportar un bug
          </Text>
          
          <MaterialIcons
            name="arrow-forward-ios"
            size={18}
            color={isDarkMode ? Colors.white : Colors.lightGrey}
          />
        </TouchableOpacity>

        {/* Botón Políticas de privacidad */}
        <TouchableOpacity 
          style={[styles.itemBtn, isDarkMode && styles.itemBtnDark]}
          onPress={PoliticasDePrivacidad}
          >
          <Text style={[styles.itemBtnTxt, isDarkMode && styles.itemBtnTxtDark]}>
            Políticas de privacidad
          </Text>
          <MaterialIcons
            name="arrow-forward-ios"
            size={18}
            color={isDarkMode ? Colors.white : Colors.lightGrey}
          />
        </TouchableOpacity>

        {/* Botón Condiciones de uso */}
        <TouchableOpacity 
          style={[styles.itemBtn, isDarkMode && styles.itemBtnDark]}
          >
          <Text style={[styles.itemBtnTxt, isDarkMode && styles.itemBtnTxtDark]}>
            Condiciones de uso
          </Text>
          <MaterialIcons
            name="arrow-forward-ios"
            size={18}
            color={isDarkMode ? Colors.white : Colors.lightGrey}
          />
        </TouchableOpacity>

        {/* Botón Modo Oscuro */}
        <TouchableOpacity 
          style={[styles.BtnDarkMode, isDarkMode && styles.itemBtnDark]} onPress={handleToggle}
          >
          <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
            <Text style={[styles.itemBtnTxt, isDarkMode && styles.itemBtnTxtDark]}>
              Modo Oscuro
            </Text>
          </Animated.View>
          <Switch 
            trackColor={{ false: '#767577', true: '#3e3e3e' }}
            thumbColor={isDarkMode ? '#f5dd4b' : '#f4f3f4'}
            ios_backgroundColor='#3e3e3e'
            onValueChange={handleToggle}
            value={isDarkMode}
          />
        </TouchableOpacity>

        {/* Botón Acerca de */}
        <TouchableOpacity 
          style={[styles.itemBtn, isDarkMode && styles.itemBtnDark]} 
          onPress={Acercade}
          >
          <Text style={[styles.itemBtnTxt, isDarkMode && styles.itemBtnTxtDark]}>
            Acerca de
          </Text>
          <MaterialIcons
            name="arrow-forward-ios"
            size={18}
            color={isDarkMode ? Colors.white : Colors.lightGrey}
          />
        </TouchableOpacity>
      </View>
    </>
  );
};

export default Page;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    padding: 20,
  },
  containerDark: {
    backgroundColor: '#121212',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: Colors.black,
  },
  headingDark: {
    color: Colors.white,
  },
  BtnDarkMode: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.white,
    paddingHorizontal: 20,
    paddingVertical: 18,
    marginVertical: 10,
    borderRadius: 20,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  itemBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.white,
    paddingHorizontal: 20,
    paddingVertical: 18,
    marginVertical: 10,
    borderRadius: 20,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  itemBtnDark: {
    backgroundColor: '#333333',
  },
  itemBtnTxt: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.black,
  },
  itemBtnTxtDark: {
    color: Colors.white,
  },
});
