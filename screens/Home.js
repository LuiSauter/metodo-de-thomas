import { Dropdown } from 'react-native-element-dropdown'
import { Image, KeyboardAvoidingView, StyleSheet, Text, TextInput, View, useWindowDimensions, Pressable, ScrollView } from 'react-native'
import { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'

import { COLORS } from '../config/constants'
import MetodoDeThomas from '../metodo-de-thomas'

import * as NavigationBar from 'expo-navigation-bar'

NavigationBar.setBackgroundColorAsync(COLORS.secondary)

const data = [
  { label: '3x3', value: 3 },
  { label: '4x4', value: 4 },
  { label: '5x5', value: 5 }
]

const Home = () => {
  const [valueSize, setValueSize] = useState(3)
  const [isFocus, setIsFocus] = useState(false)
  const [errors, setErrors] = useState()
  const [results, setResults] = useState(null)
  const [c1, setC1] = useState(Array.from({ length: valueSize }, () => null)) // diagonal superior
  const [b1, setB1] = useState(Array.from({ length: valueSize }, () => null)) // diagonal principal
  const [a1, setA1] = useState(Array.from({ length: valueSize }, () => null)) // diagonal inferior
  const [t1, setT1] = useState(Array.from({ length: valueSize }, () => null)) // términos independientes
  const { width } = useWindowDimensions()

  const solveThomas = () => {
    try {
      const c = Object.entries(c1).map(e => parseFloat(e[1]))
      const b = Object.entries(b1).map(e => parseFloat(e[1]))
      const a = Object.entries(a1).map(e => parseFloat(e[1]))
      const d = Object.entries(t1).map(e => parseFloat(e[1]))
      const x = MetodoDeThomas(c, b, a, d)
      setResults(x)
    } catch (error) {
      setErrors(error.message)
      setResults(null)
    }
  }

  useEffect(() => {
    setC1(Array.from({ length: valueSize }, () => null))
    setB1(Array.from({ length: valueSize }, () => null))
    setA1(Array.from({ length: valueSize }, () => null))
    setT1(Array.from({ length: valueSize }, () => null))
    c1[0] = 0
    a1[c1.length - 1] = 0
  }, [valueSize])

  useEffect(() => {
    if (errors) {
      const timer = setTimeout(() => {
        setErrors(null)
      }, 10000)
      return () => clearTimeout(timer)
    }
  }, [errors])

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={COLORS.tertiary} />
      <ScrollView contentContainerStyle={{ padding: 20 }}>
        <Text style={{ fontSize: 30, color: COLORS.text, fontWeight: '500' }}>Método de Thomas</Text>
        <Image source={require('../assets/images/metodo-thomas.png')} style={{ objectFit: 'contain', width: width - 40, height: width / 2, marginVertical: 10 }} />
        <Dropdown
          style={[styles.dropdown, isFocus && { borderColor: COLORS.text }]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          data={data}
          maxHeight={300}
          labelField='label'
          valueField='value'
          placeholder='Dimensión'
          value={valueSize}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={item => {
            setValueSize(item.value)
            setIsFocus(false)
          }}
        />
        <KeyboardAvoidingView keyboardVerticalOffset={90} enabled style={{ flex: 1 }}>
          <Text style={styles.subtitle}>Diagonal superior (cn)</Text>
          <View style={styles.c1}>
            {Array.from({ length: valueSize }, (_, index) => (
              <TextInput
                key={index}
                defaultValue={null}
                value={c1[index]}
                placeholder={`c${index + 1}`}
                keyboardType='number-pad'
                inputMode='numeric'
                onChangeText={textInput => {
                  setC1(prev => {
                    const newArray = [...prev]
                    if (index === 0) {
                      newArray[index] = '0'
                      return newArray
                    }
                    newArray[index] = textInput === '' ? null : textInput
                    return newArray
                  })
                }}
                style={[styles.input]}
                placeholderTextColor={COLORS.textSecondary}
              />
            ))}
          </View>
          <Text style={styles.subtitle}>Diagonal principal (bn)</Text>
          <View style={styles.c1}>
            {Array.from({ length: valueSize }, (_, index) => (
              <TextInput
                key={index}
                defaultValue={null}
                value={b1[index]}
                placeholder={`b${index + 1}`}
                keyboardType='number-pad'
                inputMode='numeric'
                onChangeText={textInput => {
                  setB1(prev => {
                    const newArray = [...prev]
                    newArray[index] = textInput === '' ? null : textInput
                    return newArray
                  })
                }}
                style={[styles.input]}
                placeholderTextColor={COLORS.textSecondary}
              />
            ))}
          </View>
          <Text style={styles.subtitle}>Diagonal inferior (an)</Text>
          <View style={styles.c1}>
            {Array.from({ length: valueSize }, (_, index) => (
              <TextInput
                key={index}
                defaultValue={null}
                value={a1[index]}
                placeholder={`a${index + 1}`}
                keyboardType='number-pad'
                inputMode='numeric'
                onChangeText={textInput => {
                  setA1(prev => {
                    const newArray = [...prev]
                    if (index === newArray.length - 1) {
                      newArray[index] = '0'
                      return newArray
                    }
                    newArray[index] = textInput === '' ? null : textInput
                    return newArray
                  })
                }}
                style={[styles.input]}
                placeholderTextColor={COLORS.textSecondary}
              />
            ))}
          </View>
          <Text style={styles.subtitle}>Términos independientes (dn)</Text>
          <View style={styles.c1}>
            {Array.from({ length: valueSize }, (_, index) => (
              <TextInput
                key={index}
                defaultValue={null}
                value={t1[index]}
                placeholder={`d${index + 1}`}
                keyboardType='number-pad'
                inputMode='numeric'
                onChangeText={textInput => {
                  setT1(prev => {
                    const newArray = [...prev]
                    newArray[index] = textInput === '' ? null : textInput
                    return newArray
                  })
                }}
                style={[styles.input]}
                placeholderTextColor={COLORS.textSecondary}
              />
            ))}
          </View>
          {results &&
            <View style={{ backgroundColor: COLORS.text, borderRadius: 20, paddingHorizontal: 20, paddingBottom: 10, marginTop: 12 }}>
              <Text style={[styles.subtitle, { color: COLORS.tertiary }]}>Resultados:</Text>
              <View style={styles.results}>
                {results.map((result, index) => (
                  <Text key={index} style={styles.resultText}>
                    {`d${index + 1}= ${result.toFixed(2)}`}
                  </Text>
                ))}
              </View>
            </View>}
          {errors && <Text style={{ color: 'red', paddingTop: 14, textAlign: 'center', fontSize: 20 }}>{errors}</Text>}
          <View style={{ borderRadius: 100, overflow: 'hidden', marginTop: 20 }}>
            <Pressable
              android_ripple={{
                color: '#25282b22'
              }}
              onPress={solveThomas}
              style={[styles.button, { width: width - 40 }]}
            >
              <Text style={styles.text}>Calcular</Text>
            </Pressable>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Home

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.tertiary,
    flex: 1,
    justifyContent: 'space-evenly'
  },
  dropdown: {
    height: 50,
    borderColor: COLORS.text,
    borderWidth: 0.5,
    backgroundColor: COLORS.primary,
    borderRadius: 100,
    paddingHorizontal: 20,
    width: '40%',
    marginBottom: 10
  },
  icon: {
    marginRight: 5
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14
  },
  placeholderStyle: {
    fontSize: 16
  },
  selectedTextStyle: {
    fontSize: 16
  },
  iconStyle: {
    width: 20,
    height: 20
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16
  },
  c1: {
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
    paddingBottom: 10
  },
  input: {
    backgroundColor: COLORS.secondary,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 7,
    fontSize: 16,
    flex: 1
  },
  subtitle: {
    fontSize: 20,
    paddingVertical: 10
  },
  button: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 100
  },
  text: {
    fontSize: 24,
    fontWeight: '500',
    color: COLORS.text,
    textAlign: 'center',
    paddingHorizontal: 20
  },
  results: {
    display: 'flex',
    flexDirection: 'column',
    gap: 10
  },
  resultText: {
    fontSize: 20,
    color: COLORS.textSecondary
  }
})
