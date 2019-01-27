import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Colors from "../constants/Colors";
import MainTitle from "../components/MainTitle";
import { getFontSize } from "../helpers/UnitHelper";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons/faExclamationTriangle";

export default class NotImplementedScreen extends React.Component {
    static navigationOptions = {
        title: 'ShareEat',
        headerStyle: { backgroundColor: Colors.DARK_BLUE },
        headerTitleStyle: { color: Colors.WHITE }
    };

    render() {
        return (
            <View style={styles.main_container}>
                <FontAwesomeIcon icon={faExclamationTriangle} size={100} style={styles.iconPanneau} />
                <MainTitle style={styles.title} title={"Page non implémentée !"}/>
                <Text style={styles.text}>Cette page n'est pas implémentée. Elle le sera dans une prochaine mise à jour.</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    main_container: {
        flex: 1,
        backgroundColor: Colors.DARK_BLUE,
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        padding: 30
    },
    iconPanneau: {
        marginBottom: 20,
        width: 70,
        fontSize: 40,
        color: Colors.CORAL
    },
    title: {
        textAlign: 'center'
    },
    text: {
        color: Colors.LIGHT_BLUE,
        fontSize: 18,
        marginTop: 15
    }
});