import React from 'react';
import {StyleSheet, Text, View, ImageBackground, Image, FlatList} from 'react-native';
import Colors from "../constants/Colors";
import Images, {getImageFromName} from "../constants/Images";
import RatingStars from "../components/RatingStars";
import Users from "../constants/Users";
import UserCard from "../components/UserCard";

export default class ProfileScreen extends React.Component {
    static navigationOptions = {
        title: 'Profil de Gertrude',
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
                        <Image source={getImageFromName(Users[profile.id].photoId)} style={styles.user_icon}/>
                        <View style={styles.space}/>
                    </ImageBackground>
                </View>

                <View style={styles.biography_container}>
                    <View style={{flex: 1}}>
                        <Image source={Images.left_quote} style={styles.quote}/>
                    </View>
                    <View style={{alignItems: "center", justifyContent: "center", flex: 8, flexDirection: "row"}}>
                        <Text style={styles.biography}>{profile.biography}</Text>
                    </View>
                    <View style={{flex: 1, flexDirection: "column", justifyContent: 'flex-end'}}>
                        <Image source={Images.right_quote} style={styles.quote}/>
                    </View>
                </View>

                <View style={styles.main_divider}/>
                <View style={styles.rating_stars}>
                    <RatingStars rating={profile.note}/>
                </View>
                <View style={styles.main_divider}/>

                <View style={styles.comments_container}>
                    <Text style={styles.title}>Avis</Text>
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
    main_container: {
        flex: 1,
        backgroundColor: Colors.GREY,
        flexDirection: "column",
    },
    header_container: {
        flex: 2,
    },
    main_image: {
        height: '100%',
        paddingLeft: 10
    },
    user_icon: {
        flex: 5,
        aspectRatio: 1,
        resizeMode: 'contain',
    },
    space: {
        flex: 1
    },
    biography_container: {
        flex: 2,
        flexDirection: "row",
        margin: 5
    },
    biography: {
        flex: 8,
        fontSize: 11,
        color: Colors.WHITE
    },
    quote: {
        width: 30,
        height: 30,
        padding: 10
    },
    main_divider: {
        height: 5,
        backgroundColor: Colors.LIGHT_GREY
    },
    rating_stars: {
        flex: 1
    },
    comments_container: {
        flex: 4,
        justifyContent: "center",
        alignItems: "center"
    },
    title: {
        color: Colors.WHITE,
        marginBottom: 5
    }
});