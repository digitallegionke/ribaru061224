import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/types';
import { Ionicons } from '@expo/vector-icons';

type Props = NativeStackScreenProps<RootStackParamList, 'Settings'>;

function SettingsScreen({ navigation }: Props) {
  const settingsOptions = [
    { title: 'Account', icon: 'person', action: () => {} },
    { title: 'Notifications', icon: 'notifications', action: () => {} },
    { title: 'Privacy', icon: 'lock-closed', action: () => {} },
    { title: 'Help & Support', icon: 'help-circle', action: () => {} },
    { title: 'About', icon: 'information-circle', action: () => {} },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Settings</Text>
      </View>
      
      <View style={styles.content}>
        {settingsOptions.map((option, index) => (
          <TouchableOpacity 
            key={index}
            style={styles.optionItem}
            onPress={option.action}
          >
            <View style={styles.optionLeft}>
              <Ionicons name={option.icon} size={24} color="#1D4ED8" />
              <Text style={styles.optionText}>{option.title}</Text>
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
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
  },
  content: {
    padding: 16,
  },
  optionItem: {
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
  optionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  optionText: {
    fontSize: 16,
    color: '#111827',
  },
});

export default SettingsScreen;
