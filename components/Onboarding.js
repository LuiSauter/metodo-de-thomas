import { Animated, Pressable, SafeAreaView, StyleSheet, Text, View, useWindowDimensions } from 'react-native'
import slides from '../assets/data/slides'
import OnboardingItem from './OnboardingItem'
import { useEffect, useRef, useState } from 'react'
import Paginator from './Paginator'
import useStateContext from '../hook/useStateContext'
import { useNavigation } from '@react-navigation/native'
import { COLORS } from '../config/constants'
import { StatusBar } from 'expo-status-bar'
import * as NavigationBar from 'expo-navigation-bar'

NavigationBar.setBackgroundColorAsync(COLORS.primary)

const Onboarding = () => {
  const { handleState } = useStateContext()
  const navigation = useNavigation()
  const { width } = useWindowDimensions()
  const [currentIndex, setCurrentIndex] = useState(0)
  // const [animateFade] = useState(new Animated.Value(0))
  const [active, setActive] = useState(false)
  const scrollX = useRef(new Animated.Value(0)).current
  const slidesRef = useRef(null)

  const viewableItemsChanged = useRef(({ viewableItems }) => {
    setCurrentIndex(viewableItems[0].index)
  }).current

  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current

  useEffect(() => {
    setActive(currentIndex !== slides.length - 1)
  }, [currentIndex])

  // useEffect(() => {
  //   const opt = { duration: 10000, toValue: 1 }
  //   Animated.timing(animateFade, opt).start()
  // }, [])

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={COLORS.primary} />
      <View style={{ flex: 3 }}>
        <Animated.FlatList
          data={slides}
          renderItem={({ item }) => <OnboardingItem item={item} />}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          bounces={false}
          keyExtractor={(item) => item.id}
          onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], { useNativeDriver: false })}
          scrollEventThrottle={32}
          onViewableItemsChanged={viewableItemsChanged}
          viewabilityConfig={viewConfig}
          ref={slidesRef}
        />
      </View>
      <Paginator data={slides} scrollX={scrollX} />
      <View style={{ borderRadius: 100, overflow: 'hidden' }}>
        <Pressable
          android_ripple={{
            color: '#09fas'
          }}
          onPress={() => {
            if (active) {
              slidesRef.current.scrollToIndex({ index: currentIndex + 1 })
            } else {
              handleState({ isInit: false })
              navigation.navigate('HomeScreen')
            }
          }}
          style={[styles.button, { width: width - 40 }]}
        // disabled={active}
        >
          <Text style={styles.text}>Continuar</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  )
}

export default Onboarding

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 20,
    backgroundColor: COLORS.primary
  },
  button: {
    backgroundColor: COLORS.text,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 100
  },
  text: {
    fontSize: 24,
    fontWeight: '500',
    color: COLORS.secondary,
    textAlign: 'center',
    paddingHorizontal: 20
  }
})
