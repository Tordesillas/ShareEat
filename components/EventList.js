import React from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
import Colors from "../constants/Colors";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faCalendarAlt,
  faMapMarkerAlt
} from "@fortawesome/free-solid-svg-icons";
import { getImageFromName } from "../constants/Images";
import Users from "../constants/Users";
require("moment/locale/fr");

export default class EventList extends React.Component {
  render() {
    moment.locale("fr");
    const events = this.retrieveEvents();

    return (
      <View style={styles.main_container}>
        <View style={styles.main_container}>
          {events.map(item => {
            const eventDate = new Date(item.date);
            const formattedEventDate = moment()
              .year(eventDate.getFullYear())
              .month(eventDate.getMonth())
              .date(eventDate.getDate())
              .format("dddd D MMMM YYYY");

            return (
              <TouchableOpacity
                style={styles.flatListRow}
                key={item.id}
                onPress={() => {
                  item.type === "dpp"
                    ? this.props.navigation.navigate("Event", { event: item })
                    : null;
                }}
              >
                <View style={styles.eventDetails}>
                  <View>
                    <Image
                      style={styles.eventImage}
                      source={getImageFromName(Users[item.organizer].photoId)}
                    />
                  </View>
                  <View>
                    <Text style={styles.flatListLabel}>{item.name}</Text>

                    <View style={styles.eventDetail}>
                      <FontAwesomeIcon
                        icon={faCalendarAlt}
                        style={styles.icon}
                      />
                      <Text style={styles.flatListItem}>
                        {formattedEventDate}
                      </Text>
                    </View>

                    <View style={styles.eventDetail}>
                      <FontAwesomeIcon
                        icon={faMapMarkerAlt}
                        style={styles.icon}
                      />
                      <Text style={styles.flatListItem}>{item.location}</Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    );
  }

  retrieveEvents() {
    if (this.props.screen === "home") {
      return [this.props.events[0], this.props.events[1]];
    } else {
      return this.props.events;
    }
  }
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
    marginBottom: 10
  },
  flatList: {},
  flatListRow: {
    backgroundColor: Colors.DARK_MEDIUM_BLUE,
    padding: 10,
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 5
  },
  flatListLabel: {
    color: Colors.CORAL,
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 5
  },
  flatListItem: {
    color: Colors.WHITE,
    fontSize: 12
  },
  eventDetails: {
    flexDirection: "row",
    alignItems: "center",
    alignContent: "center"
  },
  eventDetail: {
    flexDirection: "row",
    marginBottom: 5
  },
  eventImage: {
    marginRight: 15,
    borderRadius: 100,
    width: 50,
    height: 50
  },
  eventDescription: {
    color: Colors.WHITE
  },
  icon: {
    marginRight: 5,
    color: Colors.WHITE,
    width: 10
  }
});
