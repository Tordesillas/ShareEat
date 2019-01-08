import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Colors from "../constants/Colors";

export default class EventScreen extends React.Component {
    static navigationOptions = {
        title: 'Event',
        headerStyle: { backgroundColor: Colors.DARK_GREY },
        headerTitleStyle: { color: Colors.WHITE }
    };

    render() {
        return (
            <View style={styles.main_container}>
                <Text>Event</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    main_container: {
        flex: 1,
        backgroundColor: Colors.GREY,
    }
});