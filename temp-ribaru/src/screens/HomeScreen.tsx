import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function HomeScreen({ navigation }) {
  const menuItems = [
    { icon: 'people', label: 'Users', screen: 'UserManagement' },
    { icon: 'cube', label: 'Stock', screen: 'Stock' },
    { icon: 'cart', label: 'Sales', screen: 'Sales' },
    { icon: 'settings', label: 'Settings', screen: 'Settings' }
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ribaru</Text>
      <Text style={styles.subtitle}>Welcome back!</Text>
      
      <View style={styles.grid}>
        {menuItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.card}
            onPress={() => navigation.navigate(item.screen)}
          >
            <Ionicons name={item.icon} size={24} color="#0a1fda" />
            <Text style={styles.cardText}>{item.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff'
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#0a1fda',
    marginTop: 20
  },
  subtitle: {
    fontSize: 18,
    color: '#666',
    marginBottom: 30
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between'
  },
  card: {
    width: '48%',
    backgroundColor: '#f5f5ff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4
  },
  cardText: {
    marginTop: 10,
    fontSize: 16,
    color: '#333',
    fontWeight: '500'
  }
});