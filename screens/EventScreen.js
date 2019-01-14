import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Colors from "../constants/Colors";
import Events from "../constants/Events";
import EventList from "../components/EventList";

export default class EventScreen extends React.Component {
    static navigationOptions = {
        title: 'Mes évènements',
        headerStyle: { backgroundColor: Colors.DARK_MEDIUM_BLUE },
        headerTitleStyle: { color: Colors.WHITE }
    };

    render() {
        return (
            <View style={styles.main_container}>
                <EventList events={Events} screen={"events"}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    main_container: {
        flex: 1,
        backgroundColor: Colors.DARK_BLUE,
        justifyContent: 'center',
        alignItems: "stretch",
        flexDirection: 'column',
        padding: 15
    }
});