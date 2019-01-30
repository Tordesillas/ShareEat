import React from "react";
import {StyleSheet, View, Modal, TouchableOpacity, ScrollView, Image} from "react-native";
import {SearchBar, Text} from "react-native-elements";
import Events from "../constants/Events";
import MultiSlider from "@ptomasroos/react-native-multi-slider";
import DatePicker from "react-native-datepicker";
import Colors from "../constants/Colors";
import EventList from "../components/EventList";
import {TabBar, TabView} from "react-native-tab-view";
import Images from "../constants/Images";
import MainTitle from "../components/MainTitle";

export default class SearchEventScreen extends React.Component {
    static navigationOptions = {
        title: "Rejoindre un événement",
        headerStyle: {backgroundColor: Colors.DARK_MEDIUM_BLUE},
        headerTitleStyle: {color: Colors.WHITE}
    };

    constructor(props) {
        super(props);
        
        this.state = {
            events: Events,
            query: "",
            meetic: [],
            classic: [],
            prices: [0, 20],
            dateFrom: "2019-05-01",
            dateTo: "2019-11-01",
            modalVisible: false,
            index: 0,
            routes: [
                {key: "classic", title: "Classique"},
                {key: "meetic", title: "Meetic"},
                {key: "udpp", title: "Dîner presque parfait"}
            ]
        };
    }

    render() {
        let events = this.filterEvent();
        this.classicEvents = [];
        this.meeticEvents = [];
        this.udppEvents = [];
        for (let event of events) {
            switch (event.type) {
                case "classic":
                    this.classicEvents.push(event); break;
                case "meetic":
                    this.meeticEvents.push(event); break;
                case "dpp":
                    this.udppEvents.push(event); break;
            }
        }

        return (
            <View style={styles.main}>
                <View style={styles.filter_container}>
                    <View style={{flex: 4}}>
                        <SearchBar
                            round
                            onChangeText={this.handleSearch}
                            placeholder="Entrez votre ville ici"
                            containerStyle={{backgroundColor: Colors.DARK_BLUE}}
                            inputStyle={{backgroundColor: Colors.DARK_MEDIUM_BLUE, color: Colors.WHITE}}
                            placeholderTextColor={Colors.WHITE}
                        />
                    </View>

                    <View style={styles.filter_button_container}>
                        <TouchableOpacity onPress={() => {this.setModalVisible(true);}} style={styles.filter_button}>
                            <Image source={Images.filter} style={styles.filter_icon}/>
                        </TouchableOpacity>
                    </View>
                </View>

                <TabView
                    navigationState={this.state}
                    renderScene={this._renderScene}
                    renderTabBar={this._renderTabBar}
                    onIndexChange={index => this.setState({index})}
                />

                {this.createModal()}
            </View>
        );
    }

    filterEvent() {
        return this.state.events.filter(event => {
            return (this.state.prices[0] <= event.price) && (event.price <= this.state.prices[1]);
        }).filter(event => {
            let date = event.date.split("T")[0];
            return (this.state.dateFrom < date) && (date < this.state.dateTo);
        }).filter(event => {
            return !!event.town.includes(this.state.query);
        });
    }

    handleSearch = data => {
        this.setState({
            query: data
        });
    };

    _renderTabBar = props => {
        return (
            <TabBar
                {...props}
                indicatorStyle={{backgroundColor: Colors.WHITE}}
                style={{backgroundColor: Colors.CORAL}}
                labelStyle={{fontSize: 11}}
            />
        );
    };

    _renderScene = ({ route }) => {
        switch (route.key) {
            case 'classic':
                return (
                    <ScrollView style={styles.event_list_container}>
                        <EventList
                            events={this.classicEvents}
                            screen={"SearchEvent"}
                            navigation={this.props.navigation}
                        />
                    </ScrollView>
                );
            case 'meetic':
                return (
                    <ScrollView style={styles.event_list_container}>
                        <EventList
                            events={this.meeticEvents}
                            screen={"SearchEvent"}
                            navigation={this.props.navigation}
                        />
                    </ScrollView>
                );
            case 'udpp':
                return (
                    <ScrollView style={styles.event_list_container}>
                        <EventList
                            events={this.udppEvents}
                            screen={"SearchEvent"}
                            navigation={this.props.navigation}
                        />
                    </ScrollView>
                );
            default:
                return null;
        }
    };

