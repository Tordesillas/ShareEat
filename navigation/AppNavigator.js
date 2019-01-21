import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator, createAppContainer } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import SearchEventScreen from "../screens/SearchEventScreen";
import EventScreen from "../screens/EventScreen";
import UsersProfileScreen from "../screens/UsersProfileScreen";
import Colors from "../constants/Colors";
import NotImplementedScreen from "../screens/NotImplementedScreen";
import ProfileScreen from "../screens/ProfileScreen";

const HomeStack = createStackNavigator({
    Home: HomeScreen,
    Events: SearchEventScreen,
    Event: EventScreen,
    SearchEvent: SearchEventScreen,
    UsersProfile: UsersProfileScreen,
    NotImplemented: NotImplementedScreen
});
HomeStack.navigationOptions = {
    tabBarLabel: 'Accueil',
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

const ProfileStack = createStackNavigator({
    Profile: ProfileScreen
});
ProfileStack.navigationOptions = {
    tabBarLabel: 'Mon compte',
    tabBarIcon: ({ focused }) => (
        <TabBarIcon
            focused={focused}
            name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'}
        />
    ),
};

const MyEventsStack = createStackNavigator({
    NotImplemented: NotImplementedScreen
});
MyEventsStack.navigationOptions = {
    tabBarLabel: 'Mes événements',
    tabBarIcon: ({ focused }) => (
        <TabBarIcon
            focused={focused}
            name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'}
        />
    ),
};

const SettingsStack = createStackNavigator({
    NotImplemented: NotImplementedScreen
});
SettingsStack.navigationOptions = {
    tabBarLabel: 'Paramètres',
    tabBarIcon: ({ focused }) => (
        <TabBarIcon
            focused={focused}
            name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'}
        />
    ),
};

const TabNavigatorStack = createBottomTabNavigator({
    HomeStack,
    MyEventsStack,
    ProfileStack,
    SettingsStack
}, {
    tabBarOptions: {
        activeTintColor: Colors.CORAL,
        labelStyle: {
            fontSize: 12,
        },
        style: {
            backgroundColor: Colors.DARK_GREY,
        },
    }
});

const AppContainer = createAppContainer(TabNavigatorStack);

export default AppContainer;