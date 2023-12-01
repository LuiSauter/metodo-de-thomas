import 'react-native-gesture-handler'
import { StyleSheet } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { NavigationContainer } from '@react-navigation/native'
import StackNavigation from './navigation'
import { INITIAL_STATE, StateProvider } from './context/StateContext'
import constants from './config/constants'
import { useAsyncStorage } from '@react-native-async-storage/async-storage'
import { useEffect, useState } from 'react'

export default function App() {
  const [state, setState] = useState(null)
  const { getItem, setItem } = useAsyncStorage(constants.STORAGE_STATE)

  const readItemFromStorage = async () => {
    const item = await getItem()
    setState(item || INITIAL_STATE)
  }
  useEffect(() => {
    readItemFromStorage()
  }, [])

  return (
    <StateProvider>
      <SafeAreaProvider>
        <NavigationContainer>
          <StackNavigation state={state} />
        </NavigationContainer>
      </SafeAreaProvider>
    </StateProvider>
  )
}
