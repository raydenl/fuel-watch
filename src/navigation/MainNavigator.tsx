import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import StationsScreen from '../screens/StationsScreen';
import SettingsScreen from '../screens/SettingsScreen';
//import StationScreen from '../screens/StationScreen';
import { stationsRoute, settingsRoute } from './constants';

// const HomeStack = createStackNavigator({
//   Home: HomeScreen,
// });

// HomeStack.navigationOptions = {
//   tabBarLabel: 'Home',
//   tabBarIcon: (focused: boolean) => (
//     <TabBarIcon
//       focused={focused}
//       name={
//         Platform.OS === 'ios'
//           ? `ios-information-circle${focused ? '' : '-outline'}`
//           : 'md-information-circle'
//       }
//     />
//   ),
// };

// const Station91Stack = createStackNavigator({
//   "Station91Home": StationScreen,
// });

// const StationStack = createMaterialTopTabNavigator({
//   "Station91": Station91Stack,
// },
//   {
//     swipeEnabled: true,
//     tabBarOptions: {
//       style: { display: "none" },
//     },
//   })

// StationStack.navigationOptions = ({ navigation }: NavigationScreenProps) => ({
//   title: "Station",
//   headerLeft: (
//     <HeaderBackButton title="Stations" onPress={() => navigation.replace(stationsRoute)}></HeaderBackButton>
//   )
// })

const StationsStack = createStackNavigator({
  [stationsRoute]: StationsScreen,
  //[stationRoute]: StationStack
});

StationsStack.navigationOptions = {
  tabBarLabel: 'Stations',
  tabBarIcon: (focused: boolean) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? `ios-link${focused ? '' : '-outline'}` : 'md-link'}
    />
  ),
};



const SettingsStack = createStackNavigator({
  [settingsRoute]: SettingsScreen,
});

SettingsStack.navigationOptions = {
  tabBarLabel: 'Settings',
  tabBarIcon: (focused: boolean) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? `ios-options${focused ? '' : '-outline'}` : 'md-options'}
    />
  ),
};

export default createBottomTabNavigator({
  StationsStack,
  SettingsStack,
});


