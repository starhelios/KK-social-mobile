import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
// import * as Sentry from '@sentry/react-native';

// from app
import { Provider } from './src/redux/Store';
import { SplashScreen } from './src/screens/AuthScreens/SplashScreen';
import TabBarNavigator from './src/navigators/TabBarNavigator';
import { LogInScreen } from './src/screens/AuthScreens/LogInScreen';
import { ForgotPasswordScreen } from './src/screens/AuthScreens/ForgotPasswordScreen';
import { SignUpScreen } from './src/screens/AuthScreens/SignUpScreen';
import { SignUpAddProfilePictureScreen } from './src/screens/AuthScreens/SignUpAddProfilePictureScreen';
import { SignUpAddProfilePictureConfirmScreen } from './src/screens/AuthScreens/SignUpAddProfilePictureConfirmScreen';
import { PaymentOptionsScreen } from './src/screens/ProfileScreens/PaymentOptionsScreen';
import { WithdrawalScreen } from './src/screens/ProfileScreens/WithdrawalScreen';
import { ExperiencesScreen } from './src/screens/ProfileScreens/ExperiencesScreen';
import { EditProfileScreen } from './src/screens/ProfileScreens/EditProfileScreen';
import { BecomeAHostScreen } from './src/screens/ProfileScreens/BecomeAHostScreen';
import { HostAnExperienceScreen } from './src/screens/ProfileScreens/HostAnExperienceScreen';
import { ConfirmedBookingsScreen } from './src/screens/ProfileScreens/ConfirmedBookingsScreen';
import { ConfirmedBookingDetailScreen } from './src/screens/DetailScreens/ConfirmedBookingDetailScreen';
import { ExperienceDetailScreen } from './src/screens/DetailScreens/ExperienceDetailScreen';
import { ExperienceDetailHostScreen } from './src/screens/DetailScreens/ExperienceDetailHostScreen';
import { EditExperienceScreen } from './src/screens/DetailScreens/EditExperienceScreen';

// Sentry.init({
//   dsn: 'https://3463daf0c4c047cdbda89c051aaed669@o300282.ingest.sentry.io/5212707',
// });

const Stack = createStackNavigator();

const App = () => {
  return (
    <Provider>
      <NavigationContainer>
        <StatusBar
          translucent
          backgroundColor="transparent"
          barStyle="light-content"
        />
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="Splash" component={SplashScreen} />
          <Stack.Screen name="TabBar" component={TabBarNavigator} />
          <Stack.Screen name="LogIn" component={LogInScreen} />
          <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
          <Stack.Screen name="SignUp" component={SignUpScreen} />
          <Stack.Screen name="SignUpAddProfilePicture" component={SignUpAddProfilePictureScreen} />
          <Stack.Screen name="SignUpAddProfilePictureConfirm" component={SignUpAddProfilePictureConfirmScreen} />
          <Stack.Screen name="PaymentOptions" component={PaymentOptionsScreen} />
          <Stack.Screen name="Withdrawal" component={WithdrawalScreen} />
          <Stack.Screen name="Experiences" component={ExperiencesScreen} />
          <Stack.Screen name="EditProfile" component={EditProfileScreen} />
          <Stack.Screen name="BecomeAHost" component={BecomeAHostScreen} />
          <Stack.Screen name="HostAnExperience" component={HostAnExperienceScreen} />
          <Stack.Screen name="ConfirmedBookings" component={ConfirmedBookingsScreen} />
          <Stack.Screen name="ConfirmedBookingDetail" component={ConfirmedBookingDetailScreen} />
          <Stack.Screen name="ExperienceDetail" component={ExperienceDetailScreen} />
          <Stack.Screen name="ExperienceDetailHost" component={ExperienceDetailHostScreen} />
          <Stack.Screen name="EditExperience" component={EditExperienceScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
