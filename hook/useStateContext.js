import { useContext } from 'react'
import { StateContext } from '../context/StateContext'

const useStateContext = () => {
  const { state, handleState } = useContext(StateContext)
  return { state, handleState }
}

export default useStateContext
