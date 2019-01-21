import React from "react";
import { StyleSheet, View } from "react-native";
import { Button, SearchBar, CheckBox, Text } from "react-native-elements";
import Events from "../constants/Events";
import MultiSlider from "@ptomasroos/react-native-multi-slider";
import DatePicker from "react-native-datepicker";
import Colors from "../constants/Colors";
import EventList from "../components/EventList";

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
      dateTo: "2019-11-01"
    };
  }
  static navigationOptions = {
      title: "SearchEvent",
      headerStyle: { backgroundColor: Colors.DARK_GREY },
      headerTitleStyle: { color: Colors.WHITE }
  };

  render() {
    let events = this.filterEvent();
    return (
      <View style={styles.main}>
        <SearchBar
          onChangeText={this.handleSearch}
          placeholder="Type your city here"
        />
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
            this.setState({ prices: val });
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
            this.setState({ dateFrom: date });
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
            // ... You can check the source to find the other keys.
          }}
          onDateChange={date => {
            this.setState({ dateTo: date });
          }}/>
          <Button
              onPress={this.handleButton}
              title="Recherche"
              backgroundColor="#ed534b"
          />
      </View>
    );
  }

    filterEvent(){
        let events = this.state.events.filter(event => {
            if (event.type === "meetic" && this.state.checkedMeetic) return true;
            if (event.type === "classic" && this.state.checkedClassic) return true;
            return false;
        });

        events = events.filter(event => {
            if(this.state.prices[0] <= event.price && event.price <= this.state.prices[1])
                return true;
            return false;
        });

        events = events.filter(event => {
            let date = event.date.split("T")[0];
            if (this.state.dateFrom < date && date < this.state.dateTo) return true;
            return false;
        });

        return events;
    }

    handleButton = () => {
        let events = this.filterEvent();
        let meetic = [];
        let classic = [];
        for (let event of events) {
            if (event.type === "meetic")
                meetic.push(event);
            else if (this.state.checkedClassic)
                classic.push(event);
        }

        console.log("BOUTON PRESSE");
        console.log(this.state.query);
        this.props.navigation.navigate("EventTabView", {
          listClassic: classic,
          listMeetic: meetic
        });
  };

  handleSearch = data => {
    let events = this.filterEvent();
    let eventsToReturn = [];
    let meetic = [];
    let classic = [];
    for (let event of events) {
      if (data !== "" && event.town.includes(data)) {
        if (event.type === "meetic" && this.state.checkedMeetic) {
          meetic.push(event);
        } else if (this.state.checkedClassic) classic.push(event);
        eventsToReturn.push(event);
      }
    }

    if (data === "") eventsToReturn = events;
    this.setState({
      query: data,
      meetic: meetic,
      classic: classic,
      events: eventsToReturn
    });
  };
}

const styles = StyleSheet.create({
  checkboxs: {},
      main: {
          backgroundColor: Colors.GREY,
          color: Colors.WHITE,
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'space-between',
      },
    text:{
        color: Colors.WHITE,
        marginLeft: 15
    },
    margins:{
      marginLeft: 15
    },
    datePicker:{
        marginLeft: 15,
        width: 200,
        justifyContent: 'center',
    }
});
