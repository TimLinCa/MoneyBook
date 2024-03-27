import React, { useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';

import { Button } from '@rneui/themed';
import { useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { COLORS, SIZES, FONTS } from '@styles';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AccountPage from '@pages/AccountPage';
import TransactionPage from '@pages/TransactionPage';
import MainAsset from '@components/main/MainAsset';
import MainDebt from '@components/main/MainDebt';
import MainBudget from '@components/main/MainBudget';
import { SafeAreaView } from 'react-native-safe-area-context';

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
