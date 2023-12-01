import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Onboarding from '../components/Onboarding'
import Home from '../screens/Home'

const StackNavigation = ({ state }) => {
  const Stack = createNativeStackNavigator()
  return (
    <Stack.Navigator initialRouteName={state?.isInit ? 'OnboardingScreen' : 'HomeScreen'}>
      <Stack.Screen
        name='OnboardingScreen'
        component={Onboarding}
        options={{ headerShown: false, title: 'Inicio' }}
      />
      <Stack.Screen
        name='HomeScreen'
        component={Home}
        options={{ headerShown: false, title: 'Inicio' }}
      />
    </Stack.Navigator>
  )
}

export default StackNavigation
