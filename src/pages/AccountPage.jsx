import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { COLORS, SIZES } from '@styles';
import { SafeAreaView } from 'react-native-safe-area-context';
import AccountCard from '@components/account/AccountCard';
//This page will show the user's account information and allow them to add or remove accounts.
function renderheader() {
    return (
        <View
            style={
                styles.headerContainer
            }>
            <Text style={styles.headerText}>Account</Text>
            <TouchableOpacity style={styles.addAccountButton}>
                <Icon name="plus" size={30} color={COLORS.white} />
            </TouchableOpacity>

        </View >
    );
}

function renderAccountInfo() {
    return (

        <ScrollView style={styles.accountContainer}>
            <AccountCard bankName='CIBC' />
        </ScrollView>
    );
}

function AccountPage() {
    return (
        <SafeAreaView>
            {renderheader()}
            {renderAccountInfo()}
        </SafeAreaView>
    );
}

export default AccountPage;


const styles = StyleSheet.create({
    headerContainer: {
        width: '100%',
        height: SIZES.height * 0.06,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,
        elevation: 7,
        backgroundColor: COLORS.navyBlue,
        flexDirection: 'row',
    },
    headerTouchableOpacity:
    {
        marginTop: SIZES.padding * 2,
        width: '100%',
        alighItems: 'flex-end',
        paddingHorizontal: 5,
    },
    headerText: {
        color: COLORS.white,
        fontSize: SIZES.h2,
        alignSelf: 'center',
        marginLeft: SIZES.padding,
    },
    addAccountButton: {
        alignSelf: 'center',
        alignItems: 'flex-end',
        marginRight: SIZES.padding,
        position: 'absolute',
        right: 0,
    },
    accountContainer: {
        margin: SIZES.padding,
    }
});