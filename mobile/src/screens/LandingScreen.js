import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native'
import { useTheme } from '../contexts/ThemeContext'

export default function LandingScreen({ navigation }) {
  const { currentTheme } = useTheme()
  const isDark = currentTheme === 'dark'

  return (
    <ScrollView
      style={[styles.container, isDark && styles.containerDark]}
      contentContainerStyle={styles.content}
    >
      <View style={styles.header}>
        <Text style={[styles.title, isDark && styles.titleDark]}>FinFlow</Text>
        <Text style={[styles.subtitle, isDark && styles.subtitleDark]}>
          Master Your Money with AI-Powered Insights
        </Text>
        <Text style={[styles.description, isDark && styles.descriptionDark]}>
          The all-in-one personal finance platform that combines budgeting, investing, learning, and community support.
        </Text>
      </View>

      <View style={styles.buttons}>
        <TouchableOpacity
          style={styles.primaryButton}
          onPress={() => navigation.navigate('Signup')}
        >
          <Text style={styles.primaryButtonText}>Get Started</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.secondaryButton, isDark && styles.secondaryButtonDark]}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={[styles.secondaryButtonText, isDark && styles.secondaryButtonTextDark]}>
            Sign In
          </Text>
        </TouchableOpacity>
      </View>
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
    flexGrow: 1,
    justifyContent: 'center',
    padding: 24,
  },
  header: {
    alignItems: 'center',
    marginBottom: 48,
  },
  title: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#22c55e',
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#111827',
    textAlign: 'center',
    marginBottom: 16,
  },
  subtitleDark: {
    color: '#f9fafb',
  },
  description: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
    lineHeight: 24,
  },
  descriptionDark: {
    color: '#9ca3af',
  },
  buttons: {
    gap: 16,
  },
  primaryButton: {
    backgroundColor: '#22c55e',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
  },
  secondaryButton: {
    backgroundColor: '#e5e7eb',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
  },
  secondaryButtonDark: {
    backgroundColor: '#374151',
  },
  secondaryButtonText: {
    color: '#111827',
    fontSize: 18,
    fontWeight: '600',
  },
  secondaryButtonTextDark: {
    color: '#f9fafb',
  },
})

