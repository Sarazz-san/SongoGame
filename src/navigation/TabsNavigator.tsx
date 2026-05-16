import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View } from 'react-native';
import { colors } from '../theme/colors';
import { HomeScreen } from '../screens/HomeScreen';
import { LearnScreen } from '../screens/LearnScreen';
import { RankingsScreen } from '../screens/RankingsScreen';
import { ProfileScreen } from '../screens/ProfileScreen';

export type TabsParamList = {
  Play: undefined;
  Learn: undefined;
  Rankings: undefined;
  Profile: undefined;
};

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
      <Tab.Screen name="Play" component={HomeScreen} options={{ tabBarLabel: 'Play', tabBarIcon: () => <View /> }} />
      <Tab.Screen name="Learn" component={LearnScreen} options={{ tabBarLabel: 'Learn', tabBarIcon: () => <View /> }} />
      <Tab.Screen
        name="Rankings"
        component={RankingsScreen}
        options={{ tabBarLabel: 'Rankings', tabBarIcon: () => <View /> }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ tabBarLabel: 'Profile', tabBarIcon: () => <View /> }}
      />
    </Tab.Navigator>
  );
}

