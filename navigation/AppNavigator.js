import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator, createAppContainer } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import SearchEventScreen from "../screens/SearchEventScreen";
import EventScreen from "../screens/EventScreen";
import Colors from "../constants/Colors";
import NotImplementedScreen from "../screens/NotImplementedScreen";
import ProfileScreen from "../screens/ProfileScreen";
import EventTabView from "../screens/EventTabView";

const HomeStack = createStackNavigator({
    Home: HomeScreen,
    Event: EventScreen,
    SearchEvent: SearchEventScreen,
    NotImplemented: NotImplementedScreen,
    Profile: ProfileScreen,
    EventTabView : EventTabView
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

const MyEventsStack = createStackNavigator({
    NotImplemented: NotImplementedScreen
});
MyEventsStack.navigationOptions = {
    tabBarLabel: 'Mes repas',
    tabBarIcon: ({ focused }) => (
        <TabBarIcon
            focused={focused}
            name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'}
        />
    ),
};

const ProfileStack = createStackNavigator({
    NotImplemented: NotImplementedScreen,
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

const MessagingStack = createStackNavigator({
    NotImplemented: NotImplementedScreen,
});
MessagingStack.navigationOptions = {
    tabBarLabel: 'Messagerie',
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
    MessagingStack,
    ProfileStack,
    SettingsStack
}, {
    tabBarOptions: {
        activeTintColor: Colors.CORAL,
        labelStyle: {
            fontSize: 12,
        },
        style: {
            backgroundColor: Colors.DARK_MEDIUM_BLUE,
        },
    }
});

const AppContainer = createAppContainer(TabNavigatorStack);

export default AppContainer;