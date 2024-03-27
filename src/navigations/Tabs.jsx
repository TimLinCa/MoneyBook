import React from 'react'; // Import the 'React' module
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SettingPage from '@pages/SettingPage';
import Analysis from '@pages/Analysis';
import AccountPage from '@pages/AccountPage';
import HomePage from '@pages/HomePage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AccountNav from './AccountNav';
import { COLORS } from '@styles';


function TabBarIcon({ focused, color, size, route }) {
    let iconName;

    if (route.name === 'Summary') {
        iconName = focused ? 'wallet' : 'wallet-outline';
    } else if (route.name === 'Account') {
        iconName = focused ? 'bank' : 'bank-outline';
    }
    else if (route.name === 'Analysis') {
        iconName = focused ? 'equalizer' : 'equalizer-outline';
    }
    else if (route.name === 'Settings') {
        iconName = focused ? 'cog' : 'cog-outline';
    }
    // You can return any component that you like here!
    return <Icon name={iconName} size={size} color={color} />;
}

function Tabs() {
    const Tab = createBottomTabNavigator();

    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: (props) => <TabBarIcon {...props} route={route} />,
                tabBarActiveTintColor: COLORS.navyBlue,
                tabBarInactiveTintColor: 'gray',
                headerShown: false,
            })}
        >
            <Tab.Screen name="Summary" component={HomePage} />
            <Tab.Screen name="Account" component={AccountNav} />
            <Tab.Screen name="Analysis" component={Analysis} />
            <Tab.Screen name="Settings" component={SettingPage} />
        </Tab.Navigator>
    );
}


export default Tabs;
