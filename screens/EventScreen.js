import React from 'react';
import {StyleSheet, Text, View, ImageBackground, Image, FlatList, TouchableHighlight} from 'react-native';
import Colors from "../constants/Colors";
import EventDataCard from "../components/EventDataCard";
import Images, {getImageFromName} from "../constants/Images";
import Users from "../constants/Users";
import UserCard from "../components/UserCard";
import {addDaysToIsoDate, isoDateToUser, priceToUser} from "../helpers/UnitHelper";
import Events from "../constants/Events";

export default class EventScreen extends React.Component {
    static navigationOptions = {
        title: 'Un dîner presque parfait',
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
                        <TouchableHighlight
                            onPress={(item) => this.props.navigation.navigate("UsersProfile",
                                {profile: Users[0]})}>
                            <Image source={getImageFromName(Users[event.organizer].photoId)} style={styles.organizer_icon} />
                        </TouchableHighlight>
                        <Image source={getImageFromName(Users[event.organizer].photoId)} style={styles.organizer_icon} />
                        <View style={styles.space}/>
                    </ImageBackground>
                </View>
                <View style={styles.organizer_container}>
                    <Text style={styles.organizer_name}>Organisé par {Users[event.organizer].name}</Text>
                    <Text style={styles.event_name}>{event.name}</Text>
                </View>
                <View style={styles.main_data_container}>
                    <EventDataCard text={event.location} img={Images.location}/>
                    <View style={styles.divider}/>
                    <EventDataCard text={isoDateToUser(event.date)} img={Images.date}/>
                    <View style={styles.divider}/>
                    <EventDataCard text={priceToUser(event.price)} img={Images.price}/>
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
                        renderItem={({item}) => (
                            <TouchableHighlight
                                onPress={(item) => this.props.navigation.navigate("UsersProfile",
                                    {profile: Users[0]})}>
                                <UserCard user={item} date={addDaysToIsoDate(event.date, item.id)} />
                            </TouchableHighlight>
                            )}
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
        for (let i = event.participants.length; i < event.maxParticipantsNumber; i++) {
            participants.push({id: i+1});
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
        flex: 5,
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
        flex: 2,
        justifyContent: "center",
        alignItems: "center"
    },
    organizer_name: {
        color: Colors.CORAL,
        fontSize: 11
    },
    event_name: {
        color: Colors.WHITE,
        fontSize: 16
    },
    main_data_container: {
        flex: 3,
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
        flex: 3,
        marginHorizontal: 10,
        marginVertical: 5,
        justifyContent: "center"
    },
    description: {
        fontSize: 11,
        textAlign: "left",
        color: Colors.WHITE,
        marginBottom: 5
    },
    title: {
        color: Colors.WHITE,
        marginBottom: 5
    },
    participants_container: {
        flex: 5,
        marginHorizontal: 10,
        marginVertical: 5
    }
});