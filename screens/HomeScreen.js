import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import Colors from "../constants/Colors";
import EventList from "../components/EventList";
import MainTitle from "../components/MainTitle";
import Events from "../constants/Events";

export default class HomeScreen extends React.Component {
    static navigationOptions = {
        title: 'ShareEat',
        headerStyle: { backgroundColor: Colors.DARK_MEDIUM_BLUE },
        headerTitleStyle: { color: Colors.WHITE }
    };

    render() {
        return (
            <View style={styles.main_container}>
                <ScrollView style={styles.container}>
                    <View style={styles.dinnerContainer}>
                        <TouchableOpacity style={styles.button} onPress={() => {this.props.navigation.navigate("NotImplemented")}}>
                            <Text style={styles.buttonText}>Créer un repas</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button} onPress={() => {this.props.navigation.navigate("SearchEvent")}}>
                            <Text style={styles.buttonText}>Rejoindre un repas</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.events}>
                        <MainTitle title={"Événements à venir"} />
                        <EventList events={Events} screen={"home"} navigation={this.props.navigation}/>
                    </View>
                </ScrollView>
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
    },
    container: {
        padding: 15
    },
    dinnerContainer: {
        flexDirection: "column",
        justifyContent: "flex-start",
        marginBottom: 15
    },
    button: {
        backgroundColor: Colors.CORAL,
        marginTop: 15,
        marginLeft: 30,
        marginRight: 30,
        justifyContent: "center",
        alignItems: "center",
        paddingTop: 25,
        paddingBottom: 25,
        borderRadius: 5,
        fontSize: 15,
    },
    buttonText: {
        color: Colors.WHITE,
        textTransform: "uppercase",
        fontWeight: "bold",
    },
    events: {
        flex: 1
    }
});
