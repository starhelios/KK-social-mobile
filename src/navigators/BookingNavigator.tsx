import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

// from app
import { BookingScreen } from '../screens/BookingScreens/BookingScreen';

const BookingStack = createStackNavigator();

/** Booking Tab Screens */
const BookingNavigator: React.FC = () => (
  <BookingStack.Navigator screenOptions={{headerShown: false}} headerMode="none">
    <BookingStack.Screen name="BookingTab" component={BookingScreen} />
  </BookingStack.Navigator>
);

export default BookingNavigator;
