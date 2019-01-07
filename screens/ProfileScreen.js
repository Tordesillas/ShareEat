import React from 'react';
import { Text, View } from 'react-native';

export default class ProfileScreen extends React.Component {
    static navigationOptions = {
        title: 'Profile',
    };

    render() {
        return (
            <View>
                <Text>Profile</Text>
            </View>
        );
    }
}
