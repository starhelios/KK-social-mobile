import React from 'react';
import { View, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import * as Sentry from '@sentry/react-native';
import { SvgXml } from 'react-native-svg';
import { Dimensions } from 'react-native';

// from app
import HomeNavigator from './HomeNavigator';
import BookingNavigator from './BookingNavigator';
import ProfileNavigator from './ProfileNavigator';
import { 
  COLOR,
  Icon_Tab_Bar_Booking_Normal, 
  Icon_Tab_Bar_Booking_Select, 
  Icon_Tab_Bar_Home_Normal, 
  Icon_Tab_Bar_Home_Select, 
  Icon_Tab_Bar_Profile_Normal, 
  Icon_Tab_Bar_Profile_Select,
} from '../constants';

// Sentry.init({
//   dsn: 'https://3463daf0c4c047cdbda89c051aaed669@o300282.ingest.sentry.io/5212707',
// });

const { width: viewportWidth } = Dimensions.get('window');

const TabStack = createBottomTabNavigator();

const TabBarNavigator: React.FC = () => (
  <TabStack.Navigator tabBar={props => <MyTabBar {...props} />}>
    <TabStack.Screen
      name="HomeTap"
      options={{index: 0}}
      component={HomeNavigator}
    />
    {/* <TabStack.Screen
      name="BookingTap"
      options={{index: 1}}
      component={BookingNavigator}
    />
    <TabStack.Screen
      name="ProfileTap"
      options={{index: 2}}
      component={ProfileNavigator}
    /> */}
  </TabStack.Navigator>
);

function MyTabBar({state, descriptors, navigation}) {
  return (
    <View style={styles.navigation_bar}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const icon = options.index;
        const label = route.name;
        const isFocused = state.index === index;
        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <View
            accessibilityRole="button"
            accessibilityStates={isFocused ? ['selected'] : []}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            onTouchStart={onPress}
            key={index}
            style={styles.navigation_bar_item}>
            { isFocused == true 
            ? <View style={styles.navigation_bar_item}>
              <View style={styles.navigation_bar_select_line} />
              <View style={styles.navigation_bar_icon} >
                {
                  icon == 0
                  ? <SvgXml width='100%' height='100%' xml={Icon_Tab_Bar_Home_Select} />
                  : (icon == 1
                    ? <SvgXml width='100%' height='100%' xml={Icon_Tab_Bar_Booking_Select} />
                    : <SvgXml width='100%' height='100%' xml={Icon_Tab_Bar_Profile_Select} />
                  )
                }
              </View>
            </View>
            : <View style={styles.navigation_bar_icon} >
              {
                icon == 0
                  ? <SvgXml width='100%' height='100%' xml={Icon_Tab_Bar_Home_Normal} />
                  : (icon == 1
                    ? <SvgXml width='100%' height='100%' xml={Icon_Tab_Bar_Booking_Normal} />
                    : <SvgXml width='100%' height='100%' xml={Icon_Tab_Bar_Profile_Normal} />
                  )
              }
              </View>
            }
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  navigation_bar: {
    bottom: 0, 
    width: '100%', 
    height: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLOR.clearColor,
  },
  navigation_bar_item: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    height: '100%',
    flex: 1,
    backgroundColor: COLOR.whiteColor,
  },
  navigation_bar_select_line: {
    position: 'absolute', 
    top: 0, 
    width: 32, 
    height: 4, 
    backgroundColor: COLOR.redColor,
  },
  navigation_bar_icon: {
    position: 'absolute', 
    top: 10, 
    width: 32, 
    height: 24, 
    justifyContent: 'space-evenly',
  },
});

export default TabBarNavigator;
