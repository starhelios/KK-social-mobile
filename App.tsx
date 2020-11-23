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
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
