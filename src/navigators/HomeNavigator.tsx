import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

// from app
import { HomeScreen } from '../screens/HomeScreens/HomeScreen';

const HomeStack = createStackNavigator();

/** Home Tab Screens */
const HomeNavigator: React.FC = () => (
  <HomeStack.Navigator screenOptions={{headerShown: false}} headerMode="none">
    <HomeStack.Screen name="HomeTab" component={HomeScreen} />
  </HomeStack.Navigator>
);

export default HomeNavigator;
