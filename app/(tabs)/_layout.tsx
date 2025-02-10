import React from 'react';
import { Tabs } from 'expo-router';
import { TabBar } from '@/components/TabBar';
import { ThemeProvider } from '@/context/ThemeContext';

const TabLayout = () => {
  return (
    <ThemeProvider>
      <Tabs
        tabBar={(props) => <TabBar {...props} />}
        screenOptions={{ headerShown: false }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: 'Inicio',
          }}
        />
        <Tabs.Screen
          name="discover"
          options={{
            title: 'Discover',
          }}
        />
        <Tabs.Screen
          name="saved"
          options={{
            title: 'Saved',
          }}
        />
        <Tabs.Screen
          name="settings"
          options={{
            title: 'Settings',
          }}
        />
      </Tabs>
    </ThemeProvider>
  );
};

export default TabLayout;
