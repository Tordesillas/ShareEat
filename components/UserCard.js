import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import Colors from "../constants/Colors";
import {getImageFromName} from "../constants/Images";
import RatingStars from "./RatingStars";
import Images from "../constants/Images";

export default class UserCard extends React.Component {
    render() {
        const user = this.props.user;
        if (!user.name) {
            return this.renderSignUpCard();
        }
        if (user.name === "Moi") {
            return this.renderMeCard(user)
        }

        return (
            <TouchableOpacity style={styles.main_container} onPress={() => this.props.navigation.navigate("Profile",
                {profile: user})}>
                <View style={styles.card}>
                    <View style={styles.image_container}>
                        <Image source={getImageFromName(user.photoId)} style={styles.image}/>
                    </View>
                    <View style={styles.text_container}>
                        <Text style={styles.text}>{user.name}</Text>
                        <RatingStars rating={user.note}/>
                        <Text style={styles.text}>{this.props.date}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    renderSignUpCard() {
         return (
             <TouchableOpacity style={styles.main_container} onPress={() => {this.launchPopUp()}}>
                 <View style={styles.card}>
                     <View style={styles.image_container}>
                         <Image source={Images.plus_circled} style={styles.image}/>
                     </View>
                     <View style={styles.text_container}>
                         <Text style={styles.text}>M'inscrire</Text>
                         <Text style={styles.text}>{this.props.date}</Text>
                     </View>
                 </View>
             </TouchableOpacity>
         );
    }

    renderMeCard(user) {
        return (
            <View style={styles.main_container}>
                <View style={styles.card}>
                    <View style={styles.image_container}>
                        <Image source={getImageFromName(user.photoId)} style={styles.image}/>
                    </View>
                    <View style={styles.text_container}>
                        <Text style={styles.text}>{user.name}</Text>
                        <RatingStars rating={4}/>
                        <Text style={styles.text}>{this.props.date}</Text>
                    </View>
                </View>
            </View>
        );
    }

    launchPopUp() {
        Alert.alert('Inscription', 'Voulez-vous intégrer l\'événement à cette date ?',
            [
                {text: 'Annuler', onPress: () => {}, style: 'cancel'},
                {text: 'OK', onPress: () => {this.props.callback(this.props.user.id)}},
            ],
        );
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
        flex: 6,
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    text: {
        color: Colors.WHITE,
        fontSize: 11,
    }
});