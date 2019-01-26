import React from 'react';
import {StyleSheet, Text, View, ImageBackground, Image, FlatList, TouchableOpacity, Modal} from 'react-native';
import Colors from "../constants/Colors";
import Images, {getImageFromName} from "../constants/Images";
import RatingStars from "../components/RatingStars";
import UserMark from "../components/UserMark";
import Users from "../constants/Users";
import {Button} from "react-native-elements";

export default class ProfileScreen extends React.Component {
    static navigationOptions = {
        title: 'Profil',
        headerStyle: { backgroundColor: Colors.DARK_GREY },
        headerTitleStyle: { color: Colors.WHITE }
    };

    state = {
        modalVisible: false,
    };

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
                        <TouchableOpacity
                            style={{alignItems:'center', justifyContent:'center', backgroundColor: Colors.CORAL, width: 50, height: 50,
                                borderRadius: 50,
                            }} onPress={() => this.setState({modalVisible: true})}>
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
            <Modal
                animationType="slide"
                transparent={true}
                visible={this.state.modalVisible}
                onRequestClose={() => {}}>
                <View style={styles.modalContent}>
                    <Text>Vote pour {profile.name}</Text>

                    <Button title={"Annuler"} onPress={() => {this.setState({modalVisible: false})}}/>
                </View>
            </Modal>

        );
    }
}

const styles = StyleSheet.create({
    main_container: {
        flex: 1,
        backgroundColor: Colors.GREY,
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
        fontSize: 12,
        color: Colors.WHITE
    },
    quote: {
        width: 30,
        height: 30,
        padding: 10
    },
    main_divider: {
        height: 5,
        backgroundColor: Colors.LIGHT_GREY
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
    edit_icon: {
        height: 25,
        width: 25,
        aspectRatio: 1,
        resizeMode: 'contain',
    },
    modalContent: {
        flex: 1,
        backgroundColor: "white",
        padding: 22,
        marginHorizontal: 50,
        marginVertical: 100,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 4,
        borderColor: "rgba(0, 0, 0, 0.1)"
    }
});