import React from 'react';
import {StyleSheet, Text, View, ImageBackground, Image, FlatList} from 'react-native';
import Colors from "../constants/Colors";
import EventDataCard from "../components/EventDataCard";
import Images from "../constants/Images";
import Users from "../constants/Users";

export default class EventScreen extends React.Component {
    static navigationOptions = {
        title: 'Événement',
        headerStyle: { backgroundColor: Colors.DARK_GREY },
        headerTitleStyle: { color: Colors.WHITE }
    };

    render() {
        const event = this.props.navigation.state.params.event;

        return (
            <View style={styles.main_container}>
                <View style={styles.header_container}>
                    <ImageBackground source={Images.dinner} style={styles.main_image}>
                        <View style={styles.space}/>
                        <Image source={Images.totoro} style={styles.organizer_icon}/>
                        <View style={styles.space}/>
                    </ImageBackground>
                </View>
                <View style={styles.organizer_container}>
                    <Text style={styles.organizer_name}>Organisé par {Users[event.organizer].name}</Text>
                    <Text style={styles.event_name}>{event.name}</Text>
                </View>
                <View style={styles.main_data_container}>
                    <EventDataCard text={event.location} img={Images.robot}/>
                    <View style={styles.divider}/>
                    <EventDataCard text={event.date} img={Images.robot}/>
                    <View style={styles.divider}/>
                    <EventDataCard text={event.price} img={Images.robot}/>
                </View>
                <View style={styles.main_divider}/>
                <View style={styles.description_container}>
                    <Text style={styles.title}>Description</Text>
                    <Text style={styles.description}>{event.description}</Text>
                </View>
                <View style={styles.main_divider}/>
                <View style={styles.participants_container}>
                    <Text style={styles.title}>Participants : {event.participants.length} / {event.maxParticipantsNumber}</Text>
                    <FlatList
                        data={this.findParticipants(event)}
                        keyExtractor={(item) => item.id+""}
                        renderItem={({item}) => <Text>{item.name}</Text>}
                        horizontal={true}/>
                </View>
            </View>
        );
    }

    findParticipants(event) {
        let participants = [];
        for (const participantId of event.participants) {
            participants.push(Users[participantId]);
        }
        return participants;
    }
}

const styles = StyleSheet.create({
    main_container: {
        flex: 1,
        backgroundColor: Colors.GREY,
        flexDirection: "column",
    },
    header_container: {
        flex: 3,
    },
    main_image: {
        width: '100%',
        height: '100%',
        justifyContent: "center",
        alignItems: "center",
    },
    organizer_icon: {
        flex: 4,
        aspectRatio: 1,
        resizeMode: 'contain',
    },
    space: {
        flex: 1
    },
    organizer_container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    organizer_name: {
        color: Colors.CORAL
    },
    event_name: {
        color: Colors.WHITE
    },
    main_data_container: {
        flex: 2,
        flexDirection: "row",
    },
    divider: {
        borderLeftColor: Colors.VERY_LIGHT_GREY,
        borderLeftWidth: 1,
        marginVertical: 15
    },
    main_divider: {
        height: 5,
        backgroundColor: Colors.LIGHT_GREY
    },
    description_container: {
        flex: 2,
        margin: 10,
        justifyContent: "space-around"
    },
    description: {
        fontSize: 11,
        textAlign: "left",
        color: Colors.WHITE
    },
    title: {
        color: Colors.WHITE
    },
    participants_container: {
        flex: 3,
        margin: 10
    }
});