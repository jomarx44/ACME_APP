import moment from 'moment';
import React, { useState, useEffect } from 'react';
import { View, Text, Pressable, StyleSheet, Dimensions, StatusBar, TextInput, ScrollView, Alert, TouchableOpacity } from 'react-native'
import { Ionicons } from 'react-native-vector-icons'
import ACMEDatePicker from '../../../components/datepicker'
let { height, width } = Dimensions.get("window")
import { openDatabase } from 'expo-sqlite'
import Header from '../../../components/header';
const db = openDatabase('Users.db')

const AddTicket = ({ navigation, route }) => {
    const [isVisible, setVisible] = useState(false)
    const [isTicket, setTicket] = useState(0)
    const [isName, setName] = useState('')
    const [isDate, setTimeDate] = useState(new Date())
    const [isContact, setContact] = useState(0)
    const [isAddress, setAddress] = useState('')
    const [isNotes, setNotes] = useState('')
    const [isDeptClass, setDeptClass] = useState('')
    const [isServiceType, setServiceCall] = useState('')
    const [isReasonCall, setReasonCall] = useState('')
    const clearFields = () => {
        console.log("pasok dito sa clear");
        setName('')
        setContact('')
        setAddress('')
        setNotes('')
        setDeptClass('')
        setServiceCall('')
        setReasonCall('')
    }
    const mathRandomInt = () => {
        let val = Math.floor(Math.random() * 10000)
        setTicket(val)
    }

    const onChange = (e, date) => {
        setVisible(false)
        setTimeDate(date)
    }
    const AddTicketPress = () => {
        if (!isName || !isDate || !isContact || !isAddress || !isNotes || !isDeptClass || !isServiceType || !isReasonCall) {
            Alert.alert("Please complete the form!")
        } else {
            console.log(isTicket, isName, isDate, isContact, isAddress, isNotes, isDeptClass, isServiceType, isReasonCall);
            let datetime = moment(isDate).utc().format('YYYY-MM-DD HH:mm A')
            db.transaction(tx => {
                tx.executeSql(
                    'INSERT INTO Ticket (ticketNo, name, datetime, contactNo, address, notes, dept_class, service_type, reason_call ) VALUES (?,?,?,?,?,?,?,?,?)',
                    [isTicket, isName, datetime, isContact, isAddress, isNotes, isDeptClass, isServiceType, isReasonCall],
                    (tx, results) => {
                        console.log('Results', results.rowsAffected);
                        if (results.rowsAffected > 0) {
                            Alert.alert(
                                'Success',
                                'Ticket added!'
                            );
                        } else alert('Registration Failed');
                        clearFields()
                    }, (error) => console.log("error: ", error)
                );
            })
        }
    }
    useEffect(() => {
        mathRandomInt() //create ticket no.
    }, []);
    return (
        <ScrollView >
            <View style={styles.containerOne}>
                <StatusBar hidden={true} />
                <Header // header component
                    press={() => navigation.navigate('Dashboard')}
                    first='Dashboard'
                    second=' Add Ticket'
                    flag={false}
                />
            </View>

            <View style={styles.containerTwo}>
                <View style={styles.subContainerTwo}>
                    <View style={{ padding: 5, flexDirection: "row", }}>
                        <View style={{ justifyContent: "center", marginRight: 10 }} >
                            <Text style={{ ...styles.text, color: '#b2b2b2' }}>Ticket #</Text>
                        </View>
                        <View style={{ flex: 1, alignItems: "flex-end" }}>
                            <TextInput
                                value={isTicket.toString()}
                                style={styles.textInputStyle}
                                editable={false}
                            />
                        </View>
                    </View>
                    <View style={{ padding: 5, flexDirection: "row" }}>
                        <View style={{ justifyContent: "center", marginRight: 10, }} >
                            <Text style={{ ...styles.text, color: '#b2b2b2' }}>Name </Text>
                        </View>
                        <View style={{ flex: 1, alignItems: "flex-end", }}>
                            <TextInput
                                value={isName}
                                onChangeText={(text) => setName(text)}
                                style={styles.textInputStyle}
                            />
                        </View>
                    </View>
                    <View style={{ padding: 5, flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                        <View style={{ justifyContent: "center", marginRight: 10 }} >
                            <Text style={{ ...styles.text, color: '#b2b2b2' }}>Date </Text>
                        </View>
                        <View style={{ flex: 1, alignItems: "flex-end" }}>
                            <TouchableOpacity onPress={() => setVisible(true)}>
                                {isVisible ?
                                    <ACMEDatePicker
                                        value={new Date()}
                                        onchange={(name, date) => onChange(name, date)}
                                    /> :
                                    <Text style={styles.textInputStyle}>
                                        {moment(isDate).format('MMMM DD YYYY')}
                                    </Text>}
                            </TouchableOpacity>

                        </View>
                    </View>
                    <View style={{ padding: 5, flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                        <View style={{ justifyContent: "center", marginRight: 10 }} >
                            <Text style={{ ...styles.text, color: '#b2b2b2' }}>Contact no. </Text>
                        </View>
                        <View style={{ flex: 1, alignItems: "flex-end" }}>
                            <TextInput
                                value={isContact.toString()}
                                keyboardType='numeric'
                                style={styles.textInputStyle}
                                onChangeText={(text) => setContact(text)}
                            />
                        </View>
                    </View>
                    <View style={{ padding: 5, flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                        <View style={{ justifyContent: "center", marginRight: 10 }} >
                            <Text style={{ ...styles.text, color: '#b2b2b2' }}>Address </Text>
                        </View>
                        <View style={{ flex: 1, alignItems: "flex-end" }}>
                            <TextInput
                                value={isAddress}
                                style={styles.textInputStyle}
                                onChangeText={(text) => setAddress(text)}
                            />
                        </View>
                    </View>
                    <View style={{ padding: 5, flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                        <View style={{ justifyContent: "center", marginRight: 10 }} >
                            <Text style={{ ...styles.text, color: '#b2b2b2' }}>Notes </Text>
                        </View>
                        <View style={{ flex: 1, alignItems: "flex-end" }}>
                            <TextInput
                                multiline={true}
                                numberOfLines={5}
                                style={{
                                    borderRadius: 5,
                                    borderWidth: 1,
                                    borderColor: "#3dcb01",
                                    width: 180,
                                    margin: 5,
                                    padding: 10,
                                    textAlignVertical: "top"
                                }}
                                value={isNotes}
                                onChangeText={(text) => setNotes(text)}
                            />
                        </View>
                    </View>
                    <View style={{ padding: 5, flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                        <View style={{ justifyContent: "center", marginRight: 10 }} >
                            <Text style={{ ...styles.text, color: '#b2b2b2' }}>Dept.class </Text>
                        </View>
                        <View style={{ flex: 1, alignItems: "flex-end" }}>
                            <TextInput
                                value={isDeptClass}
                                style={styles.textInputStyle}
                                onChangeText={(text) => setDeptClass(text)}
                            />
                        </View>
                    </View>

                    <View style={{ padding: 5, flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                        <View style={{ justifyContent: "center", marginRight: 10 }} >
                            <Text style={{ ...styles.text, color: '#b2b2b2' }}>Service call </Text>
                        </View>
                        <View style={{ flex: 1, alignItems: "flex-end" }}>
                            <TextInput
                                style={styles.textInputStyle}
                                onChangeText={(text) => setServiceCall(text)}
                                value={isServiceType}
                            />
                        </View>
                    </View>
                    <View style={{ padding: 5, flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                        <View style={{ justifyContent: "center", marginRight: 10 }} >
                            <Text style={{ ...styles.text, color: '#b2b2b2' }}>Reason for call </Text>
                        </View>
                        <View>
                            <TextInput
                                style={styles.textInputStyle}
                                onChangeText={(text) => setReasonCall(text)}
                                value={isReasonCall}
                            />
                        </View>
                    </View>

                    <View style={{ alignItems: "center" }}>
                        <Pressable style={styles.button} onPress={() => AddTicketPress()}>
                            <Text style={styles.text}>+ Add Ticket</Text>
                        </Pressable>
                    </View>
                </View>

            </View>


        </ScrollView>
    );
};

const styles = StyleSheet.create({
    containerOne: { flex: 1, backgroundColor: "#f9f9f9" },
    containerTwo: { flex: 1, backgroundColor: "#f9f9f9", height: height, justifyContent: "center", alignItems: "center" },
    subContainerTwo: { borderColor: "#3dcb01", borderRadius: 4, borderWidth: 1, padding: 20 },
    dateTxt: {
        fontSize: 14,
        fontWeight: "normal",
        fontStyle: "normal",
        marginLeft: 5,
        letterSpacing: 0,
        color: "#494949",
        alignSelf: "center",
    },
    textInputStyle: {
        borderRadius: 5,
        borderWidth: 1,
        borderColor: "#3dcb01",
        height: 40,
        width: 180,
        margin: 1,
        padding: 10,
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: '#3dcb01',
        height: 40,
        width: 180,
        margin: 5,

    },
    text: {
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
    },
    textTitleStyle: {
        fontSize: 13,
        fontWeight: "bold",
        fontStyle: "normal",
        color: "#3f3f3f",
    },

})
export default AddTicket