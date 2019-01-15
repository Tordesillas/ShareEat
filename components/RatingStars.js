import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import Images from "../constants/Images";

export default class RatingStars extends React.Component {
    render() {
        const rating = this.props.rating;

        return (
            <View style={styles.main_container}>
                {this.generateStars(rating)}
            </View>
        )
    }

    generateStars(rating) {
        let stars = [];
        for (let i = 0; i < 5; i++) {
            if (rating - i <= 0) {
                stars.push(<Image source={Images.empty_star} style={styles.star} key={i}/>);
            } else if (rating - i >= 1) {
                stars.push(<Image source={Images.star} style={styles.star} key={i}/>);
            } else {
                stars.push(<Image source={Images.half_star} style={styles.star} key={i}/>);
            }
        }
        return stars;
    }
}

const styles = StyleSheet.create({
    main_container: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-around"
    },
    star: {
        flex: 1,
        aspectRatio: 1,
        resizeMode: 'contain',
        marginHorizontal: 2
    }
});