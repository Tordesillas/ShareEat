import React from 'react';
import {StyleSheet, Text, View, ImageBackground, Image, FlatList, TouchableOpacity} from 'react-native';
import Colors from "../constants/Colors";
import EventDataCard from "../components/EventDataCard";
import Images, {getImageFromName} from "../constants/Images";
import Users from "../constants/Users";
import UserCard from "../components/UserCard";
import {addDaysToIsoDate, isoDateToUser, priceToUser} from "../helpers/UnitHelper";

export default class EventScreen extends React.Component {
    static navigationOptions = {
        title: 'Un dîner presque parfait',
        headerStyle: { backgroundColor: Colors.DARK_GREY },
        headerTitleStyle: { color: Colors.WHITE }
    };

    constructor(props) {
        super(props);

        this.state = {
            event: this.props.navigation.state.params.event
        }
    }

    render() {
        return (
            <View style={styles.main_container}>
                <View style={styles.header_container}>
                    <ImageBackground source={Images.dinner} style={styles.main_image}>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate("Profile",
                            {profile: Users[this.state.event.organizer]})}>
                            <View style={styles.space}/>
                            <Image source={getImageFromName(Users[this.state.event.organizer].photoId)} style={styles.organizer_icon}/>
                            <View style={styles.space}/>
                        </TouchableOpacity>
                    </ImageBackground>
                </View>
                <View style={styles.organizer_container}>
                    <Text style={styles.organizer_name}>Organisé par {Users[this.state.event.organizer].name}</Text>
                    <Text style={styles.event_name}>{this.state.event.name}</Text>
                </View>
                <View style={styles.main_data_container}>
                    <EventDataCard text={this.state.event.location} img={Images.location}/>
                    <View style={styles.divider}/>
                    <EventDataCard text={isoDateToUser(this.state.event.date)} img={Images.date}/>
                    <View style={styles.divider}/>
                    <EventDataCard text={priceToUser(this.state.event.price)} img={Images.price}/>
                </View>
                <View style={styles.main_divider}/>
                <View style={styles.description_container}>
                    <Text style={styles.title}>Description</Text>
                    <Text style={styles.description}>{this.state.event.description}</Text>
                </View>
                <View style={styles.main_divider}/>
                <View style={styles.participants_container}>
                    <Text style={styles.title}>Participants : {this.numberOfParticipants()} / {this.state.event.maxParticipantsNumber}</Text>
                    <FlatList
                        data={this.findParticipants(this.state.event)}
                        keyExtractor={(item) => item.id+""}
                        renderItem={({item}) =>
                            <UserCard user={item}
                                      date={addDaysToIsoDate(this.state.event.date, item.id)}
                                      navigation={this.props.navigation}
                                      callback={this.enrollMe.bind(this)}/>}
                        horizontal={true}/>
                </View>
            </View>
        );
    }

    findParticipants(event) {
        let participants = [];
        for (const participantId of this.state.event.participants) {
            participants.push(Users[participantId]);
        }
        for (let i = event.participants.length; i < event.maxParticipantsNumber; i++) {
            if (i+1 === event.enrolled) {
                participants.push({id: i+1, name: "Moi", photoId: "people3"})
            } else {
                participants.push({id: i+1});
            }
        }
        return participants;
    }

    enrollMe(id) {
        let newEvent = this.state.event;
        newEvent.enrolled = id;
        this.setState({event: newEvent});
    }

    numberOfParticipants() {
        return (this.state.event.enrolled === -1) ? this.state.event.participants.length : this.state.event.participants.length+1;
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