import React, { createContext, useContext, useState, useEffect } from 'react'
import { useColorScheme } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'

const ThemeContext = createContext({})

export const useTheme = () => useContext(ThemeContext)

export const ThemeProvider = ({ children }) => {
  const systemTheme = useColorScheme()
  const [theme, setTheme] = useState('system')

  useEffect(() => {
    loadTheme()
  }, [])

  const loadTheme = async () => {
    try {
      const savedTheme = await AsyncStorage.getItem('theme')
      if (savedTheme) {
        setTheme(savedTheme)
      }
    } catch (error) {
      console.error('Error loading theme:', error)
    }
  }

  const toggleTheme = async () => {
    const newTheme = theme === 'light' ? 'dark' : theme === 'dark' ? 'system' : 'light'
    setTheme(newTheme)
    try {
      await AsyncStorage.setItem('theme', newTheme)
    } catch (error) {
      console.error('Error saving theme:', error)
    }
  }

  const currentTheme = theme === 'system' ? systemTheme : theme

  return (
    <ThemeContext.Provider value={{ theme, currentTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

