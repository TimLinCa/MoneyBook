import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { COLORS, SIZES } from '@styles';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState, useEffect } from 'react';
import { DeleteInstitutionInfo, UpdateAccountBalance, GetTransactionCursor, GetInstitutionToken, AddInstitutionToken, AsyncInstitutionAccountInfo, GetInstitutionNameList, GetLocalInstitutionAccountInfo, Test, UpdateTransactionInfo } from '../store/mmkv';
import AccountCard from '@components/account/AccountCard';
import RNPickerSelect from 'react-native-picker-select';
import { PlaidLink } from 'react-native-plaid-link-sdk';
import { Button } from '@rneui/base';
import axios from 'axios';
import { IP_ADDRESS } from '@env';
const address = IP_ADDRESS;
axios.defaults.baseURL = `http://${address}:3005`;
//This page will show the user's account information and allow them to add or remove accounts.
function AccountPage({ navigation }) {
    const [linkToken, setLinkToken] = useState(null);
    const [accountInfos, setAccountInfos] = useState([]);
    const [institutionNameList, setInstitutionNameList] = useState([]);
    const [unlinkModalVisible, setUnlinkModalVisible] = useState(false);
    const [selectedUnlinkedInstitutionName, setSelectedUnlinkedInstitutionName] = useState(null);

    async function fetchLinkToken() {
        const res = await axios.post('/api/create_link_token');
        setLinkToken(res.data.link_token);
    }

    const handelUnlinkInstitution = async () => {
        if (selectedUnlinkedInstitutionName != null) {
            DeleteInstitutionInfo(selectedUnlinkedInstitutionName.value);
        }
        setInstitutionNameList(GetInstitutionNameList());
        setUnlinkModalVisible(false);
    };

    const unlinkButtonClick = () => {
        setSelectedUnlinkedInstitutionName(null);
        setUnlinkModalVisible(true);
    };

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
    }, [navigation, unlinkModalVisible]);

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
            {UnLinkAccountWindow(unlinkModalVisible, setUnlinkModalVisible, setSelectedUnlinkedInstitutionName, handelUnlinkInstitution, institutionNameList)}
            {RenderHeader(linkToken, setInstitutionNameList, unlinkButtonClick)}
            {RenderAccountInfo(navigation, accountInfos, asyncAccount)}

        </SafeAreaView>
    );
}

export default AccountPage;

function RenderHeader(linkToken, setInstitutionNameList, unlinkButtonClick) {
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
            <TouchableOpacity style={styles.unlinkAccountButton} onPress={() => unlinkButtonClick()}>
                <Icon name="link-off" size={30} color={COLORS.white} />
            </TouchableOpacity>
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
                            const authRes = await axios.post('/async_balance', { access_token: accessTokenRes.data.access_token });
                            UpdateAccountBalance(institutionName, authRes);
                            let cursor = null;
                            let hasMore = true;
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

function UnLinkAccountWindow(unlinkModalVisible, setUnlinkModalVisible, setSelectedUnlinkedInstitutionName, handelUnlinkInstitution, institutionNameList) {
    return (

        <Modal
            animationType="fade"
            transparent={true}
            visible={unlinkModalVisible}
            onRequestClose={() => setUnlinkModalVisible(false)}>
            <View style={styles.modalContainer}>
                {/* Dark overlay */}
                <TouchableOpacity
                    style={styles.overlay}
                    onPress={() => setUnlinkModalVisible(false)}
                />

                {/* Modal content */}
                <View style={styles.modalView}>
                    <View style={styles.editHeader}>
                        <Text style={styles.ModalHeaderTitle}>Unlink Institution</Text>
                    </View>
                    <View style={styles.ModalSelector}>
                        <RNPickerSelect
                            placeholder={{ label: 'Select Institution', value: null }}
                            onValueChange={value =>
                                setSelectedUnlinkedInstitutionName({ value })
                            }
                            items={
                                institutionNameList.map((institutionName) => {
                                    return { label: institutionName, value: institutionName };
                                })
                            }
                        />

                        <View style={styles.ModalButtonContainer}>
                            <TouchableOpacity style={styles.ModalButton} onPress={() => handelUnlinkInstitution()}>
                                <Text style={{ color: COLORS.green }}>Unlink</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.ModalButton} onPress={() => setUnlinkModalVisible(false)}>
                                <Text>Cancel</Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                    {/* Replace TextInput for budget item name with RNPickerSelect */}


                </View>
            </View>
        </Modal>
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
    unlinkAccountButton: {
        alignSelf: 'center',
        alignItems: 'flex-end',
        marginRight: SIZES.padding,
        position: 'absolute',
        right: 40,
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
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent black background
    },
    overlay: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
    },
    modalView: {
        backgroundColor: 'white',
        borderRadius: 10,
        width: '80%',

    },
    modalHeaderContainer: {
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
    modalHeaderText: {
        color: COLORS.white,
        fontSize: SIZES.h2,
        alignSelf: 'center',
        marginLeft: SIZES.padding,
    },
    editHeader: {
        width: '100%',
        height: SIZES.height * 0.04,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,
        elevation: 7,
        backgroundColor: COLORS.navyBlue,
        borderTopEndRadius: 10,
        borderTopStartRadius: 10,
        justifyContent: 'center',
    },
    ModalHeaderTitle: {
        fontSize: SIZES.h3,
        color: COLORS.white,
        alignSelf: 'center',
        textAlign: 'center',
    },
    ModalButtonContainer: {
        flexDirection: 'row',
    },
    ModalSelector: {
        paddingBottom: 20, paddingLeft: 20, paddingRight: 20,
    },

    ModalButton: {
        flex: 0, width: '50%', alignItems: 'center',
    },
});
