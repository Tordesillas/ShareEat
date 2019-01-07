import React from 'react';
import { Text, View } from 'react-native';

export default class EventScreen extends React.Component {
    static navigationOptions = {
        title: 'Event',
    };

    render() {
        return (
            <View>
                <Text>Event</Text>
            </View>
        );
    }
}
