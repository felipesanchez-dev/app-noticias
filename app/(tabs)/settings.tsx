import { StyleSheet, Switch, Text, TouchableOpacity, View, Animated } from 'react-native';
import React, { useState, useRef } from 'react';
import { Stack } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';

type Props = {}
const Page = () => {
  const [isEnabled, setEnabled] = useState(false);
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const toggleSwitch = () => {
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
    setEnabled((previousState) => !previousState);
  };

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          title: 'Ajustes',
        }}
      />
      <View style={styles.container}>
        <Text style={styles.heading}>Ajustes generales</Text>

        {/* Boton Acerca de */}
        <TouchableOpacity style={styles.itemBtn}>
          <Text style={styles.itemBtnTxt}>Acerca de</Text>
          <MaterialIcons name="arrow-forward-ios" size={18} color={Colors.lightGrey} />
        </TouchableOpacity>

        {/* Boton Enviar un comentario */}
        <TouchableOpacity style={styles.itemBtn}>
          <Text style={styles.itemBtnTxt}>Envia un comentario</Text>
          <MaterialIcons name="arrow-forward-ios" size={18} color={Colors.lightGrey} />
        </TouchableOpacity>

        {/* Boton Politicas de privacidad */}
        <TouchableOpacity style={styles.itemBtn}>
          <Text style={styles.itemBtnTxt}>Políticas de privacidad</Text>
          <MaterialIcons name="arrow-forward-ios" size={18} color={Colors.lightGrey} />
        </TouchableOpacity>

        {/* Boton Condiciones de uso */}
        <TouchableOpacity style={styles.itemBtn}>
          <Text style={styles.itemBtnTxt}>Condiciones de uso</Text>
          <MaterialIcons name="arrow-forward-ios" size={18} color={Colors.lightGrey} />
        </TouchableOpacity>

        {/* Boton Modo oscuro */}
        <TouchableOpacity style={styles.BtnDarkMode} onPress={toggleSwitch}>
          <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
            <Text style={styles.itemBtnTxt}>Modo Oscuro</Text>
          </Animated.View>
          <Switch 
            trackColor={{false: '#767577', true: '#3e3e3e'}}
            thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
            ios_backgroundColor= '#3e3e3e'
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
        </TouchableOpacity>

        {/* Boton Cerrar sesión */}
        <TouchableOpacity style={styles.itemBtn}>
          <Text style={[styles.itemBtnTxt, { color: "red" }]}>Cerrar sesión</Text>
          <MaterialIcons name="exit-to-app" size={18} color={Colors.lightGrey} />
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
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: Colors.black,
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
  itemBtnTxt: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.black,
  },
});