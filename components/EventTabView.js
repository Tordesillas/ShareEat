import React from "react";
import {View, StyleSheet, Dimensions} from "react-native";
import {TabView, SceneMap, TabBar} from "react-native-tab-view";
import Colors from "../constants/Colors";
import EventList from "./EventList";
import {SearchBar} from "react-native-elements";

export default class EventTabView extends React.Component {
    static navigationOptions = {
        title: "EventTabView",
        headerStyle: {backgroundColor: Colors.DARK_GREY},
        headerTitleStyle: {color: Colors.WHITE}
    };

    constructor(props) {
        super(props);
        let params = props.navigation.state.params;
        console.log(params);

        let listMeetic = params.listMeetic;
        let listClassic = params.listClassic;
        this.state = {
            meetic: listMeetic,
            classic: listClassic
        };
    }

    state1 = {
        index: 0,
        routes: [
            {key: "classique", title: "Classique"},
            {key: "meetic", title: "Meetic"}
        ]
    };

    Classique = () => (
        <View style={styles.scene}>
            <EventList events={this.state.classic}/>
        </View>
    );

    Meetic = () => (
        <View style={styles.scene}>
            <EventList events={this.state.meetic}/>
        </View>
    );

    _renderTabBar = props => {
        return (
            <TabBar
                {...props}
                indicatorStyle={styles.indicator}
                style={styles.tab_bar}
            />
        );
    };

    render() {
        return (
            <View style={{flex: 1}}>
                <SearchBar
                    onChangeText={this.handleSearch}
                    placeholder="Type your city here"
                />
                <TabView
                    navigationState={this.state1}
                    renderScene={SceneMap({
                        classique: this.Classique,
                        meetic: this.Meetic
                    })}
                    renderTabBar={this._renderTabBar}
                    onIndexChange={index => this.setState({index})}
                    initialLayout={{
                        width: Dimensions.get("window").width,
                        height: Dimensions.get("window").height
                    }}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    scene: {
        flex: 1,
        backgroundColor: Colors.GREY
    },
    container: {
        flex: 1
    },
    tab_bar: {
        backgroundColor: Colors.CORAL
    },
    indicator: {
        backgroundColor: Colors.WHITE
    }
});
