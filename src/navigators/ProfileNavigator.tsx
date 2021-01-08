import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

// from app
import { ProfileScreen } from '../screens/ProfileScreens/ProfileScreen';

const ProfileStack = createStackNavigator();

/** Profile Tab Screens */
const ProfileNavigator: React.FC = () => (
  <ProfileStack.Navigator screenOptions={{headerShown: false}} headerMode="none">
    <ProfileStack.Screen name="ProfileTab" component={ProfileScreen} />
  </ProfileStack.Navigator>
);

export default ProfileNavigator;
