import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import Colors from "../constants/Colors";
import moment from "moment";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCalendarAlt, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons'
require('moment/locale/fr');


export default class EventList extends React.Component {
    render() {
        moment.locale("fr");
        const events = this.retrieveEvents();

        return (
            <View style={styles.main_container}>
                <View style={styles.main_container}>
                    {
                        events.map((item) => {
                            const eventDate = new Date(item.date);
                            const formattedEventDate = moment()
                                .year(eventDate.getFullYear())
                                .month(eventDate.getMonth())
                                .date(eventDate.getDate())
                                .format("dddd D MMMM YYYY");

                            return (
                                <TouchableOpacity style={styles.flatListRow} key={item.id} onPress={() => {
                                    this.props.navigation.navigate("Event", { event: item })
                                }}>
                                    <View style={styles.eventDetails}>
                                        <View>
                                            <Image
                                                style={styles.eventImage}
                                                source={{
                                                    uri:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAwFBMVEX///8AAADtHCTsAAD39/fCwsLi4uL7+/vW1tb19fU5OTnf39/Z2dno6OgmJibc3NykpKTs7OzMzMxdXV21tbV9fX2RkZF1dXWbm5uKiorPz89XV1c/Pz/tEhxKSkqurq5qamqFhYUWFhbsABEdHR1EREQkJCQMDAyXl5diYmIwMDD4ubv97u5ycnLvSE3wVVn0i471l5rvPUP3r7H6yszuKjLybnH2oKL0hYj+8vPxZWj4uLnvQUfwWF3zen372tv72OcAAAAIE0lEQVR4nO2daXvaOBCAucwdMGAItw2EAEnTbZte6Xa7//9fLdZYRgaHyzOy2GfebzWuPWNJc+lIJsMwDMMwDMMwDMMwDMMwDMMwDMMwDJMGhebQ2tKut9KWhICm251mFcYvdjltmRCxXrKxdNxK2qJhUL+PVw/YWGnLl5T2+Jh+PnM3bRmT0K6e0u+2dWx1IoOu7zRbJfihZtneXPntqZ6yqNfhKhr0Y1So9ZUePNMvX1IKo1D6bvO9m1rr3Uco6pQOgXooeq9w9EZ3JW90NImGgxO233H9fPry3rUGwbCwA5mrtXPursgO/UItFxqyVQbn/gdplDw6mVCRLdg+/78U57fUilag4EXGsVC9nbHYBFEblwbVo1uxqCWw/o3TNnSfQMU7AqFQCeS8Ji2CjvqELhIu7hVjUFKA5u9iy4RKCxS8MukLhrDRyX8nWRjtGt9Ph2Blrn/AyHR7Ok7ayyrQT/EkQqadPC6BdMrGkggbqBde7glVRPi2QhIIm9pl4XY8bhJjTM1MCJe0ni0eMkIRCB2c7GCN8p1IgJximPQxLXNtTRfJ0At7NU3+HHweEOyMj2uqS7zD6aSym15QINAFlNdKCE9qGJrsz9CGz72h/kIEzT2MJ7kJw3cq8LKCMkLwRwFe8toys15zhxeKlLCsMi51RC9mZvBdRtTw0chEH1PDpZGRKaaGIjLt4zwLD8xxKMo9xi1fKAoNcVYANYwch1AlO2tG9CRm2tIMnhOr4AUPqDTQBg9mh8dk44uFsizGMbSg2PPlWmI8aWBoGcNCywiWSOUQbNCKDwVDTWlgahAGIl5nwGaGFNUIkzVO/hx8hjjdFLyhcVGpQEzDe0mfYpuZ4Qt6KGn+3NBKmw8UMhLaGsdYS+ozQgi3GohZGD5ga7wkj4BRaFx+HzJNmhWAtze2CWUp4+H6B8B6HOPSewUvmbEBM2PyiiG5HuZKUwjG2MDcVyVYuXeVwy49YrgbcsBjrK4JnKfm91GfYAnl49UraI1chREB1g1lG5fOBo8SDWGtBCvZV5etZA/2QJmZU+wjd09c0BzNYG+Q2euDd8gNF2dbRfkf7imlQkVKfN6+wtb00i9iAHJXSfb+dKbRk/eaG2/H0Qw33fWO6liSzX0bVlRF2WF5/25fLQ7Cm6rm+8EDlF2yj/2YbaRFW9kHjbIQRzutXTNms/PRul0LAp1Ssd3fPCo/jm9ti2xIzG711fzgUuPWRmAE6+SO/Keb1s+n3j2m34txC4OuwnrnaAzPwlisaQhN24v012nXfXeX/g1TKJbbW4Y1EyeWGIb5H1AcOvZ6MOvev3Rng57ttHGWTxlBzRl0DkM1n9HMLd+6WS33R7G6KSx7Bm4eOY+K453SLmxM28xZ7WMUnJONF2Vs31QKXI4LRBsjzzcyva258TpPMTd0bibLcPbEn496Vv2gWlNqbtPgRvTOlX0LobgdsZtPA+to72u115HzFLMD042rq0q7cc5atVCKZlcnjs5KF2e1E3R50bGPlnp6nbGTF3XlhLnBxbWlir0blHMzbc6uWvF05Tr79m5IjszzHWEdP1tNEKM0d17UtBp/eAbrY8J9EuWlfNLUpGasPyB+eSs0V+aMxnB25R7H0IfnRZoyYbqRFhCt9nknrXLVhF0XrQeKDx52i/SXD9WkKMhZXk16x7QHY1saPvxQS5rndN2G9IIkM/CuASpKBYn2CpaDx6cXp0oFyeaP7ubptuIwUJBwArcSzBSns6ZWHoZMWkQqVUnHwVGCIxLJ1xJW0/KLwSpLDYslq+RjIZ6phi4KlMD3695UOgMFtUw+BIvHOzreFWJpjahq+t1iRfMrgw+qceZ/qrvbwPq3BFtVLsQmfd/bh5iL8E11rbC9I+0zf/L574e1/WBcaJqIm1IOwud8LrfI/Xtw3dLYTyGpQTlbIIbPi1wuN8n/OPgBKv86tumXaF39120bbsn/OfhFW4gxI3YUnwIV/9r/Afop/Q5hOHiE8kS8r4uJr+Li47696egxNh79az58WQgVf+9dBxtepXx1RgZQG+K3/MpDK+5dHugIFTt6hvtPUPGf6NUS+QiRo1DD30r5kY+zqH36RuzqstiZz6Dia+QiNCLl4TwQO3mEb9gRqBiNbmDOhvCvtPX1pb1bcyOim1zkWoU6AH+g7iQRvvh+cREdihC7ka26aetM7Ld+EfrpV/UaeCuy8qnw9horQn6ekZt8i1wTk+BkJxCJ76fzGGoxFKN5hkNpzS1trkLyBuHbm3IJHAbRRIZH2kFiefX76eKTemlDGJwSp02xgD1VGxF6Ekmpfai9k2aChHjxWbkC3ZRkpmagr1Ci8FEki+qVEVlcJdbFat9QLhox/6xcgVomwavSOs7w27YRJ2pJA5w+wVQUBDT6V/C8Cp+oVompwpq1jhJCDG/C1qhZVIco+hbPTWOh2S+/m6rZvshwCA7qwTsn+EL+FrZGSScsmvwCDE0aq8xEN1UzjBaNqSmnZGgy4BIjTn9FYtUtKi90mk+LPX8xJgm+xfCmmo45DqSJyrjzSIxel7hAcgSR66seUZxog16VFs4ipRNI9osZLolrrqblLLb8nkR9Po1NmKcTlQq+T6Jp8JBEQ/HQlPaz+sZUrSo26TRM6SCSH767+LX7N+JfXlJIU8PXPYdYIak2pK6hOpkohMFe7ZJaWJoBlz/5Qi3MkiSeP48P+Uku/5NamNY4u0pt/8pzLv99Txi8LUgMwzAMwzAMwzAMwzAMwzAMwzAMwwD/AQKEXvFat/IfAAAAAElFTkSuQmCC'
                                                }}
                                            />
                                        </View>
                                        <View>
                                            <Text style={styles.flatListLabel}>{item.name}</Text>


                                            <View style={styles.eventDetail}>
                                                <FontAwesomeIcon icon={faCalendarAlt} style={styles.icon} />
                                                <Text style={styles.flatListItem}>{formattedEventDate}</Text>
                                            </View>

                                            <View style={styles.eventDetail}>
                                                <FontAwesomeIcon icon={faMapMarkerAlt} style={styles.icon} />
                                                <Text style={styles.flatListItem}>Toto</Text>
                                            </View>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            );
                        })
                    }
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
        borderRadius: 5,
    },
    flatListLabel: {
        color: Colors.CORAL,
        fontWeight: "bold",
        fontSize: 16,
        marginBottom: 5,
    },
    flatListItem: {
        color: Colors.WHITE
    },
    eventDetails: {
        flexDirection: 'row',
        alignItems: 'center',
        alignContent: 'center',
    },
    eventDetail: {
        flexDirection: 'row',
        marginBottom: 5,
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
