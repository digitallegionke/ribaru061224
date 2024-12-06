import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/types';
import { Ionicons } from '@expo/vector-icons';

type Props = NativeStackScreenProps<RootStackParamList, 'UserManagement'>;

function UserManagementScreen({ navigation }: Props) {
  const dummyUsers = [
    { id: '1', name: 'John Doe', role: 'Admin' },
    { id: '2', name: 'Jane Smith', role: 'Manager' },
    { id: '3', name: 'Bob Johnson', role: 'Staff' },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>User Management</Text>
        <TouchableOpacity 
          style={styles.addButton}
          onPress={() => navigation.navigate('AddUser')}
        >
          <Ionicons name="add" size={24} color="white" />
          <Text style={styles.addButtonText}>Add User</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.content}>
        {dummyUsers.map(user => (
          <TouchableOpacity 
            key={user.id}
            style={styles.userCard}
            onPress={() => navigation.navigate('EditUser', { userId: user.id })}
          >
            <View style={styles.userInfo}>
              <Ionicons name="person-circle" size={40} color="#1D4ED8" />
              <View>
                <Text style={styles.userName}>{user.name}</Text>
                <Text style={styles.userRole}>{user.role}</Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={24} color="#6B7280" />
          </TouchableOpacity>
        ))}
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
  },
  addButton: {
    backgroundColor: '#1D4ED8',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    borderRadius: 8,
    gap: 4,
  },
  addButtonText: {
    color: 'white',
    fontWeight: '500',
  },
  content: {
    padding: 16,
  },
  userCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    padding: 16,
    marginBottom: 8,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  userName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#111827',
  },
  userRole: {
    fontSize: 14,
    color: '#6B7280',
  },
});

export default UserManagementScreen;
