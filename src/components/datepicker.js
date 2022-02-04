
import moment from 'moment';
import Datepicker from '@react-native-community/datetimepicker'
import { StyleSheet, View } from 'react-native';

const ACMEDatePicker = (props) => {
    return (
        <View>
            <Datepicker
                mode="datetime"
                display='default'
                value={props.value}
                minimumDate={new Date()}
                locale='en'
                placeHolderText={moment().format("YYYY MMM DD")}
                textStyle={styles.dateTxt}
                onChange={props.onchange} />
        </View>

    )
}



const styles = StyleSheet.create(
    {
        dateTxt: {
            fontSize: 14,
            fontWeight: "normal",
            fontStyle: "normal",
            marginLeft: 5,
            letterSpacing: 0,
            color: "#494949",
            alignSelf: "center",
        },
    }
)



export default ACMEDatePicker
