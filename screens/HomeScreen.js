import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import EventList from "../components/EventList";
import MainTitle from "../components/MainTitle";
import Events from "../constants/Events";

export default class HomeScreen extends React.Component {
    static navigationOptions = {
        title: 'Home',
    };

    render() {
        return (
            <View style={styles.container}>
                <Text>Home</Text>


                <MainTitle title={"Evenements à venir"} />
                <EventList events={Events}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        margin: 15
    }
});
