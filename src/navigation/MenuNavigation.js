import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer'
import Dashboard from '../screens/dashboard';
import Overview from '../screens/tabBar/overView';
import WorkDetails from '../screens/tabBar/workDetails';
import Purchasing from '../screens/tabBar/Purchasing';
import FinishingUp from '../screens/tabBar/finishingUp';
import Camera from '../screens/tabBar/camera';
import Directions from '../screens/directions';
import { Feather } from 'react-native-vector-icons'
import AddTicket from '../screens/ticket/addTicket';

const Stack = createNativeStackNavigator()
const Tab = createBottomTabNavigator()
const Drawer = createDrawerNavigator();
const BottomTab = () => {
    return (
        <Tab.Navigator initialRouteName='Overview' screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color }) => {
                if (route.name === 'Camera') {
                    color = focused ? '#3dcb01' : '#b4b4b4'
                    return (<Feather name='camera' color={color} size={25} />)
                }
            },
            tabBarActiveTintColor: "white",
            headerShown: false,
            tabBarActiveBackgroundColor: "#52f50dc7",
            tabBarInactiveBackgroundColor: "#e9e9e9"
        })} >
            <Tab.Screen name="Overview " >
                {() => (<Stack.Navigator screenOptions={{ orientation: "all" }} initialRouteName='OverviewStack'>
                    <Stack.Screen name='OverviewStack' component={Overview} options={{ headerShown: false }} />
                    <Stack.Screen name='Directions' component={Directions} options={{ headerShown: false }} />
                </Stack.Navigator>)}
            </Tab.Screen>
            <Tab.Screen name="WorkDetails" component={WorkDetails} />
            <Tab.Screen name="Purchasing" component={Purchasing} />
            <Tab.Screen name="FinishingUp" component={FinishingUp} />
            <Tab.Screen name="Camera" component={Camera} options={{ tabBarLabel: "" }} />
        </Tab.Navigator>
    )
}

function MenuNavigation() {
    return (
        <Stack.Navigator screenOptions={{ orientation: "all" }} initialRouteName='Dashboard'>
            <Stack.Screen name='Dashboard' component={Dashboard} options={{ headerShown: false }} />
            <Stack.Screen name='BottomTab' component={BottomTab} options={{ headerShown: false }} />
            <Stack.Screen name='AddTicket' component={AddTicket} options={{ headerShown: false }} />

        </Stack.Navigator>
    )

}
export default MenuNavigation;