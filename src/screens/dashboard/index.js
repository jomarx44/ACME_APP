import AsyncStorage from '@react-native-async-storage/async-storage';
import { openDatabase } from 'expo-sqlite';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Alert, Dimensions, Pressable, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { AntDesign, Entypo } from 'react-native-vector-icons';
import ACMEDatePicker from '../../components/datepicker';
import FlatlistTicket from '../../components/flatlistTicket';
import ModalSideMenu from '../../components/modal';
let { height, width } = Dimensions.get("window")
const db = openDatabase('Users.db')

const Dashboard = ({ navigation }) => {
    let array_items = [];
    const [empty, setEmpty] = useState([]);
    const [isDate, setTimeDate] = useState(new Date())
    const [isVisible, setVisible] = useState(false)
    const [items, setItems] = useState([])
    const [modalVisiblity, setModalVisibility] = useState(false)

    useEffect(() => {
        const unsubcribe = navigation.addListener('focus', () => {
            console.log("Refresh!");
            getData();
        })
        return unsubcribe
    }, [navigation])

    useEffect(() => {
        createTable();
        getData();
        if (items.length > 1) {
            setEmpty(false)
        } else {
            setEmpty(true)
        }
    }, [])

    const createTable = () => {
        //create new table for ticket
        db.transaction(tx => {
            tx.executeSql(
                "CREATE TABLE IF NOT EXISTS Ticket (id INTEGER PRIMARY KEY AUTOINCREMENT, ticketNo INT, name TEXT, datetime TEXT, contactNo INT(15), address VARCHAR(255), notes VARCHAR(255), dept_class VARCHAR(255), service_type VARCHAR(255), reason_call VARCHAR(255))"
            )
        })
    }

    const viewTicketPress = (id) => {
        AsyncStorage.setItem('ticketno', JSON.stringify(id))
        navigation.navigate('BottomTab')
    }

    const getData = () => {
        try {
            db.transaction((tx) => {
                tx.executeSql(
                    "SELECT * FROM Ticket", // fetch all the ticket created 
                    [],
                    (tx, results) => {
                        var len = results.rows.length;
                        if (len > 0) {
                            array_items = results.rows._array
                            setEmpty(false)
                            setItems(array_items)
                        }
                        else {
                            console.log("Error", results);
                        }
                    }
                )
            })
        } catch (error) {
            console.log(error);
        }
    }
    const onChange = (e, date) => {
        setVisible(false)
        setTimeDate(date)
    }
    const emptyMSG = (status) => { // display if the ticket db is empty
        return (
            <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
                <Text style={{ fontSize: 15, textAlign: 'center' }}>
                    No Record Inserted Database is Empty...
                </Text>
            </View>
        );
    }

    return (
        <View style={styles.mainContainer}>
            <StatusBar hidden={true} />
            <View style={styles.subContainer}>
                <View style={styles.calendarSyncContainer} >
                    <View>
                        <TouchableOpacity style={styles.button} onPress={() => setVisible(true)} >
                            <AntDesign name="calendar" size={20} color="#3dcb01" />
                            <Text style={styles.text}>Calendar</Text>
                            {isVisible ?
                                <ACMEDatePicker // date picker component 
                                    value={new Date()}
                                    onchange={onChange}
                                />
                                : console.log("Else")}
                        </TouchableOpacity>
                    </View>
                    <View>
                        <Pressable style={styles.button} onPress={() => Alert.alert("Under on development!")}>
                            <AntDesign name="sync" size={20} color="#3dcb01" />
                            <Text style={styles.text}>Sync</Text>
                        </Pressable>
                    </View>
                </View>
                <View>
                    <Text style={styles.textTitleStyle}>
                        ACME | DASHBOARD
                    </Text>
                </View>
                <View style={styles.ticketMenuContainer} >
                    <View style={{}}>
                        <Pressable style={styles.button} onPress={() => navigation.navigate('AddTicket')} >
                            <Entypo name="plus" size={20} color="#3dcb01" />
                            <Text style={styles.text}>New Ticket</Text>
                        </Pressable>
                    </View>
                    <View>
                        <Pressable style={styles.button} onPress={() => setModalVisibility(true)} >
                            <Entypo name="menu" size={20} color="#3dcb01" />
                            <Text style={styles.text}>Menu</Text>
                        </Pressable>
                    </View>
                </View>
            </View>
            <View style={styles.dateContainer}>
                <Text>
                    {moment(isDate).format('MMMM DD YYYY')}
                </Text>

            </View>
            <View style={styles.flatlistContainer}>
                {
                    empty ? emptyMSG(empty) :
                        <FlatlistTicket     // flatlist custom component
                            item={items}
                            pressViewTicket={(val) => viewTicketPress(val)}
                        />
                }
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
    mainContainer: {
        flex: 1,
        backgroundColor: "#f9f9f9",
        height: height
    },
    subContainer: {
        flexDirection: "row",
        height: 80, backgroundColor: "#f2f2f2",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 10
    },
    calendarSyncContainer: {
        flexDirection: "row",
        alignItems: "flex-start"
    },
    ticketMenuContainer: {
        flexDirection: "row",
        alignItems: "flex-end"
    },
    dateContainer: {
        backgroundColor: "#e9e9e9",
        paddingHorizontal: 10,
        marginBottom: 20
    },
    flatlistContainer: {
        paddingHorizontal: 10,
        flex: 1
    },
    itemsStyle: {
        fontSize: 10,
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
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
    dateTxt: {
        fontSize: 14,
        fontWeight: "normal",
        fontStyle: "normal",
        marginLeft: 5,
        letterSpacing: 0,
        color: "#494949",
        alignSelf: "center",
    },
})
export default Dashboard