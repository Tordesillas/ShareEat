import React from "react";
import {
    StyleSheet,
    View,
    Modal,
    Dimensions,
    TouchableOpacity,
    ScrollView
} from "react-native";
import {SearchBar, Text} from "react-native-elements";
import Events from "../constants/Events";
import MultiSlider from "@ptomasroos/react-native-multi-slider";
import DatePicker from "react-native-datepicker";
import Colors from "../constants/Colors";
import EventList from "../components/EventList";
import {TabBar, TabView} from "react-native-tab-view";

const screen_height = Dimensions.get("window").height;
const screen_width = Dimensions.get("window").width;

export default class SearchEventScreen extends React.Component {
    static navigationOptions = {
        title: "Rejoindre un événement",
        headerStyle: {backgroundColor: Colors.DARK_GREY},
        headerTitleStyle: {color: Colors.WHITE}
    };

    constructor(props) {
        super(props);
        
        this.state = {
            events: Events,
            query: "",
            meetic: [],
            classic: [],
            checkedClassic: true,
            checkedMeetic: true,
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
                <SearchBar
                    onChangeText={this.handleSearch}
                    placeholder="Entrez votre ville ici"
                />

                <TouchableOpacity onPress={() => {this.setModalVisible(true);}} style={styles.button}>
                    <Text style={styles.buttonText}>Filtrer</Text>
                </TouchableOpacity>

                <TabView
                    navigationState={this.state}
                    renderScene={this._renderScene}
                    renderTabBar={this._renderTabBar}
                    onIndexChange={index => this.setState({index})}
                    initialLayout={{
                        width: Dimensions.get("window").width,
                        height: Dimensions.get("window").height
                    }}
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
                indicatorStyle={styles.indicator}
                style={styles.tab_bar}
            />
        );
    };

    _renderScene = ({ route }) => {
        switch (route.key) {
            case 'classic':
                return (
                    <ScrollView style={styles.scene}>
                        <EventList
                            events={this.classicEvents}
                            screen={"SearchEvent"}
                            navigation={this.props.navigation}
                        />
                    </ScrollView>
                );
            case 'meetic':
                return (
                    <ScrollView style={styles.scene}>
                        <EventList
                            events={this.meeticEvents}
                            screen={"SearchEvent"}
                            navigation={this.props.navigation}
                        />
                    </ScrollView>
                );
            case 'udpp':
                return (
                    <ScrollView style={styles.scene}>
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
                onRequestClose={() => {
                }}
                animationType="slide"
                transparent
                visible={this.state.modalVisible}>
                <View style={styles.modalStyle}>
                    <View style={styles.containerStyle}>
                        <Text style={styles.text}>
                            {"Prix de " +
                            this.state.prices[0] +
                            "$ à " +
                            this.state.prices[1] +
                            "$"}
                        </Text>
                        <View style={styles.margins}>
                            <MultiSlider
                                values={[0, 20]}
                                sliderLength={280}
                                onValuesChange={val => {
                                    this.setState({prices: val});
                                }}
                                min={0}
                                max={20}
                                step={1}
                            />
                        </View>
                        <Text style={styles.text}>Date de début</Text>
                        <DatePicker
                            style={styles.datePicker}
                            date={this.state.dateFrom}
                            mode="date"
                            placeholder="select date"
                            format="YYYY-MM-DD"
                            minDate="2019-05-01"
                            maxDate="2019-11-01"
                            confirmBtnText="Confirm"
                            cancelBtnText="Cancel"
                            customStyles={{
                                dateIcon: {
                                    position: "absolute",
                                    left: 0,
                                    top: 4,
                                    marginLeft: 0
                                },
                                dateInput: {
                                    marginLeft: 36
                                }
                                // ... You can check the source to find the other keys.
                            }}
                            onDateChange={date => {
                                this.setState({dateFrom: date});
                            }}
                        />
                        <Text style={styles.text}>Date de fin</Text>
                        <DatePicker
                            style={styles.datePicker}
                            date={this.state.dateTo}
                            mode="date"
                            placeholder="select date"
                            format="YYYY-MM-DD"
                            minDate="2019-05-01"
                            maxDate="2019-11-01"
                            confirmBtnText="Confirm"
                            cancelBtnText="Cancel"
                            customStyles={{
                                dateIcon: {
                                    position: "absolute",
                                    left: 0,
                                    top: 4,
                                    marginLeft: 0
                                },
                                dateInput: {
                                    marginLeft: 36
                                }
                            }}
                            onDateChange={date => {
                                this.setState({dateTo: date});
                            }}
                        />

                        <TouchableOpacity
                            onPress={() => {
                                this.setModalVisible(!this.state.modalVisible);
                            }}
                            style={styles.closeButton}
                        >
                            <Text style={styles.buttonText}>Fermer</Text>
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
    modalStyle: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.5)"
    },
    containerStyle: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "space-between",
        marginTop: screen_height * 0.25,
        marginBottom: screen_height * 0.25,
        marginLeft: screen_width * 0.075,
        marginRight: screen_width * 0.075,
        backgroundColor: "rgba(255,255,255,0.9)",
        borderRadius: 5
    },
    main: {
        backgroundColor: Colors.GREY,
        color: Colors.WHITE,
        flex: 1,
        flexDirection: "column",
        justifyContent: "space-between"
    },
    text: {
        color: "black",
        marginLeft: 15
    },
    margins: {
        marginLeft: 15
    },
    datePicker: {
        marginLeft: 15,
        width: 200,
        justifyContent: "center"
    },
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
    },
    button: {
        backgroundColor: Colors.CORAL,
        marginTop: 5,
        marginLeft: 5,
        marginRight: 5,
        marginBottom: 5,
        justifyContent: "center",
        alignItems: "center",
        paddingTop: 10,
        paddingBottom: 10,
        borderRadius: 5,
        fontSize: 15
    },
    closeButton: {
        backgroundColor: Colors.LIGHT_BLUE,
        marginTop: 5,
        marginLeft: 5,
        marginRight: 5,
        marginBottom: 5,
        justifyContent: "center",
        alignItems: "center",
        paddingTop: 10,
        paddingBottom: 10,
        borderRadius: 5,
        fontSize: 15
    },
    buttonText: {
        color: Colors.WHITE,
        textTransform: "uppercase",
        fontWeight: "bold"
    }
});
