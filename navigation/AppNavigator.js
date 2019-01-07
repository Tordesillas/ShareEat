import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator, createAppContainer } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import LinksScreen from '../screens/LinksScreen';
import SearchEventScreen from "../screens/SearchEventScreen";
import EventScreen from "../screens/EventScreen";

const HomeStack = createStackNavigator({
  Home: HomeScreen
});

HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused }) => (
      <TabBarIcon
          focused={focused}
          name={
            Platform.OS === 'ios'
                ? `ios-information-circle${focused ? '' : '-outline'}`
                : 'md-information-circle'
          }
      />
  ),
};

const LinksStack = createStackNavigator({
  Links: LinksScreen,
});

LinksStack.navigationOptions = {
  tabBarLabel: 'Links',
  tabBarIcon: ({ focused }) => (
      <TabBarIcon
          focused={focused}
          name={Platform.OS === 'ios' ? 'ios-link' : 'md-link'}
      />
  ),
};

const EventStack = createStackNavigator({
  Events: SearchEventScreen,
  Event: EventScreen
});

EventStack.navigationOptions = {
  tabBarLabel: 'Event',
  tabBarIcon: ({ focused }) => (
      <TabBarIcon
          focused={focused}
          name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'}
      />
  ),
};

const MainStack = createBottomTabNavigator({
  HomeStack,
  LinksStack,
  EventStack,
});

const AppContainer = createAppContainer(MainStack);

export default AppContainer;