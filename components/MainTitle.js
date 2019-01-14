import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Colors from '../constants/Colors';

export default class MainTitle extends React.Component {
    render() {
        return (
            <Text h1 style={styles.container}>{this.props.title}</Text>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        color: Colors.CORAL,
        fontSize: 20,
        marginTop: 15,
        fontWeight: "bold"
    }
});
