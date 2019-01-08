import React from 'react'
import { StyleSheet, View, Text, Image } from 'react-native'
import Colors from "../constants/Colors";

export default class EventDataCard extends React.Component {
    render() {
        return (
            <View style={styles.main_container}>
                <View style={styles.image_container}>
                    <Image style={styles.image} source={this.props.img}/>
                </View>
                <View style={styles.text_container}>
                    <Text style={styles.text}>{this.props.text}</Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    main_container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 5
    },
    text: {
        fontSize: 11,
        textAlign: 'center',
        color: Colors.WHITE
    },
    image: {
        flex: 1,
        aspectRatio: 1,
        resizeMode: 'contain'
    },
    text_container: {
        flex: 3,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    image_container: {
        flex: 2,
        paddingTop: 5
    }
});
