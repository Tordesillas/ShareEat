import React from 'react';
import {StyleSheet, Text, View, ImageBackground, Image, FlatList, TouchableOpacity, Modal} from 'react-native';
import Colors from "../constants/Colors";
import Images, {getImageFromName} from "../constants/Images";
import RatingStars from "../components/RatingStars";
import UserMark from "../components/UserMark";
import Users from "../constants/Users";
import { Button, Rating } from "react-native-elements";
import MainTitle from "../components/MainTitle";

export default class ProfileScreen extends React.Component {
    static navigationOptions = {
        title: 'Profil',
        headerStyle: { backgroundColor: Colors.DARK_BLUE },
        headerTitleStyle: { color: Colors.WHITE }
    };

    state = {
        modalVisible: false,
        ratingValue: 1,
    };

    constructor(props) {
        super(props);
        this.ratingCompleted = this.ratingCompleted.bind(this);
    }

    render() {
        const profile = this.props.navigation.state.params.profile;

        return (
            <View style={styles.main_container}>
                <View style={styles.header_container}>
                    <ImageBackground source={Images.cooking} style={styles.main_image}>
                        <View style={{flex: 1}}>
                            <View style={styles.space}/>
                            <Image source={getImageFromName(profile.photoId)} style={styles.user_icon}/>
                            <View style={styles.space}/>
                        </View>
                        <View style={styles.header_text}>
                            <Text style={styles.name_text}>{profile.name}</Text>
                            <Text style={styles.age_text}>{profile.age} ans</Text>
                            <Text style={styles.age_text}>42 Route des Mimosas, Nice</Text>
                        </View>
                    </ImageBackground>
                </View>

                <View style={styles.biography_container}>
                    <View style={{flex: 1}}>
                        <Image source={Images.left_quote} style={styles.quote}/>
                    </View>
                    <View style={{alignItems: "center", justifyContent: "center", flex: 8, flexDirection: "row"}}>
                        <Text style={styles.biography}>{profile.biography}</Text>
                    </View>
                    <View style={{flex: 1, flexDirection: "column", justifyContent: 'flex-end'}}>
                        <Image source={Images.right_quote} style={styles.quote}/>
                    </View>
                </View>

                <View style={styles.main_divider}/>
                <View style={styles.rating_stars}>
                    <View style={{flex: 2, alignItems: "center", justifyContent: "center", paddingHorizontal: 25}}>
                        <RatingStars rating={profile.note}/>
                    </View>
                    <View style={{flex: 1, alignItems: "center", justifyContent: "center"}}>
                        <Text style={styles.age_text}>sur {profile.marks.length} avis</Text>
                    </View>
                    <View style={{flex: 1, alignItems: "center", justifyContent: "center", padding: 10}}>
                        <TouchableOpacity style={styles.edit_button}
                                          onPress={() => this.setState({modalVisible: true})}>
                            <Image source={Images.edit} style={styles.edit_icon}/>
                        </TouchableOpacity>
                    </View>

                </View>
                <View style={styles.main_divider}/>

                <View style={styles.comments_container}>
                    <Text style={styles.title}>Avis ({profile.marks.length})</Text>
                    <FlatList
                        data={profile.marks}
                        keyExtractor={(item) => item[0]+""}
                        renderItem={({item}) => <UserMark user={Users[item[0]]} mark={item[1]} navigation={this.props.navigation}/>}
                        horizontal={true}/>
                </View>
                {this.addModal(profile)}
            </View>
        );
    }

    addModal(profile) {
        return (
            <View style={styles.modalContent}>
            <Modal
                animationType="fade"
                transparent={true}
                visible={this.state.modalVisible}
                onRequestClose={() => {}}>
                <View style={styles.modalContent}>
                    <View style={styles.innerContainerTransparentStyle}>
                        <MainTitle title={"Attribuez une note à " + profile.name + " !"}/>
                        <Text style={{fontSize:16, marginTop: 20}}>Glissez votre doigt sur les étoiles pour noter la personne.</Text>

                        <Text style={{margin: 15, fontSize: 16}}>Note : {this.state.ratingValue} / 5</Text>

                        <Rating
                            // showRating
                            type="star"
                            fractions={0}
                            ratingColor={Colors.CORAL}
                            startingValue={this.state.ratingValue}
                            imageSize={40}
                            onFinishRating={this.ratingCompleted}
                            style={{ paddingVertical: 10 }}

                        />

                        <View style={{flexDirection: 'row', margin: 20}}>
                            <Button title={"Valider"} buttonStyle={styles.buttonValidate} onPress={() => {
                                this.onValidate();
                                this.onCloseModal()
                            }}/>
                            <Button title={"Fermer"} buttonStyle={styles.buttonClose} onPress={() => {
                                this.onCloseModal();
                            }}/>
                        </View>

                    </View>
                </View>
            </Modal>
            </View>
        );
    }

    ratingCompleted(rating) {
        this.setState({ratingValue: rating});
    }

    onValidate() {
        const user = this.props.navigation.state.params.profile;
        user.marks.push([user.marks.length + 1, this.state.ratingValue]);

        let note = 0;

        user.marks.forEach((mark) => {
            note += mark[1];
        });

        note /= user.marks.length;

        user.note = note;
    }

    onCloseModal()  {
        this.setState({modalVisible: false})
    }
}

const styles = StyleSheet.create({
    main_container: {
        flex: 1,
        backgroundColor: Colors.DARK_MEDIUM_BLUE,
        flexDirection: "column",
    },
    header_container: {
        flex: 6,
    },
    main_image: {
        height: '100%',
        paddingLeft: 10,
        flexDirection: "row"
    },
    user_icon: {
        flex: 5,
        aspectRatio: 1,
        resizeMode: 'contain',
    },
    space: {
        flex: 1
    },
    header_text: {
        flex: 3,
        justifyContent: "center",
        alignItems: "center"
    },
    name_text: {
        fontSize: 28,
        color: Colors.WHITE
    },
    age_text: {
        fontSize: 12,
        color: Colors.WHITE
    },
    biography_container: {
        flex: 6,
        flexDirection: "row",
        margin: 5
    },
    biography: {
        flex: 8,
        fontSize: 14,
        color: Colors.WHITE
    },
    quote: {
        width: 30,
        height: 30,
        padding: 10
    },
    main_divider: {
        height: 5,
        backgroundColor: Colors.LIGHT_BLUE
    },
    rating_stars: {
        flex: 3,
        flexDirection: "row"
    },
    comments_container: {
        flex: 8,
        marginHorizontal: 10,
        marginVertical: 5
    },
    title: {
        color: Colors.WHITE,
        marginBottom: 5
    },
    edit_button: {
        alignItems:'center',
        justifyContent:'center',
        backgroundColor: Colors.DARK_BLUE,
        width: 40,
        height: 40,
        borderRadius: 40
    },
    edit_icon: {
        height: 20,
        width: 20,
        aspectRatio: 1,
        resizeMode: 'contain',
    },
    modalContent: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    innerContainerTransparentStyle: {
        backgroundColor: Colors.WHITE,
        padding: 20,
        marginHorizontal: 50,
        marginVertical: 100,
        justifyContent: "center",
        alignItems: "center",
        borderColor: "rgba(0, 0, 0, 0.1)"
    },
    buttonValidate: {
        borderRadius: 5,
        backgroundColor: "#388e3c",
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 20,
        paddingRight: 20,
    },
    buttonClose: {
        borderRadius: 5,
        backgroundColor: Colors.LIGHT_BLUE,
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 20,
        paddingRight: 20,
    }
});