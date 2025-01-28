import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import SearchBar from "@/components/SearchBar"
import { useSafeAreaInsets } from 'react-native-safe-area-context'

type Props = {}

const Page = (props: Props) => {
  const { top: safetop } = useSafeAreaInsets();
  return (
    <View style={[styles.container, 
    {paddingTop: safetop + 20}]}>
      <SearchBar />
    </View>
  )
}

export default Page

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})