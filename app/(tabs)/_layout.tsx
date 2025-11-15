import { Tabs } from 'expo-router';
import React from 'react';

import { HapticTab } from '@/components/haptic-tab';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors['light'].tint,
        tabBarInactiveTintColor: Colors['light'].tabIconDefault,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarShowLabel: true,
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
          marginTop: 4,
        },
        tabBarStyle: {
          justifyContent: 'center',
          alignItems: 'center',
          height: 70,
        },
        tabBarItemStyle: {
          width: 'auto',
          minWidth: 120,
          justifyContent: 'center',
          alignItems: 'center',
          paddingHorizontal: 30,
          marginTop: 4,
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Login',
          href: null,
          tabBarStyle: { display: 'none' },
        }}
      />
      <Tabs.Screen
        name="services"
        options={{
          title: 'Serviços Oferecidos',
          tabBarLabel: 'Serviços Oferecidos',
          tabBarIcon: ({ color }) => (
            <IconSymbol 
              size={26} 
              name="star.fill" 
              color={color} 
            />
          ),
        }}
      />
      <Tabs.Screen
        name="user"
        options={{
          title: 'Usuário',
          tabBarLabel: 'Usuário',
          tabBarIcon: ({ color }) => (
            <IconSymbol 
              size={26} 
              name="person.fill" 
              color={color} 
            />
          ),
        }}
      />
    </Tabs>
  );
}
