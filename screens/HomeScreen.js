import React from "react";
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ScrollView
} from "react-native";
import Colors from "../constants/Colors";
import EventList from "../components/EventList";
import MainTitle from "../components/MainTitle";
import Events from "../constants/Events";
import { faPlus } from "@fortawesome/free-solid-svg-icons/faPlus";
import { faSearch } from "@fortawesome/free-solid-svg-icons/faSearch";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome/index";

export default class HomeScreen extends React.Component {
    static navigationOptions = {
        title: "ShareEat",
        headerStyle: { backgroundColor: Colors.DARK_MEDIUM_BLUE },
        headerTitleStyle: { color: Colors.WHITE }
    };

    render() {
        return (
            <View style={styles.main_container}>
                <ScrollView style={styles.container}>
                    <MainTitle title={"Créer ou rejoindre un repas"} />
                    <View style={styles.dinnerContainer}>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => {
                                this.props.navigation.navigate("NotImplemented");
                            }}
                        >
                            <FontAwesomeIcon icon={faPlus} style={styles.icon} size={30} />
                            <Text style={styles.buttonText}>Créer</Text>
                        </TouchableOpacity>
                        <View style={{flex: 1}}/>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => {
                                this.props.navigation.navigate("SearchEvent");
                            }}
                        >
                            <FontAwesomeIcon icon={faSearch} style={styles.icon} size={30} />
                            <Text style={styles.buttonText}>Rejoindre</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.events}>
                        <MainTitle title={"Événements à venir"} />
                        <EventList
                            events={Events}
                            screen={"home"}
                            navigation={this.props.navigation}
                        />
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
        justifyContent: "center",
        alignItems: "stretch",
        flexDirection: "column"
    },
    container: {
        padding: 15
    },
    dinnerContainer: {
        flexDirection: "row",
        justifyContent: "center",
        marginBottom: 15
    },
    button: {
        flex: 6,
        backgroundColor: Colors.DARK_MEDIUM_BLUE,
        marginTop: 15,
        justifyContent: "center",
        alignItems: "center",
        paddingTop: 20,
        paddingBottom: 20,
        borderRadius: 5
    },
    buttonText: {
        color: Colors.WHITE,
        textTransform: "uppercase",
        fontWeight: "bold",
        fontSize: 16
    },
    icon: {
        color: Colors.CORAL,
        marginBottom: 15
    },
    events: {
        flex: 1
    }
});
