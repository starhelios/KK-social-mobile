import React from 'react';
import { View, StyleSheet } from 'react-native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

import { SvgXml } from 'react-native-svg';

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


const TabStack = createMaterialBottomTabNavigator();

const TabBarNavigator: React.FC = () => (
  <TabStack.Navigator initialRouteName='' activeColor={COLOR.whiteColor} barStyle={{ backgroundColor: COLOR.whiteColor }} >
    <TabStack.Screen
      name="HomeTab"
      component={HomeNavigator}
      options={{
        tabBarLabel: '',
        tabBarIcon: ({ focused, color }) => <BottomTabBarView isFocused={focused} tabIndex={0} />
      }}
    />
    <TabStack.Screen
      name="BookingTab"
      component={BookingNavigator}
      options={{
        tabBarLabel: '',
        tabBarIcon: ({ focused, color }) => <BottomTabBarView isFocused={focused} tabIndex={1} />
      }}
    />
    <TabStack.Screen
      name="ProfileTab"
      component={ProfileNavigator}
      options={{
        tabBarLabel: '',
        tabBarIcon: ({ focused, color }) => <BottomTabBarView isFocused={focused} tabIndex={2} />
      }}
    />
  </TabStack.Navigator>
);



interface props {
  isFocused: boolean;
  tabIndex: number;
}

export const BottomTabBarView: React.FC<props> = (props: props) => {

  const isFocused = props.isFocused;
  const tabIndex = props.tabIndex;
  
  return (
    <View style={styles.navigation_bar}>
      <View accessibilityRole="button" style={styles.navigation_bar_item}>
        { isFocused == true 
        ? <View style={styles.navigation_bar_item}>
          <View style={styles.navigation_bar_select_line} />
          <View style={styles.navigation_bar_icon} >
            { tabIndex == 0
              ? <SvgXml width='100%' height='100%' xml={Icon_Tab_Bar_Home_Select} />
              : ( tabIndex == 1
                  ? <SvgXml width='100%' height='100%' xml={Icon_Tab_Bar_Booking_Select} />
                  : <SvgXml width='100%' height='100%' xml={Icon_Tab_Bar_Profile_Select} />
                )
            }
          </View>
        </View>
        : <View style={styles.navigation_bar_icon} >
          { tabIndex == 0
            ? <SvgXml width='100%' height='100%' xml={Icon_Tab_Bar_Home_Normal} />
            : ( tabIndex == 1
                ? <SvgXml width='100%' height='100%' xml={Icon_Tab_Bar_Booking_Normal} />
                : <SvgXml width='100%' height='100%' xml={Icon_Tab_Bar_Profile_Normal} />
              )
          }
          </View>
        }
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  navigation_bar: {
    bottom: 0, 
    width: '100%', 
    height: 60,
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
    top: -10, 
    width: 32, 
    height: 4, 
    backgroundColor: COLOR.redColor,
  },
  navigation_bar_icon: {
    position: 'absolute', 
    top: 5, 
    width: 32, 
    height: 24, 
    justifyContent: 'space-evenly',
  },
});

export default TabBarNavigator;
