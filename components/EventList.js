import React from 'react';
import { StyleSheet, View, Text, FlatList } from 'react-native';

export default class EventList extends React.Component {
    render() {
        return (
            <View style={styles.main_container}>
                <FlatList
                    data={this.props.events}
                    renderItem={({item}) => <Text style={styles.flatListRow}>{item.name}</Text>}
                    keyExtractor={(item) => item.id.toString()}
                    style={styles.flatList}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    main_container: {

    },
    flatList: {
    },
    flatListRow: {
        paddingTop: 5,
        paddingBottom: 5,
    }
});