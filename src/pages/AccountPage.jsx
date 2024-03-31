import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { COLORS, SIZES } from '@styles';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState, useEffect } from 'react';
import { UpdateAccountBalance, GetTransactionCursor, GetInstitutionToken, AddInstitutionToken, AsyncInstitutionAccountInfo, GetInstitutionNameList, GetLocalInstitutionAccountInfo, Test, UpdateTransactionInfo } from '../store/mmkv';
import AccountCard from '@components/account/AccountCard';

import { PlaidLink } from 'react-native-plaid-link-sdk';
import { Button } from '@rneui/base';
import axios from 'axios';
const address = '10.0.0.153';
axios.defaults.baseURL = `http://${address}:3005`;
//This page will show the user's account information and allow them to add or remove accounts.


function AccountPage({ navigation }) {
    const [linkToken, setLinkToken] = useState(null);
    const [accountInfos, setAccountInfos] = useState([]);
    const [institutionNameList, setInstitutionNameList] = useState([]);
    async function fetchLinkToken() {
        const res = await axios.post('/api/create_link_token');
        setLinkToken(res.data.link_token);
    }

    const asyncAccount = async (institutionName) => {
        const accToken = GetInstitutionToken(institutionName);
        const authRes = await axios.post('/async_balance', { access_token: accToken });
        UpdateAccountBalance(institutionName, authRes);
        let hasMore = true;
        let cursor = GetTransactionCursor(institutionName);
        while (hasMore) {
            let asyncTransaction = await axios.post('/asyncTransactions', { access_token: accToken, cursor: cursor });
            UpdateTransactionInfo(institutionName, asyncTransaction.data.added, asyncTransaction.data.modified, asyncTransaction.data.removed, asyncTransaction.data.cursor);
            cursor = asyncTransaction.data.cursor;
            hasMore = asyncTransaction.data.has_more;
        }
        setInstitutionNameList(GetInstitutionNameList());
    };

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            fetchLinkToken();
            setInstitutionNameList(GetInstitutionNameList());
        });
        return unsubscribe;
    }, [navigation]);

    useEffect(() => {
        async function renderAccountInfo() {
            let accountInfoList = [];
            for (let i = 0; i < institutionNameList.length; i++) {
                let institutionName = institutionNameList[i];
                let institutionInfo = GetLocalInstitutionAccountInfo(institutionName);
                const accountInfo = {
                    institutionName: institutionName,
                    institutionInfo: institutionInfo,
                };
                accountInfoList.push(accountInfo);
            }
            setAccountInfos(accountInfoList);
        }

        renderAccountInfo();
    }, [institutionNameList]);

    return (
        <SafeAreaView>
            {RenderHeader(linkToken, setInstitutionNameList)}
            {RenderAccountInfo(navigation, accountInfos, asyncAccount)}
        </SafeAreaView>
    );
}

export default AccountPage;

function RenderHeader(linkToken, setInstitutionNameList) {
    const TestButtonFunction = async () => {
        Test();
        setInstitutionNameList(GetInstitutionNameList());
        //AddBudgetItem('FOOD_AND_DRINK', 3000);
        // console.log(getBudgetInfo(new Date().getFullYear(), new Date().getMonth() + 1));

    };
    return (
        <View
            style={
                styles.headerContainer
            }>
            <Text style={styles.headerText}>Account</Text>
            <Button onPress={TestButtonFunction}>Test1</Button>
            <View style={styles.addAccountButton}>
                <PlaidLink
                    tokenConfig={{
                        token: linkToken,
                        noLoadingState: false,
                    }}
                    onSuccess={async (success) => {
                        let institutionName = success.metadata.institution.name;
                        try {
                            let accessTokenRes = await axios.post('/exchange_public_token', { public_token: success.publicToken });
                            AddInstitutionToken(institutionName, accessTokenRes.data.access_token);
                            let authRes = await axios.post('/auth', { access_token: accessTokenRes.data.access_token });
                            AsyncInstitutionAccountInfo(institutionName, authRes.data);

                            let hasMore = true;
                            let cursor = null;
                            while (hasMore) {
                                let asyncTransaction = await axios.post('/asyncTransactions', { access_token: accessTokenRes.data.access_token, cursor: cursor });
                                UpdateTransactionInfo(institutionName, asyncTransaction.data.added, asyncTransaction.data.modified, asyncTransaction.data.removed, asyncTransaction.data.cursor);
                                cursor = asyncTransaction.data.cursor;
                                hasMore = asyncTransaction.data.has_more;
                            }
                            setInstitutionNameList(GetInstitutionNameList());
                        }
                        catch (e) {
                            console.log(e);
                        }
                    }}
                    onExit={(response) => {

                    }}>
                    <Icon name="plus" size={30} color={COLORS.white} />
                </PlaidLink>
            </View>



        </View >
    );
}

function RenderAccountInfo(navigation, accountInfos, asyncAccountMethod) {

    return (
        <ScrollView style={styles.accountContainer}>
            {accountInfos.map((accountInfo, index) => {
                return (
                    <AccountCard key={index} navigation={navigation} bankName={accountInfo.institutionName} accountInfo={accountInfo.institutionInfo} asyncAccountMethod={asyncAccountMethod} />
                );
            })}
        </ScrollView>
    );
}



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
        marginBottom: SIZES.padding * 4.5,
    }
});