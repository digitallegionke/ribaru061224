import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';

export type RootStackParamList = {
  MainTabs: undefined;
  Home: undefined;
  Sales: undefined;
  Stock: undefined;
  Settings: undefined;
  UserManagement: undefined;
  AddUser: undefined;
  EditUser: { userId: string };
  AddStock: undefined;
};

export type RootStackScreenProps<T extends keyof RootStackParamList> = 
  NativeStackScreenProps<RootStackParamList, T>;

export type TabScreenProps<T extends keyof RootStackParamList> = 
  BottomTabScreenProps<RootStackParamList, T>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
