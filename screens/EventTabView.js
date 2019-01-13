import React from 'react';
import {View, StyleSheet, Dimensions, Text } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import Colors from "../constants/Colors";
import TabBar from "react-native-tab-view/src/TabBar";

const Classique = () => (
    <View style={[styles.scene]}>
        <Text>TEST</Text>
    </View>
);

const Meetic = () => (
    <View style={[styles.scene]} />
);

export default class EventTabView extends React.Component {
    constructor(props){
        super(props);
    }

    static navigationOptions = {
        title: 'EventTabView',
        headerStyle: { backgroundColor: Colors.DARK_GREY },
        headerTitleStyle: { color: Colors.WHITE }
    };

    state = {
        index: 0,
        routes: [
            {key: 'classique', title: 'Classique'},
            {key: 'meetic', title: 'Meetic'},
        ],
    };

    _renderTabBar = props => {
        return (
            <TabBar
                {...props}
                indicatorStyle={styles.indicator}
                style={styles.tabbar}
            />
        );
    };

    render() {
        const { navigation } = this.props;
        let listMeetic = navigation.getParam('listMeetic');
        let listClassic = navigation.getParam('listClassic');
        console.log(listMeetic);
        return (
            <TabView
                navigationState={this.state}
                renderScene={SceneMap({
                    classique: Classique,
                    meetic: Meetic,
                })}
                renderTabBar={this._renderTabBar}
                onIndexChange={index => this.setState({index})}
                initialLayout={{width: Dimensions.get('window').width, height: Dimensions.get('window').height}}
            />
        );
    }

}

const styles = StyleSheet.create({
    scene: {
        flex: 1,
        backgroundColor: Colors.GREY,
    },
    container: {
        flex: 1,
    },
    tabbar: {
        backgroundColor: Colors.CORAL,
    },
    indicator: {
        backgroundColor: Colors.WHITE,
    }
});