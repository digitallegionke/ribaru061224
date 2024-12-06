import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/types';
import { Ionicons } from '@expo/vector-icons';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

function HomeScreen({ navigation }: Props) {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Dashboard</Text>
      </View>
      
      <View style={styles.grid}>
        <TouchableOpacity 
          style={styles.card}
          onPress={() => navigation.navigate('UserManagement')}
        >
          <Ionicons name="people" size={24} color="#1D4ED8" />
          <Text style={styles.cardTitle}>Users</Text>
          <Text style={styles.cardSubtitle}>Manage users</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.card}
          onPress={() => navigation.navigate('Stock')}
        >
          <Ionicons name="cube" size={24} color="#1D4ED8" />
          <Text style={styles.cardTitle}>Stock</Text>
          <Text style={styles.cardSubtitle}>Inventory management</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.card}
          onPress={() => navigation.navigate('Sales')}
        >
          <Ionicons name="cart" size={24} color="#1D4ED8" />
          <Text style={styles.cardTitle}>Sales</Text>
          <Text style={styles.cardSubtitle}>View sales</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.card}
          onPress={() => navigation.navigate('Settings')}
        >
          <Ionicons name="settings" size={24} color="#1D4ED8" />
          <Text style={styles.cardTitle}>Settings</Text>
          <Text style={styles.cardSubtitle}>App settings</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },
  header: {
    padding: 20,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
  },
  grid: {
    padding: 16,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  card: {
    width: '47%',
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111827',
    marginTop: 8,
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 4,
  },
});

export default HomeScreen;
