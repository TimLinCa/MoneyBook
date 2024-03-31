import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { COLORS, SIZES } from '@styles';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState, useEffect } from 'react';
import { GetTransactionHistoryByAccountId } from '@store/mmkv';
import TransactionBar from '@components/account/TransactionBar';



function TransactionPage({ route, navigation }) {

    const [accountName, setAccountName] = useState(route['params'].accountInfoName['accountName']);
    const [accountBalance, setAccountBalance] = useState(route['params'].accountBalance['accountBalance']);
    const [transactionHistoryList, setTransactionHistoryList] = useState([]);
    const returnToAccountPage = () => {
        navigation.navigate('AccountMain');
    };


    useEffect(() => {
        setAccountName(route['params'].accountInfoName['accountName']);
        setAccountBalance(route['params'].accountBalance['accountBalance']);
        setTransactionHistoryList(GetTransactionHistoryByAccountId(route['params'].institutionName['bankName'],
            route['params'].accountId['accountId']));

    }, [route]);

    return (
        <SafeAreaView>
            {RenderHeader(accountName, accountBalance, returnToAccountPage)}
            {RenderTransactionBars(transactionHistoryList)}
        </SafeAreaView>
    );
}

export default TransactionPage;

function RenderHeader(accountName, accountBalance, returnToAccountPage) {
    return (
        <View style={styles.headerContainer}>
            <View style={styles.accountNmeContainer}>
                <Text style={styles.accountName}>{accountName}</Text>
                <TouchableOpacity onPress={() => returnToAccountPage()} style={styles.returnIcon}>
                    <Icon name="arrow-left" size={25} color={COLORS.white} />
                </TouchableOpacity>
            </View>
            <View style={styles.balanceSpace}>
                <Text style={styles.balanceText}>${accountBalance.toLocaleString()}</Text>
            </View>

        </View >
    );
}

function RenderTransactionBars(transactionHistory) {
    return (
        <ScrollView style={styles.barContainer}>
            {
                transactionHistory.map((transaction, index) => {
                    return (
                        <TransactionBar
                            key={index}
                            Date={transaction.date}
                            TransactionName={transaction.name}
                            Amount={transaction.amount}
                        />
                    );
                })
            }
        </ScrollView>);
};


const styles = StyleSheet.create({
    headerContainer: {
        width: '100%',
        height: SIZES.height * 0.16,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,
        elevation: 7,
        backgroundColor: COLORS.navyBlue,
    },

    accountNmeContainer: {
        width: '100%',
        flexDirection: 'row',
        marginTop: SIZES.padding,

    },
    returnIcon: {
        marginLeft: SIZES.padding,
        marginTop: SIZES.padding,
        alignSelf: 'center',
        position: 'absolute',
        left: 0,
        flex: 0,
    },
    accountName: {
        color: COLORS.white,
        fontSize: SIZES.h3,
        alignSelf: 'center',
        alignContent: 'center',
        flex: 1,
        textAlign: 'center',
    },
    balanceSpace: {
        backgroundColor: COLORS.white,
        height: SIZES.height * 0.08,
        alignSelf: 'stretch',
        marginTop: SIZES.padding * 2,
        borderRadius: 10,
        marginLeft: SIZES.padding,
        marginRight: SIZES.padding,
        justifyContent: 'center',
    },
    balanceText: {
        color: COLORS.black,
        fontSize: SIZES.h1,
        alignSelf: 'center',
        textAlign: 'center',
        verticalAlign: 'middle',
    },
    barContainer: {
        marginBottom: SIZES.height * 0.15,
    },
});
