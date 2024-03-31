import React, { useEffect } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { COLORS, SIZES, FONTS } from '@styles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


function AccountBar({ navigation, bankName, accountInfo }) {
    const [iconName, setIconName] = React.useState('bank');
    const [accountBalance, setAccountBalance] = React.useState(0);
    const [accountName, setAccountName] = React.useState('');
    const [currency, setCurrency] = React.useState('$');
    const [accountId, setAccountId] = React.useState(0);
    const { id, type, name, accountMask, balance, currencyCode } = accountInfo;

    const barOnPress = () => {
        navigation.navigate('AccountInfo', { institutionName: { bankName }, accountInfoName: { accountName }, accountBalance: { accountBalance }, accountId: { accountId } });
    };

    const getBalanceTextStyle = () => {
        if (balance === 0) {
            return styles.balanceTextLightGray;
        }
        if (type === 'depository') {
            if (balance > 0) {
                return styles.balanceTextGreen;
            }
            else {
                return styles.balanceTextRed;
            }
        }

        if (type === 'credit') {
            if (balance < 0) {
                return styles.balanceTextGreen;
            }
            else {
                return styles.balanceTextRed;
            }
        }


    };

    useEffect(() => {
        if (type === 'depository') {
            setIconName('bank');
        }
        else if (type === 'credit') {
            setIconName('credit-card-outline');
        }
        else if (type === 'loan') {
            setIconName('checkbook');
        }
        else if (type === 'wallet') {
            setIconName('wallet');
        }
    }, [type]);

    useEffect(() => {
        if (balance === undefined) { setAccountBalance(0); }
        else {
            setAccountBalance(balance);
        }

        setAccountName(name + '(' + accountMask + ')');
        setAccountId(id);
        currencyCode === 'CAD' ? setCurrency('$') : setCurrency(currencyCode);
    }, [balance, name, accountMask, currencyCode, id]);

    return (
        <TouchableOpacity onPress={barOnPress} style={styles.container}>
            <Icon style={styles.icon} size={25} name={iconName} />
            <Text style={styles.BarText}>{accountName}</Text>
            <Text style={getBalanceTextStyle()}>{currency === 'CAD' ? '$ ' : currency + ' '}{balance.toLocaleString()}</Text>
        </TouchableOpacity>
    );

}

export default AccountBar;

const styles = StyleSheet.create({

    container:
    {
        backgroundColor: COLORS.white,

        borderRadius: 10,
        flexDirection: 'row',
        padding: SIZES.padding,
        marginBottom: SIZES.padding,
        borderWidth: 1,
        borderColor: COLORS.lightGray,
        marginRight: SIZES.padding,
        marginLeft: SIZES.padding,

    },
    icon: {
        color: COLORS.black,
    },
    BarText: {
        fontSize: SIZES.body3,
        marginLeft: SIZES.padding,
        alignSelf: 'center',
        color: COLORS.black,
    },
    balanceTextGreen:
    {
        flex: 2,
        fontSize: SIZES.body3,
        marginLeft: SIZES.padding,
        alignSelf: 'center',
        color: COLORS.green,
        position: 'absolute',
        right: 0,
        marginRight: SIZES.padding,
    },
    balanceTextRed:
    {
        flex: 2,
        fontSize: SIZES.body3,
        marginLeft: SIZES.padding,
        alignSelf: 'center',
        color: COLORS.red,
        position: 'absolute',
        right: 0,
        marginRight: SIZES.padding,
    },
    balanceTextLightGray:
    {
        flex: 2,
        fontSize: SIZES.body3,
        marginLeft: SIZES.padding,
        alignSelf: 'center',
        color: COLORS.lightGray,
        position: 'absolute',
        right: 0,
        marginRight: SIZES.padding,
    },
});
