import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeUserId = async (userId) => await AsyncStorage.setItem('@userId', userId);

export const getUserId = async () => await AsyncStorage.getItem('@userId');

export const signOut = async () => await AsyncStorage.removeItem('@userId');
