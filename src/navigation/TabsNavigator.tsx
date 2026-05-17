import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View } from 'react-native';
import { colors } from '../theme/colors';
import { HomeScreen } from '../screens/HomeScreen';
import { LearnScreen } from '../screens/LearnScreen';
import { RankingsScreen } from '../screens/RankingsScreen';
import { ProfileScreen } from '../screens/ProfileScreen';

import { TabsParamList } from './types';

const Tab = createBottomTabNavigator<TabsParamList>();

const TabIcon = () => <View />;

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
      <Tab.Screen name="Play" component={HomeScreen} options={{ tabBarLabel: 'Play', tabBarIcon: TabIcon }} />
      <Tab.Screen name="Learn" component={LearnScreen} options={{ tabBarLabel: 'Learn', tabBarIcon: TabIcon }} />
      <Tab.Screen
        name="Rankings"
        component={RankingsScreen}
        options={{ tabBarLabel: 'Rankings', tabBarIcon: TabIcon }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ tabBarLabel: 'Profile', tabBarIcon: TabIcon }}
      />
    </Tab.Navigator>
  );
}

