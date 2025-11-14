import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { StatusBar } from 'expo-status-bar'
import { AuthProvider, useAuth } from './src/contexts/AuthContext'
import { ThemeProvider } from './src/contexts/ThemeContext'

// Screens
import LandingScreen from './src/screens/LandingScreen'
import LoginScreen from './src/screens/LoginScreen'
import SignupScreen from './src/screens/SignupScreen'
import DashboardScreen from './src/screens/DashboardScreen'
import PortfolioScreen from './src/screens/PortfolioScreen'
import BudgetScreen from './src/screens/BudgetScreen'
import GoalsScreen from './src/screens/GoalsScreen'
import LearningScreen from './src/screens/LearningScreen'
import CommunityScreen from './src/screens/CommunityScreen'
import AICoachScreen from './src/screens/AICoachScreen'
import SettingsScreen from './src/screens/SettingsScreen'

// Icons
import { Ionicons } from '@expo/vector-icons'

const Stack = createStackNavigator()
const Tab = createBottomTabNavigator()

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName

          if (route.name === 'Dashboard') {
            iconName = focused ? 'home' : 'home-outline'
          } else if (route.name === 'Portfolio') {
            iconName = focused ? 'trending-up' : 'trending-up-outline'
          } else if (route.name === 'Budget') {
            iconName = focused ? 'wallet' : 'wallet-outline'
          } else if (route.name === 'Goals') {
            iconName = focused ? 'flag' : 'flag-outline'
          } else if (route.name === 'Learning') {
            iconName = focused ? 'book' : 'book-outline'
          } else if (route.name === 'Community') {
            iconName = focused ? 'people' : 'people-outline'
          } else if (route.name === 'AI Coach') {
            iconName = focused ? 'sparkles' : 'sparkles-outline'
          } else if (route.name === 'Settings') {
            iconName = focused ? 'settings' : 'settings-outline'
          }

          return <Ionicons name={iconName} size={size} color={color} />
        },
        tabBarActiveTintColor: '#22c55e',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      })}
    >
      <Tab.Screen name="Dashboard" component={DashboardScreen} />
      <Tab.Screen name="Portfolio" component={PortfolioScreen} />
      <Tab.Screen name="Budget" component={BudgetScreen} />
      <Tab.Screen name="Goals" component={GoalsScreen} />
      <Tab.Screen name="Learning" component={LearningScreen} />
      <Tab.Screen name="Community" component={CommunityScreen} />
      <Tab.Screen name="AI Coach" component={AICoachScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  )
}

function AppNavigator() {
  const { user, loading } = useAuth()

  if (loading) {
    return null // Show loading screen
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {user ? (
          <Stack.Screen name="Main" component={MainTabs} />
        ) : (
          <>
            <Stack.Screen name="Landing" component={LandingScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Signup" component={SignupScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <StatusBar style="auto" />
        <AppNavigator />
      </AuthProvider>
    </ThemeProvider>
  )
}

