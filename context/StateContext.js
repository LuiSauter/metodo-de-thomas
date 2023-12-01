import { createContext, useCallback, useMemo, useState } from 'react'
import constants from '../config/constants'
import AsyncStorage from '@react-native-async-storage/async-storage'

export const StateContext = createContext({})

export const INITIAL_STATE = {
  isInit: true
}

let stateStorage
const getInitData = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem(constants.STORAGE_STATE)
    return jsonValue !== null ? JSON.parse(jsonValue) : INITIAL_STATE
  } catch (error) {
    console.error(error.message)
  }
}
getInitData().then(res => (stateStorage = res))

export const StateProvider = ({ children }) => {
  const [state, setState] = useState(stateStorage)

  const handleState = useCallback(async ({ isInit }) => {
    try {
      const newState = { isInit }
      await AsyncStorage.setItem(constants.STORAGE_STATE, JSON.stringify(newState))
      setState(!state)
    } catch (error) {
      console.error(error.message)
    }
  }, [])

  const memoedValue = useMemo(() => {
    return { state, handleState }
  }, [state, handleState])

  return <StateContext.Provider value={memoedValue}>{children}</StateContext.Provider>
}
