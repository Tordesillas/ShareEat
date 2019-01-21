import React from 'react';
import {StyleSheet, Text, View, ImageBackground, Image, FlatList} from 'react-native';
import Colors from "../constants/Colors";
//import EventDataCard from "../components/EventDataCard";
import Images, {getImageFromName} from "../constants/Images";
import RatingStars from "../components/RatingStars";
import Users from "../constants/Users";
import UserCard from "../components/UserCard";
import {addDaysToIsoDate, isoDateToUser, priceToUser} from "../helpers/UnitHelper";

export default class UsersProfileScreen extends React.Component {
    static navigationOptions = {
        title: 'Profile de Gertrude',
        headerStyle: { backgroundColor: Colors.DARK_GREY },
        headerTitleStyle: { color: Colors.WHITE }
    };

    render() {
        const profile = this.props.navigation.state.params.profile;

        return (
            <View style={styles.main_container}>
                <View style={styles.header_container}>
                    <ImageBackground source={Images.cooking} style={styles.main_image}>
                        <View style={styles.space}/>
                        <Image  source={getImageFromName(Users[profile.id].photoId)} style={styles.user_icon}/>
                        <View style={styles.space}/>
                    </ImageBackground>
                    <View style={styles.text_container}>
                        <Text style={styles.event_name}>{profile.age} ans </Text>
                        <View style={styles.divider}/>
                        <View style={styles.rating_stars}>
                            <RatingStars rating={profile.note}/>
                        </View>
                        <View style={styles.rating_stars2}>
                            <Text style={styles.underline}>voir plus</Text>
                        </View>
                    </View>
                </View>

                <View style={styles.main_divider}/>
                <View style={styles.description_container}>
                    <Text style={styles.title}>Biographie</Text>
                    <Text style={styles.description}>{profile.biography}</Text>
                </View>
                <View style={styles.main_divider}/>


                <View style={styles.metPeople_container}>
                    <Text style={styles.title}>Personnes rencontrées : {profile.metPeople.length}</Text>
                    <FlatList
                        data={this.findmetPeople(profile)}
                        keyExtractor={(item) => item.id+""}
                        renderItem={({item}) => <UserCard user={item}/>}
                        horizontal={true}/>
                </View>
            </View>
        );
    }

    findmetPeople(profile) {
        let metPeople = [];
        for (const metPeopleTab of profile.metPeople) {
            metPeople.push(Users[metPeopleTab[0]]);
        }
        return metPeople;
    }
}

const styles = StyleSheet.create({
    event_name: {
        left:5,
        color: Colors.WHITE,
        fontSize: 25
    },
    membre:{
        color: Colors.WHITE,
        fontSize: 10
    },
    bold: {fontWeight: 'bold'},
    italic: {fontStyle: 'italic'},
    underline: {textDecorationLine: 'underline'},
    main_container: {
        flex: 1,
        backgroundColor: Colors.GREY,
        flexDirection: "column",
    },
    rating_stars:{
        left:20,
        flexDirection: 'row',
    }, rating_stars2:{
        left : 35,
        flexDirection: 'row',
    },
    header_container: {
        flex: 5,
    },
    main_image: {
        width: '100%',
        height: '72%',
        justifyContent: "center",
        alignItems: "center",
    },
    text_container: {
        flexDirection: 'row',
        justifyContent: "center",
        alignItems: "center",
        bottom: 50,
        left : 75,
        width : '50%',
        height: '50%',
    },
    user_icon: {
        position: 'absolute',
        left: 15,
        bottom: 45,
        width : 90,
        height: 90,
        aspectRatio: 1,
    },
    space: {
        flex: 1
    },
    user_container: {
        flex: 2,
        justifyContent: "center",
        alignItems: "center"
    },
    user_name: {
        color: Colors.CORAL,
        fontSize: 11
    },
    profile_name: {
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
    metPeople_container: {
        flex: 5,
        marginHorizontal: 10,
        marginVertical: 5,
        borderRadius: 50
    }
});