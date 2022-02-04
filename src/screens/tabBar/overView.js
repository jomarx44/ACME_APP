import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, Dimensions, StatusBar, Pressable } from 'react-native'
import { Entypo, Ionicons, EvilIcons, Feather, MaterialCommunityIcons, Foundation } from 'react-native-vector-icons'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { openDatabase } from 'expo-sqlite'
import ModalSideMenu from '../../components/modal';
import Header from '../../components/header';

let { height, width } = Dimensions.get("window")
const db = openDatabase('Users.db')
let val = ""
const Overview = ({ navigation }) => {
    const [items, setItems] = useState({})
    const [modalVisiblity, setModalVisibility] = useState(false)

    useEffect(async () => {
        val = await AsyncStorage.getItem('ticketno')
        getData();

    }, [])

    useEffect(() => {
        const unsubcribe = navigation.addListener('blur', async () => {
            await AsyncStorage.removeItem('ticketno');
            console.log('Data removed')
        })
        return unsubcribe
    }, [navigation])
    const getData = () => {
        try {
            db.transaction((tx) => {
                tx.executeSql(
                    "SELECT * FROM Ticket WHERE ticketNo = ?", [val], //fetch data from db with where condition via ticket no
                    (tx, results) => {
                        var len = results.rows.length;
                        if (len > 0) {
                            setItems(...results.rows._array)
                        }
                        else {
                            console.log("Error no data found!");
                        }
                    }
                )
            })
        } catch (error) {
            console.log(error);
        }
    }
    const pressBack = async () => {
        try {
            await AsyncStorage.removeItem('ticketno');
            console.log('Data removed')
            navigation.navigate('Dashboard')

        }
        catch (exception) {
            console.log(exception)
        }
    }
    return (
        <View style={styles.mainContainer}>
            <StatusBar hidden={true} />
            <Header // header component
                press={() => pressBack()}
                first='Dashboard'
                second='Work Ticket'
                third="Menu"
                flag={true}
                pressThird={() => setModalVisibility(true)}
            />
            <View style={styles.secondSubContainer}>
                <View style={styles.flexDirectionRow}>
                    <View style={{ width: width * 0.4, padding: 5 }}>
                        <Text>Customer info: </Text>
                        <View style={styles.rowMargin}>
                            <Text>{items?.name} </Text>
                            <Feather name="phone-call" color="#3dcb01" size={15} />
                            <Text> {items?.contactNo}</Text>
                        </View>
                    </View>
                    <View style={styles.verticalLine}></View>
                    <View style={{ width: width * 0.4, marginLeft: 10, padding: 5 }}>
                        <Text>Schedule for: </Text>
                        <View style={styles.rowMargin}>
                            <Text> {items?.datetime}</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.flexDirectionRow}>
                    <View style={{ width: width * 0.4, padding: 5 }}>
                        <View style={styles.rowMargin}>
                            <View style={{ flex: 1 }}>
                                <View style={styles.flexDirectionRow}>
                                    <EvilIcons name="location" color="#3dcb01" size={15} />
                                    <Text style={styles.fontSize12}> Job site address</Text>
                                </View>
                                <Text style={{ fontSize: 12, marginVertical: 5 }}>  {items?.address}</Text>
                                <View style={{ flexDirection: "row", marginVertical: 5 }}>
                                    <MaterialCommunityIcons name="map-marker-distance" color="#3dcb01" size={15} />
                                    <Text style={styles.fontSize12}> Distance</Text>
                                </View>
                                <Text style={styles.fontSize12}> Approx. 17 minutes</Text>
                                <Text style={styles.fontSize12}> 11.9mins</Text>

                            </View>
                            <View style={{ alignItems: "flex-end" }}>
                                <Pressable style={styles.getDirectionsContainer} onPress={() => navigation.navigate('Directions')} >
                                    <Text style={{ fontSize: 12, color: "#f3f3f3" }}>Get Directions</Text>
                                </Pressable>
                            </View>
                        </View>
                    </View>
                    <View style={styles.verticalLine}></View>

                    <View style={{ width: width * 0.4, marginLeft: 10, padding: 5, margin: 5 }}>
                        <View style={styles.flexDirectionRow}>
                            <Foundation name="clipboard-notes" color="#3dcb01" size={15} />
                            <Text style={styles.fontSize12}> Dispatch Notes: </Text>
                        </View>
                        <View style={{ paddingVertical: 10 }}>
                            <Text>{items?.notes}</Text>
                        </View>
                        <View style={styles.flexDirectionRow}>
                            <Text> Dept. Class: </Text>
                            <Text style={{ marginRight: 10 }}> {items?.dept_class} </Text>
                            <Text> Service Type:  </Text>
                            <Text>{items?.service_type}  </Text>
                        </View>
                    </View>
                </View>
                <View style={styles.horizontalLine}></View>
                <View style={styles.flexDirectionRow}>
                    <View style={{ marginRight: 20 }}>
                        <Text>Reason for call</Text>
                    </View>
                    <View style={{ flex: 1 }}>
                        <Text> {items?.reason_call} </Text>
                    </View>
                    <View style={{ marginLeft: 20 }}>
                        <Text>Ticket # {items?.ticketNo}</Text>
                    </View>
                </View>
            </View>
            <ModalSideMenu // sidemenu modal custom component
                modalVisiblity={modalVisiblity}
                setModalVisibility={() => setModalVisibility(false)}
                navigate={(val) => navigation.navigate(val)}
            />
        </View >
    );
};


const styles = StyleSheet.create({
    mainContainer: { flex: 1, backgroundColor: "#f9f9f9", height: height },
    subContainer: {
        flexDirection: "row", height: 80, backgroundColor: "#e9e9e9", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 10
    },
    secondSubContainer: { backgroundColor: "#f9f9f9", paddingHorizontal: 10, marginBottom: 20 },
    flexDirectionRow: { flexDirection: "row" },
    rowMargin: { flexDirection: 'row', margin: 5 },
    horizontalLine: { flexDirection: "column", height: 10, backgroundColor: "#c9c9c9", marginRight: 10, },
    verticalLine: { flexDirection: "column", width: 2, backgroundColor: "#c9c9c9", marginRight: 10, },
    fontSize12: { fontSize: 12 },
    getDirectionsContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 4,
        backgroundColor: '#3dcb01',
        height: 30,
        width: 90,
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        // borderRadius: 4,
        // backgroundColor: '#3dcb01',
        margin: 5
    },
    text: {
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

})
export default Overview