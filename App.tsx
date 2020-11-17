import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
// import * as Sentry from '@sentry/react-native';

// from app
import { Provider } from './src/redux/Store';
import TabBarNavigator from './src/navigators/TabBarNavigator';

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
          <Stack.Screen name="TabBar" component={TabBarNavigator} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
