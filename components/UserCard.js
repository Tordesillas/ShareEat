import React from 'react';
import { View, Text } from 'react-native';

export default class UserCard extends React.Component {
    render() {
        return (
            <View style={styles.main_container}>
                <Text>User card</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    main_container: {

    }
});