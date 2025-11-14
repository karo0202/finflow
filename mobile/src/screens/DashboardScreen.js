import React from 'react'
import { View, Text, ScrollView, StyleSheet } from 'react-native'
import { useAuth } from '../contexts/AuthContext'
import { useTheme } from '../contexts/ThemeContext'

export default function DashboardScreen() {
  const { user } = useAuth()
  const { currentTheme } = useTheme()
  const isDark = currentTheme === 'dark'

  return (
    <ScrollView
      style={[styles.container, isDark && styles.containerDark]}
      contentContainerStyle={styles.content}
    >
      <View style={styles.header}>
        <Text style={[styles.title, isDark && styles.titleDark]}>
          Welcome back, {user?.displayName || 'User'}!
        </Text>
        <Text style={[styles.subtitle, isDark && styles.subtitleDark]}>
          Here's your financial overview
        </Text>
      </View>

      {/* Stats Cards */}
      <View style={styles.statsContainer}>
        <View style={[styles.statCard, isDark && styles.statCardDark]}>
          <Text style={[styles.statLabel, isDark && styles.statLabelDark]}>
            Total Portfolio
          </Text>
          <Text style={[styles.statValue, isDark && styles.statValueDark]}>
            $45,230.50
          </Text>
          <Text style={styles.statChange}>+6.2%</Text>
        </View>

        <View style={[styles.statCard, isDark && styles.statCardDark]}>
          <Text style={[styles.statLabel, isDark && styles.statLabelDark]}>
            Monthly Income
          </Text>
          <Text style={[styles.statValue, isDark && styles.statValueDark]}>
            $5,200
          </Text>
          <Text style={styles.statChange}>+2.5%</Text>
        </View>
      </View>

      {/* Recent Activity */}
      <View style={[styles.section, isDark && styles.sectionDark]}>
        <Text style={[styles.sectionTitle, isDark && styles.sectionTitleDark]}>
          Recent Transactions
        </Text>
        <View style={styles.transactionList}>
          <View style={styles.transactionItem}>
            <Text style={[styles.transactionText, isDark && styles.transactionTextDark]}>
              AAPL Stock Purchase
            </Text>
            <Text style={styles.transactionAmount}>+$1,000</Text>
          </View>
          <View style={styles.transactionItem}>
            <Text style={[styles.transactionText, isDark && styles.transactionTextDark]}>
              Emergency Fund Deposit
            </Text>
            <Text style={styles.transactionAmount}>+$500</Text>
          </View>
        </View>
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
    padding: 16,
  },
  header: {
    marginBottom: 24,
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
  statsContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statCardDark: {
    backgroundColor: '#1f2937',
  },
  statLabel: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 8,
  },
  statLabelDark: {
    color: '#9ca3af',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 4,
  },
  statValueDark: {
    color: '#f9fafb',
  },
  statChange: {
    fontSize: 14,
    color: '#22c55e',
    fontWeight: '600',
  },
  section: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionDark: {
    backgroundColor: '#1f2937',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 16,
  },
  sectionTitleDark: {
    color: '#f9fafb',
  },
  transactionList: {
    gap: 12,
  },
  transactionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  transactionText: {
    fontSize: 16,
    color: '#111827',
  },
  transactionTextDark: {
    color: '#f9fafb',
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: '600',
    color: '#22c55e',
  },
})

