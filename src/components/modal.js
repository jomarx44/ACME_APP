import { useState } from 'react';
import { View, Text, Dimensions, Alert, TouchableOpacity, StyleSheet } from 'react-native';
import ModalProps from 'react-native-modal';
import { openDatabase } from 'expo-sqlite'
const db = openDatabase('Users.db')

let { height, width } = Dimensions.get("window")

const ModalSideMenu = (props, { navigation }) => {

    const onPressSideMenu = (val) => {
        if (val === 'Dashboard') {
            props.navigate(val)
        } else if (val === 'Logout') {
            Alert.alert(
                "Logout",
                "Are you sure want to logout?",
                [
                    {
                        text: "No",
                        style: "cancel"
                    },
                    {
                        text: "Yes", onPress: () => {
                            db.transaction((tx) => {
                                tx.executeSql(
                                    "DELETE FROM Users", // delete user 
                                    [],
                                    () => { props.navigate('Auth') }, // back to login
                                    error => { console.log(error) }
                                )
                            })
                        }
                    }
                ]
            );
        }
    }

    return (
        <ModalProps
            isVisible={props.modalVisiblity}
            onSwipeComplete={props.setModalVisibility}
            onBackButtonPress={props.setModalVisibility}
            onBackdropPress={props.setModalVisibility}
            animationIn="slideInRight" // Has others, we want slide in from the left
            animationOut="slideOutRight" // When discarding the drawer
            swipeDirection="left" // Discard the drawer with swipe to left
            useNativeDriver // Faster animation
            hideModalContentWhileAnimating // Better performance, try with/without
            propagateSwipe // Allows swipe events to propagate to children components (eg a ScrollView inside a modal)
            style={styles.modalView}
        >
            <View
                style={styles.containerView}
            >
                <View style={styles.titleContainer}>
                    <Text style={styles.textTitle} >ACME </Text>
                </View>
                <TouchableOpacity style={styles.touchableStyle} onPress={() => onPressSideMenu('Dashboard')}>
                    <Text>DashBoard</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.touchableStyle} onPress={() => onPressSideMenu('Logout')} >
                    <Text>Logout</Text>
                </TouchableOpacity>
            </View>
        </ModalProps>
    )
}

const styles = StyleSheet.create({
    titleContainer: { padding: 10, alignItems: "center", backgroundColor: "#e9e9e9" },
    textTitle: {
        letterSpacing: 0.25,
        color: '#3dcb01',
        fontSize: 20,
        fontWeight: "bold"
    }, touchableStyle: { padding: 10, alignItems: "center" },
    modalView: {
        alignItems: "flex-end",
        justifyContent: "flex-end",
        margin: 0,
        marginTop: 0,
    },
    containerView: {
        backgroundColor: "#ffffff",
        height: height,
        width: width * 0.50,
        elevation: 10,
        borderWidth: 0,
    },

})

export default ModalSideMenu