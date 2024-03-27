import React, { useEffect } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { COLORS, SIZES, FONTS } from '@styles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


function AccountBar({ navigation, id, accountType, accountName, accountBalance, bankName }) {
    const [iconName, setIconName] = React.useState('bank');
    const [balance, setBalance] = React.useState(0);
    const barOnPress = () => {
        navigation.navigate('AccountInfo', { institutionName: { bankName }, accountInfoName: { accountName }, accountBalance: { accountBalance }, accountId: { id } });

    };
    useEffect(() => {
        if (accountType === 'depository') {
            setIconName('bank');
        }
        else if (accountType === 'credit') {
            setIconName('credit-card-outline');
        }
        else if (accountType === 'loan') {
            setIconName('invoice-text-clock');
        }
        else if (accountType === 'wallet') {
            setIconName('wallet');
        }
    }, [accountType]);

    useEffect(() => {
        setBalance(accountBalance);
    }, [accountBalance]);

    return (
        <TouchableOpacity onPress={barOnPress} style={styles.container}>
            <Icon style={styles.icon} size={25} name={iconName} />
            <Text style={styles.BarText}>{accountName}</Text>
            <Text style={styles.balanceText}>$ {balance.toLocaleString()}</Text>
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
    balanceText:
    {
        flex: 2,
        fontSize: SIZES.body3,
        marginLeft: SIZES.padding,
        alignSelf: 'center',
        color: COLORS.black,
        position: 'absolute',
        right: 0,
        marginRight: SIZES.padding,
    },
});
