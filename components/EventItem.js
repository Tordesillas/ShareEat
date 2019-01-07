import React from 'react';
import { View, Text } from 'react-native';

export default class ErrorItem extends React.Component {
    render() {
        return (
            <View style={styles.main_container}>
                <Text>Event Item</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    main_container: {

    }
});