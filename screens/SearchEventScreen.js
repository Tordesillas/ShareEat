import React from "react";
import {StyleSheet, View, Modal, Dimensions,TouchableOpacity} from "react-native";
import {SearchBar, CheckBox, Text} from "react-native-elements";
import Events from "../constants/Events";
import MultiSlider from "@ptomasroos/react-native-multi-slider";
import DatePicker from "react-native-datepicker";
import Colors from "../constants/Colors";
import EventList from "../components/EventList";
import {SceneMap, TabBar, TabView} from "react-native-tab-view";

const screen_height = Dimensions.get('window').height;
const screen_width = Dimensions.get('window').width;

export default class SearchEventScreen extends React.Component {
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
            modalVisible: false
        };
    }

    static navigationOptions = {
        title: "SearchEvent",
        headerStyle: {backgroundColor: Colors.DARK_GREY},
        headerTitleStyle: {color: Colors.WHITE}
    };

    setModalVisible(visible) {
        this.setState({modalVisible: visible});
    }

    state1 = {
        index: 0,
        routes: [
            {key: "classique", title: "Classique"},
            {key: "meetic", title: "Meetic"}
        ]
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
        let events = this.filterEvent();
        let meetic = [];
        let classic = [];
        for (let event of events) {
            if (event.type === "meetic")
                meetic.push(event);
            else if (this.state.checkedClassic)
                classic.push(event);
        }

        return (
            <View style={styles.main}>
                <SearchBar
                    onChangeText={this.handleSearch}
                    placeholder="Type your city here"
                />
                <Modal
                    animationType="slide"
                    transparent
                    visible={this.state.modalVisible}>
                    <View style={styles.modalStyle}>
                        <View style={styles.containerStyle}>
                            <View style={styles.checkboxs}>
                                <CheckBox
                                    title="Meetic"
                                    checked={this.state.checkedMeetic}
                                    onPress={() =>
                                        this.setState({
                                            checkedMeetic: !this.state.checkedMeetic
                                        })
                                    }
                                />
                                <CheckBox
                                    title="Classic"
                                    checked={this.state.checkedClassic}
                                    onPress={() =>
                                        this.setState({
                                            checkedClassic: !this.state.checkedClassic
                                        })
                                    }
                                />
                            </View>
                            <Text style={styles.text}>
                                {"price from " +
                                this.state.prices[0] +
                                "$ to " +
                                this.state.prices[1] +
                                "$"}
                            </Text>
                            <MultiSlider
                                values={[0, 20]}
                                sliderLength={280}
                                onValuesChange={val => {
                                    this.setState({prices: val});
                                }}
                                min={0}
                                max={20}
                                step={1}
                                style={styles.margins}
                            />
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
                                }}/>

                            <TouchableOpacity onPress={() => {this.setModalVisible(!this.state.modalVisible);}} style={styles.button}>
                                <Text style={styles.buttonText}>Fermer</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
                <TouchableOpacity onPress={() => {this.setModalVisible(true);}} style={styles.button}>
                    <Text style={styles.buttonText}>Filtrer</Text>
                </TouchableOpacity>
                <TabView
                    navigationState={this.state1}
                    renderScene={SceneMap({
                        classique: () => (
                            <View style={styles.scene}>
                                <EventList events={classic} screen={"SearchEvent"} navigation={this.props.navigation}/>
                            </View>
                        ),
                        meetic:() => (
                            <View style={styles.scene}>
                                <EventList events={meetic} screen={"SearchEvent"} navigation={this.props.navigation}/>
                            </View>
                        )
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

    filterEvent() {
        let events = this.state.events.filter(event => {
            if (event.type === "meetic" && this.state.checkedMeetic) return true;
            if (event.type === "classic" && this.state.checkedClassic) return true;
            return false;
        });

        events = events.filter(event => {
            if (this.state.prices[0] <= event.price && event.price <= this.state.prices[1])
                return true;
            return false;
        });

        events = events.filter(event => {
            let date = event.date.split("T")[0];
            if (this.state.dateFrom < date && date < this.state.dateTo) return true;
            return false;
        });

        events = events.filter(event => {
            if(event.town.includes(this.state.query))return true;
            else return false;
        });
        return events;
    }

    handleSearch = data => {
        this.setState({
            query: data,
        });
    };
}

const styles = StyleSheet.create({
    modalStyle: {
        flex:1,
        backgroundColor: 'rgba(0,0,0,0.5)'
    },
    containerStyle: {
        flex: 1,
        marginTop: screen_height * 0.075,
        marginBottom: screen_height * 0.075,
        marginLeft: screen_width * 0.075,
        marginRight: screen_width * 0.075,
        backgroundColor: 'rgba(255,255,255,0.9)',
        borderRadius: 5
    },
    main: {
        backgroundColor: Colors.GREY,
        color: Colors.WHITE,
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    text: {
        color: 'black',
        marginLeft: 15
    },
    margins: {
        marginLeft: 15
    },
    datePicker: {
        marginLeft: 15,
        width: 200,
        justifyContent: 'center',
    },
    scene: {
        flex: 1,
        backgroundColor: Colors.GREY
    },
    container: {
        flex: 1
    },
    tabbar: {
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
        fontSize: 15,
    },
    buttonText: {
        color: Colors.WHITE,
        textTransform: "uppercase",
        fontWeight: "bold",
    },
});
