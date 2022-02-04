import React, { useEffect, useState } from 'react';
import { Alert, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { openDatabase } from 'expo-sqlite'
const db = openDatabase('Users.db')

const Login = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        createTable();
        getUsers();
    }, [])

    const createTable = () => {
        db.transaction(tx => {
            tx.executeSql(
                "CREATE TABLE IF NOT EXISTS Users (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT, password TEXT, flag BOOLEAN)"
            )
        })
    }
    const getUsers = () => {
        try {
            db.transaction((tx) => {
                tx.executeSql(
                    "SELECT username, password FROM Users",
                    [],
                    (tx, results) => {
                        let len = results.rows.length;
                        if (len > 0) {
                            navigation.navigate("MenuNavigation")
                        }
                    }
                )
            })
        } catch (error) {
            console.log(error);
        }
    }
    const onPress = () => {
        if (username.length === 0 || password.length === 0) {
            Alert.alert("Warning!", 'Please input your data.')
        } else {
            db.transaction((tx) => {
                tx.executeSql(
                    "INSERT INTO Users (username,password,flag) VALUES (?,?,?)",
                    [username, password, true], (txtobj, resultSet) => navigation.replace("MenuNavigation"),
                    (txObj, error) => console.log('Error', error)
                )
            })
        }
    }
    const forgotPass = () => {
        Alert.alert("Not available at this time")
    }
    return (
        <View style={{ flex: 1, backgroundColor: "#f9f9f9" }}>
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <View>
                    <Text style={styles.textTitleStyle}>
                        ACME
                    </Text>
                </View>
                <View>
                    <TextInput
                        placeholder='Username'
                        keyboardType='email-address'
                        onChangeText={(text) => setUsername(text)}
                        style={styles.textInputStyle}

                    />
                </View>
                <View>
                    <TextInput
                        placeholder='Password'
                        secureTextEntry={true}
                        onChangeText={(text) => setPassword(text)}
                        style={styles.textInputStyle}
                    />
                </View>

                <View>
                    <Pressable style={styles.button} onPress={onPress}>
                        <Text style={styles.text}>Login</Text>
                    </Pressable>
                </View>
                <TouchableOpacity style={{ width: 180, alignItems: "flex-end", marginTop: 10 }} onPress={() => forgotPass()}>
                    <Text style={styles.forgot_button}>Forgot Password?</Text>
                </TouchableOpacity>


            </View>

        </View>

    );
};

const styles = StyleSheet.create({
    forgot_button: {
        height: 30,
        fontSize: 10
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

        fontSize: 30,
        fontWeight: "bold",
        fontStyle: "normal",
        letterSpacing: 10,
        textAlign: "center",
        color: "#3f3f3f",

    },
    textInputStyle: {
        borderRadius: 5,
        borderWidth: 1,
        borderColor: "#3dcb01",
        height: 40,
        width: 180,
        margin: 5,
        padding: 10,
    },
})
export default Login