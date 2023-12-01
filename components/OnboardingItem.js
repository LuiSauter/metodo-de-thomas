import { Image, StyleSheet, Text, View, useWindowDimensions } from 'react-native'
import React from 'react'
import { COLORS } from '../config/constants'

const OnboardingItem = ({ item }) => {
  const { width } = useWindowDimensions()
  return (
    <View style={[styles.container, { width }]}>
      <View style={{
        // backgroundColor: COLORS.secondary,
        flex: 0.4,
        width: width - 40,
        justifyContent: 'center',
        alignItems: 'center'
      }}
      >
        <Image source={item.image} style={[styles.image, { width: width / 1.2, resizeMode: 'contain' }]} />
      </View>
      <View style={{ flex: 0.3, paddingTop: 20 }}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
      </View>
    </View>
  )
}

export default OnboardingItem

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20
  },
  image: {
  },
  title: {
    fontWeight: '800',
    fontSize: 40,
    marginBottom: 10,
    color: COLORS.text,
    textAlign: 'center'
  },
  description: {
    fontWeight: '300',
    color: COLORS.text,
    textAlign: 'center',
    paddingHorizontal: 10,
    fontSize: 26
  }
})