    createModal() {
        return (
            <Modal
                onRequestClose={() => {}}
                animationType="fade"
                transparent
                visible={this.state.modalVisible}>
                <View style={styles.modal_content}>
                    <View style={styles.inner_container}>
                        <MainTitle title={"Filtrer les événements"}/>

                        <View style={styles.price_container}>
                            <Text>
                                {"Prix de " + this.state.prices[0] + "€ à " + this.state.prices[1] + "€"}
                            </Text>
                            <MultiSlider
                                values={[0, 20]}
                                sliderLength={280}
                                onValuesChange={val => {this.setState({prices: val});}}
                                min={0}
                                max={20}
                                step={1}
                            />
                        </View>

                        <View style={{width: 280}}>
                            <Text>Date de début</Text>
                            <View style={styles.date_picker_container}>
                                <DatePicker
                                    style={styles.date_picker}
                                    date={this.state.dateFrom}
                                    mode="date"
                                    placeholder="select date"
                                    format="YYYY-MM-DD"
                                    minDate="2019-05-01"
                                    maxDate="2019-11-01"
                                    confirmBtnText="Confirm"
                                    cancelBtnText="Cancel"
                                    customStyles={{
                                        dateIcon: { position: "absolute", left: 0, top: 4, marginLeft: 0 },
                                        dateInput: { marginLeft: 36 }
                                    }}
                                    onDateChange={date => {this.setState({dateFrom: date})}}
                                />
                            </View>

                            <Text>Date de fin</Text>
                            <View style={styles.date_picker_container}>
                                <DatePicker
                                    style={styles.date_picker}
                                    date={this.state.dateTo}
                                    mode="date"
                                    placeholder="select date"
                                    format="YYYY-MM-DD"
                                    minDate="2019-05-01"
                                    maxDate="2019-11-01"
                                    confirmBtnText="Confirm"
                                    cancelBtnText="Cancel"
                                    customStyles={{
                                        dateIcon: { position: "absolute", left: 0, top: 4, marginLeft: 0 },
                                        dateInput: { marginLeft: 36 }
                                    }}
                                    onDateChange={date => {this.setState({dateTo: date})}}
                                />
                            </View>
                        </View>


                        <TouchableOpacity
                            onPress={() => {this.setModalVisible(!this.state.modalVisible)}}
                            style={styles.close_button}>
                            <Text style={styles.button_text}>Fermer</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </Modal>
        );
    }

    setModalVisible(visible) {
        this.setState({modalVisible: visible});
    }
}

const styles = StyleSheet.create({
    main: {
        backgroundColor: Colors.DARK_BLUE,
        color: Colors.WHITE,
        flex: 1,
        flexDirection: "column",
        justifyContent: "space-between"
    },
    filter_container: {
        flexDirection: "row"
    },
    filter_button_container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    filter_button: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.CORAL,
        width: 40,
        height: 40,
        borderRadius: 40
    },
    filter_icon: {
        height: 20,
        width: 20,
        aspectRatio: 1,
        resizeMode: 'contain',
    },
    event_list_container: {
        flex: 1,
        paddingHorizontal: 10
    },
    modal_content: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inner_container: {
        backgroundColor: Colors.WHITE,
        padding: 20,
        marginHorizontal: 50,
        marginVertical: 100,
        justifyContent: "center",
        alignItems: "center",
        borderColor: "rgba(0, 0, 0, 0.1)"
    },
    price_container: {
        marginTop: 20,
        marginBottom: 10
    },
    date_picker: {
        marginTop: 5,
        marginBottom: 15,
        width: 200,
    },
    date_picker_container: {
        justifyContent: "center",
        alignItems: "center",
    },
    close_button: {
        borderRadius: 5,
        backgroundColor: Colors.LIGHT_BLUE,
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 20,
        paddingRight: 20,
    },
    button_text: {
        color: Colors.WHITE,
    }
});
