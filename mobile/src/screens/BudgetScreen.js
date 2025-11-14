import React from 'react'
import { View, Text, StyleSheet, ScrollView } from 'react-native'
import { useTheme } from '../contexts/ThemeContext'

export default function BudgetScreen() {
  const { currentTheme } = useTheme()
  const isDark = currentTheme === 'dark'

  return (
    <ScrollView
      style={[styles.container, isDark && styles.containerDark]}
      contentContainerStyle={styles.content}
    >
      <Text style={[styles.title, isDark && styles.titleDark]}>Budget</Text>
      <Text style={[styles.subtitle, isDark && styles.subtitleDark]}>
        Track your income and expenses
      </Text>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  containerDark: {
    backgroundColor: '#111827',
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 8,
  },
  titleDark: {
    color: '#f9fafb',
  },
  subtitle: {
    fontSize: 16,
    color: '#6b7280',
  },
  subtitleDark: {
    color: '#9ca3af',
  },
})

