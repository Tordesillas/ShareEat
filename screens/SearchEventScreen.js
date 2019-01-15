import React from 'react';
import {StyleSheet, View} from 'react-native';
import Colors from "../constants/Colors";
import EventList from "../components/EventList";
import Events from "../constants/Events";

export default class SearchEventScreen extends React.Component {
    static navigationOptions = {
        title: 'SearchEvent',
        headerStyle: { backgroundColor: Colors.DARK_GREY },
        headerTitleStyle: { color: Colors.WHITE }
    };

    render() {
        return (
            <View style={styles.main_container}>
                <EventList events={Events} screen={"events"} navigation={this.props.navigation}/>
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