import React from 'react';
import Colors from '../constants/Colors';
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons/index";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'

export default class TabBarIcon extends React.Component {
    render() {
        return (
            <FontAwesomeIcon icon={this.props.icon ? this.props.icon : faMapMarkerAlt}
                             style={this.props.focused ? styles.iconSelected : styles.icon} />
        );
    }
}

const styles = {
    icon: {
        color: Colors.LIGHT_BLUE,
        width: 10
    },
    iconSelected: {
        color: Colors.CORAL,
        width: 10,
    }
};