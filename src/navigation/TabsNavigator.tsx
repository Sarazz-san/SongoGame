import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { colors } from '../theme/colors';
import { HomeScreen } from '../screens/HomeScreen';
import { LearnScreen } from '../screens/LearnScreen';

import { ProfileScreen } from '../screens/ProfileScreen';

import { TabsParamList } from './types';

const Tab = createBottomTabNavigator<TabsParamList>();

export function TabsNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.ebonyDeep,
          borderTopColor: colors.outlineVariant,
        },
        tabBarActiveTintColor: colors.tacticalGold,
        tabBarInactiveTintColor: colors.onSurfaceVariant,
        sceneStyle: { backgroundColor: colors.background },
        tabBarHideOnKeyboard: true,
      }}
    >
      <Tab.Screen 
        name="Play" 
        component={HomeScreen} 
        options={{ 
          tabBarLabel: 'Play', 
          tabBarIcon: ({ color, size }) => <MaterialIcons name="sports-esports" size={size} color={color} /> 
        }} 
      />
      <Tab.Screen 
        name="Learn" 
        component={LearnScreen} 
        options={{ 
          tabBarLabel: 'Learn', 
          tabBarIcon: ({ color, size }) => <MaterialIcons name="school" size={size} color={color} /> 
        }} 
      />

      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ 
          tabBarLabel: 'Profile', 
          tabBarIcon: ({ color, size }) => <MaterialIcons name="person" size={size} color={color} /> 
        }}
      />
    </Tab.Navigator>
  );
}

