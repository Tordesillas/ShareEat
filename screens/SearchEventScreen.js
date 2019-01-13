import React from 'react';
import { Text, View } from 'react-native';
import {SearchBar} from "react-native-elements";
import Events from "../constants/Events";

export default class SearchEventScreen extends React.Component {
    static navigationOptions = {
        title: 'SearchEvent',
    };

    render() {
        return (
            <View>
                <Text>SearchEvent</Text>
                <SearchBar
                    onChangeText={(data) => SearchEventScreen.searchMethod(data)}
                    placeholder='Type Here......' />
            </View>
        );
    }

    static searchMethod(data){
        console.log(data + "\n");
        let events = Events;
        let res = [];
        for(let event of events){
            if(event.town.includes(data)){
                res.push(event);
            }
        }
        console.log(res);
        return res;
    }
}
