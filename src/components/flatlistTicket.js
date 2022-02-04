import React from 'react';
import { View, FlatList, Text, Pressable, StyleSheet } from 'react-native'
export default function FlatlistTicket(props) {

    const { item, pressViewTicket } = props
    const viewTicketPress = (tiketno) => {
        pressViewTicket(tiketno)
    }
    return (
        <View>
            <FlatList
                refreshing={true}
                data={item}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) =>

                    <View key={item.student_id} style={{ flexDirection: 'row', backgroundColor: "#e9e9e9", padding: 10, margin: 2 }}>
                        <View style={{ justifyContent: "center" }}>
                            <View style={{ marginRight: 10 }}>
                                <Text style={styles.itemsStyle}> {item.datetime}</Text>
                                <Text style={styles.itemsStyle}> Ticket  #{item.ticketNo}</Text>
                            </View>
                        </View>
                        <View style={{ width: 2, backgroundColor: "#c9c9c9", marginRight: 10, }}></View>
                        <View style={{ flex: 1, justifyContent: "center" }}>
                            <Text style={styles.itemsStyle}> {item.dept_class} </Text>
                            <Text style={styles.itemsStyle}>  {item.address} </Text>
                        </View>
                        <View style={{ flex: 1, justifyContent: "center", alignItems: "flex-end" }}>
                            <Pressable style={{ ...styles.button, backgroundColor: "#3dcb01", padding: 10 }} onPress={() => viewTicketPress(item.ticketNo)}>
                                <Text style={{ ...styles.text, color: "white" }}>View Ticket</Text>
                            </Pressable>
                        </View>
                    </View>
                }
            />
        </View>
    )
}

const styles = StyleSheet.create({
    itemsStyle: {
        fontSize: 10,
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
    }
})