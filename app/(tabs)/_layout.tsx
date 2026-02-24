import { FontAwesome5 } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { Tabs } from 'expo-router';
import React from 'react';
import { Platform, Pressable, StyleSheet, View } from 'react-native';

const theme = {
  black: '#000000',
  zonaiGreen: '#00FFD1', 
  gold: '#fcac03',       
  darkCyan: '#003333',   
  glassBlack: 'rgba(5, 12, 12, 0.94)', 
};

// Componente customizado para as abas com efeito de Hover
const TabButton = (props: any) => {
  const { accessibilityState, onPress, children } = props;
  const focused = accessibilityState?.selected ?? false;

  return (
    <Pressable
      onPress={onPress}
      onPressIn={() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)}
      style={({ hovered }: any) => [
        styles.tabButton,
        hovered && { backgroundColor: 'rgba(0, 255, 209, 0.05)' },
        { transform: [{ scale: hovered ? 1.1 : 1 }] }
      ]}
    >
      {/* Indicador de "Runa Ativa" */}
      {focused && <View style={styles.activeIndicator} />}
      {children}
    </Pressable>
  );
};

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false, 
        tabBarShowLabel: false, 
        tabBarHideOnKeyboard: true, 

        tabBarStyle: {
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: theme.glassBlack,
          borderTopWidth: 1.5,
          borderTopColor: 'rgba(0, 255, 209, 0.3)',
          elevation: 0,
          // Altura ajustada para ícones centralizados
          height: Platform.OS === 'ios' ? 88 : 70,
          paddingBottom: Platform.OS === 'ios' ? 28 : 0,
          shadowColor: theme.zonaiGreen,
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.1,
          shadowRadius: 10,
        },
        tabBarActiveTintColor: theme.zonaiGreen,
        tabBarInactiveTintColor: theme.darkCyan,
        tabBarButton: (props) => <TabButton {...props} />,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <FontAwesome5 
              name="scroll" 
              size={22} 
              color={color} 
              style={focused ? styles.activeIcon : null} 
            />
          ),
        }}
      />
      <Tabs.Screen
        name="despesas"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <FontAwesome5 
              name="coins" 
              size={22} 
              color={color} 
              style={focused ? styles.activeIcon : null} 
            />
          ),
        }}
      />
      <Tabs.Screen
        name="ranking"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <FontAwesome5 
              name="trophy" 
              size={22} 
              color={color} 
              style={focused ? styles.activeIcon : null} 
            />
          ),
        }}
      />
      {/* NOVA ABA: PERFIL */}
      <Tabs.Screen
        name="perfil"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <FontAwesome5 
              name="user-circle" 
              size={22} 
              color={color} 
              style={focused ? styles.activeIcon : null} 
            />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    ...Platform.select({
      web: { transition: 'all 0.2s ease-in-out' }
    })
  },
  activeIcon: {
    textShadowColor: '#00FFD1',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 15,
  },
  activeIndicator: {
    position: 'absolute',
    top: -1, 
    width: 24,
    height: 3,
    backgroundColor: '#00FFD1',
    borderRadius: 2,
    shadowColor: '#00FFD1',
    shadowRadius: 8,
    shadowOpacity: 0.8,
  }
});