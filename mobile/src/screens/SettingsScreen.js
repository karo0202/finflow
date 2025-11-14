import React from 'react'
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import { useAuth } from '../contexts/AuthContext'
import { useTheme } from '../contexts/ThemeContext'

export default function SettingsScreen() {
  const { user, logout } = useAuth()
  const { currentTheme, toggleTheme } = useTheme()
  const isDark = currentTheme === 'dark'

  return (
    <ScrollView
      style={[styles.container, isDark && styles.containerDark]}
      contentContainerStyle={styles.content}
    >
      <Text style={[styles.title, isDark && styles.titleDark]}>Settings</Text>
      
      <View style={[styles.section, isDark && styles.sectionDark]}>
        <Text style={[styles.sectionTitle, isDark && styles.sectionTitleDark]}>
          Profile
        </Text>
        <Text style={[styles.sectionText, isDark && styles.sectionTextDark]}>
          {user?.displayName || user?.email}
        </Text>
      </View>

      <TouchableOpacity
        style={[styles.button, isDark && styles.buttonDark]}
        onPress={toggleTheme}
      >
        <Text style={[styles.buttonText, isDark && styles.buttonTextDark]}>
          Toggle Theme ({currentTheme})
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.logoutButton]}
        onPress={logout}
      >
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>
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
    marginBottom: 24,
  },
  titleDark: {
    color: '#f9fafb',
  },
  section: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  sectionDark: {
    backgroundColor: '#1f2937',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 8,
  },
  sectionTitleDark: {
    color: '#f9fafb',
  },
  sectionText: {
    fontSize: 16,
    color: '#6b7280',
  },
  sectionTextDark: {
    color: '#9ca3af',
  },
  button: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  buttonDark: {
    backgroundColor: '#1f2937',
    borderColor: '#374151',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  buttonTextDark: {
    color: '#f9fafb',
  },
  logoutButton: {
    backgroundColor: '#ef4444',
    borderColor: '#ef4444',
  },
  logoutButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
})

