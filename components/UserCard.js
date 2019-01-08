import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import Colors from "../constants/Colors";
import {getImageFromName} from "../constants/Images";
import RatingStars from "./RatingStars";

export default class UserCard extends React.Component {
    render() {
        const user = this.props.user;

        return (
            <View style={styles.main_container}>
                <View style={styles.card}>
                    <View style={styles.image_container}>
                        <Image source={getImageFromName(user.photoId)} style={styles.image}/>
                    </View>
                    <View style={styles.text_container}>
                        <Text style={styles.text}>{user.name}</Text>
                        <RatingStars rating={user.note}/>
                    </View>
                </View>
            </View>
        )
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
        borderColor: Colors.LIGHT_GREY,
        backgroundColor: Colors.DARK_GREY,
        width: 100,
        padding: 5
    },
    image_container: {
        flex: 7,
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        flex: 1,
        aspectRatio: 1,
        resizeMode: 'contain',
    },
    text_container: {
        flex: 4,
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    text: {
        color: Colors.WHITE,
        fontSize: 11,
        margin: 2
    }
});