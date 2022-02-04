import React from 'react';
import { View, Text, Pressable, StyleSheet, Dimensions, StatusBar } from 'react-native'
import { Ionicons, Entypo } from 'react-native-vector-icons'
const Header = (props, { navigation }) => {
    return (
        <View style={styles.container}>
            <View >
                <Pressable style={styles.button} onPress={props.press}>
                    <Ionicons name="arrow-back" size={20} color="#3dcb01" />
                    <Text style={styles.text}>{props.first}</Text>
                </Pressable>
            </View>
            <View>
                <Text style={styles.textTitleStyle}>
                    {props.second}
                </Text>
            </View>
            <View>
                <Pressable style={styles.button} onPress={props.pressThird}>
                    {props.flag && <Entypo name="menu" size={20} color="#3dcb01" />}
                    <Text style={styles.text}>
                        {props.third}
                    </Text>
                </Pressable>

            </View>
        </View>
    )

}
const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        height: 80,
        backgroundColor: "#f2f2f2",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 10
    },
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

})
export default Header