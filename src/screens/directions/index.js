import React, { useEffect } from 'react';
import { View, Text, Pressable, StyleSheet, Dimensions, StatusBar, Alert } from 'react-native'
import MapView from 'react-native-maps';
import MapViewDirection from 'react-native-google-maps-directions'
import { Ionicons } from 'react-native-vector-icons'
import Header from '../../components/header';
let { height, width } = Dimensions.get("window")
const Directions = ({ navigation }) => {

    useEffect(() => {
        Alert.alert('Apologise!', ' Due to the development time this phase is not yet fully functional!')
    }, [])
    return (
        <View style={{ flex: 1, backgroundColor: "#f9f9f9", height: height }}>
            <StatusBar hidden={true} />
            <Header
                press={() => { navigation.navigate('OverviewStack') }}
                first='Ticket'
                second='Get Directions'
                flag={false}
            />
            <MapView style={styles.map} />

        </View>
    );
};

const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        // borderRadius: 4,
        // backgroundColor: '#3dcb01',
        margin: 5
    }, text: {
        letterSpacing: 0.25,
        color: '#3dcb01',
        fontSize: 10
    },
    textTitleStyle: {
        fontSize: 13,
        fontWeight: "bold",
        fontStyle: "normal",
        color: "#3f3f3f",
    },
    map: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
})
export default Directions



