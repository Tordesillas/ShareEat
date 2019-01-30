import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Colors from "../constants/Colors";
import {getImageFromName} from "../constants/Images";
import RatingStars from "./RatingStars";

export default class UserMark extends React.Component {
    render() {
        const user = this.props.user;

        return (
            <TouchableOpacity style={styles.main_container} onPress={() => {
                if (user.id === 3)
                    this.props.navigation.navigate("NotImplemented");
                else
                    this.props.navigation.navigate("Profile", {profile: user});
            }}>
                <View style={styles.card}>
                    <View style={styles.header}>
                        <View style={styles.image_container}>
                            <Image source={getImageFromName(user.photoId)} style={styles.image}/>
                        </View>
                        <View style={styles.text_container}>
                            <Text style={styles.text}>{user.name}</Text>
                            <RatingStars rating={this.props.mark}/>
                            <Text style={styles.text}>{this.props.date}</Text>
                            <Text style={styles.text}>{this.getMarkDate()}</Text>
                        </View>
                    </View>
                    <View style={styles.opinion}>
                        <Text style={styles.text}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    getMarkDate() {
        return (this.props.user.id === 3) ? "A l'instant" : "Il y a 2 mois";
    }
}

const styles = StyleSheet.create({
    main_container: {
        flex: 1,
        marginRight: 5
    },
    card: {
        flex: 1,
        flexDirection: "column",
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderRadius: 3,
        borderColor: Colors.LIGHT_BLUE,
        backgroundColor: Colors.DARK_BLUE,
        width: 200,
        padding: 5
    },
    image_container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        flex: 1,
        aspectRatio: 1,
        resizeMode: 'contain',
    },
    text_container: {
        flex: 2,
        alignItems: 'center',
        justifyContent: 'space-around',
        flexDirection: "column",
        paddingHorizontal: 10
    },
    text: {
        color: Colors.WHITE,
        fontSize: 11,
    },
    header: {
        flex: 2,
        flexDirection: "row"
    },
    opinion: {
        flex: 3,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row"
    }
});