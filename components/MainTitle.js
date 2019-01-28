import React from 'react';
import { StyleSheet, Text } from 'react-native';

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
        fontSize: 22,
        marginTop: 15,
        fontWeight: "bold"
    }
});
