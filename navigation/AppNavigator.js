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
import { faHome } from "@fortawesome/free-solid-svg-icons/faHome";
import { faUserAlt } from "@fortawesome/free-solid-svg-icons/faUserAlt";
import { faComments } from "@fortawesome/free-solid-svg-icons/faComments";
import { faUtensils } from "@fortawesome/free-solid-svg-icons/faUtensils";

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
            icon={faHome}
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
            icon={faUtensils}
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
            icon={faUserAlt}
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
            icon={faComments}
        />
    ),
};

const TabNavigatorStack = createBottomTabNavigator({
    HomeStack,
    MyEventsStack,
    MessagingStack,
    ProfileStack,
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