import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AccountPage from '@pages/AccountPage';
import TransactionPage from '@pages/TransactionPage';

function AccountNav() {
    const Stack = createNativeStackNavigator();
    return (
        <Stack.Navigator screenOptions={{
            headerShown: false,
        }}>
            <Stack.Screen name="AccountMain" component={AccountPage} />
            <Stack.Screen name="AccountInfo" component={TransactionPage} />
        </Stack.Navigator>
    );
}


export default AccountNav;
