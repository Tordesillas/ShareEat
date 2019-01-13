import React from 'react';
import { Text, View } from 'react-native';
import {Button, SearchBar} from "react-native-elements";
import Events from "../constants/Events";

export default class SearchEventScreen extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            query : "",
            meetic: [],
            classic : []
        }
    }
    static navigationOptions = {
        title: 'SearchEvent',
    };


    render() {
        return (
            <View>
                <SearchBar
                    onChangeText={this.handleSearch}
                    placeholder='Type Here......'
                />

                <Button
                    onPress={this.handleButton}
                    title="Recherche"
                    color="#841584"
                />
            </View>
        );
    }

    handleButton = () =>{
        console.log(this.state.query);
        this.props.navigation.navigate('EventTabView',{
            listClassic : this.state.classic,
            listMeetic :this.state.meetic
        });
    };

    handleSearch = (data) => {
        let events = Events;
        let meetic = [];
        let classic = [];
        for(let event of events){
            if(event.town.includes(data)){
                if(event.type === "meetic"){
                    meetic.push(event);
                }
                else classic.push(event);
            }
        }
        this.setState({query: data, meetic: meetic, classic : classic});
    }
}
