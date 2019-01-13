import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Colors from "../constants/Colors";
import EventList from "../components/EventList";

export default class HomeScreen extends React.Component {
    static navigationOptions = {
        title: 'Accueil',
        headerStyle: { backgroundColor: Colors.DARK_GREY },
        headerTitleStyle: { color: Colors.WHITE }
    };

    render() {
        return (
            <View style={styles.main_container}>
                <View style={styles.buttons}>
                    <TouchableOpacity style={styles.button} onPress={() => {this.props.navigation.navigate("SearchEvent")}}>
                        <Text style={styles.buttonText}>Rejoindre un repas communautaire</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={() => {this.props.navigation.navigate("NotImplemented")}}>
                        <Text style={styles.buttonText}>Créer un repas communautaire</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.events}>
                    <Text>Mes événements</Text>
                    <EventList events={null}/>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    main_container: {
        flex: 1,
        backgroundColor: Colors.GREY,
        justifyContent: 'center',
        alignItems: "stretch",
        flexDirection: 'column',
    },
    buttons: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "space-around"
    },
    button: {
        flex: 1,
        backgroundColor: Colors.CORAL,
        margin: 20,
        justifyContent: 'center',
        alignItems: "center",
    },
    buttonText: {
        color: Colors.WHITE
    },
    events: {
        flex: 1
    }
});
