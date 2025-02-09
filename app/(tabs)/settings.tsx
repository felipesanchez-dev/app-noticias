import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import { MaterialIcons } from '@expo/vector-icons'
import { Colors } from '@/constants/Colors'

const Page = () => {
  return (
    <>
      <Stack.Screen options={{
        headerShown: true }
        } />
        <View style={styles.container}>
        <TouchableOpacity style={styles.itemBtn}>
          <Text style={styles.itemBtnTxt}>About</Text>
          <MaterialIcons  
            name='arrow-forward-ios' 
            size={16}
            color={Colors.lightGrey}
            />
        </TouchableOpacity>
      </View>
    </>
  )
}

export default Page

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  itemBtn: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: Colors.white,
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  itemBtnTxt: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.black,
  },
})
