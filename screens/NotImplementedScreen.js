import React from 'react';
import { Text, View } from 'react-native';

export default class NotImplementedScreen extends React.Component {
    static navigationOptions = {
        title: 'ShareEat',
    };

    render() {
        return (
            <View>
                <Text>Non implémenté</Text>
            </View>
        );
    }
}
