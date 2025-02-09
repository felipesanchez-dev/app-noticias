import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { Stack } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';

const Page = () => {
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
        <TouchableOpacity style={styles.BtnDarkMode}>
          <Text style={styles.itemBtnTxt}>Modo Oscuro</Text>
          <MaterialIcons name="brightness-6" size={18} color={Colors.lightGrey} />
        </TouchableOpacity>

        {/* Boton Cerrar sesión */}
        <TouchableOpacity style={styles.itemBtn}>
          <Text style={styles.itemBtnTxt}>Cerrar sesión</Text>
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
