import React from 'react';
import { View, Text } from 'react-native';

export default class UserList extends React.Component {
    render() {
        return (
            <View style={styles.main_container}>
                <Text>User list</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    main_container: {

    }
});