import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Colors from "../constants/Colors";

export default class NotImplementedScreen extends React.Component {
    static navigationOptions = {
        title: 'ShareEat',
        headerStyle: { backgroundColor: Colors.DARK_GREY },
        headerTitleStyle: { color: Colors.WHITE }
    };

    render() {
        return (
            <View style={styles.main_container}>
                <Text>Non implémenté</Text>
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