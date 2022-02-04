import { createStackNavigator } from "@react-navigation/stack"
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from "../screens/login"
import ForgotPass from "../screens/login/forgotPass"

const Stack = createStackNavigator()

const Auth = () => {
    return (
        <Stack.Navigator screenOptions={{ orientation: "all" }} initialRouteName='Login'>
            <Stack.Screen name='Login' component={Login} options={{ headerShown: false }} />
            <Stack.Screen name='ForgotPass' component={ForgotPass} options={{ headerShown: false }} />
        </Stack.Navigator>
    )
}

export default Auth