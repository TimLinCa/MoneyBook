import React, { useEffect } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { COLORS, SIZES, FONTS } from '@styles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
function AccountBar({ accountType, accountName, accountBalance }) {
    const [iconName, setIconName] = React.useState('bank');
    const [balance, setBalance] = React.useState(0);
    useEffect(() => {
        if (accountType === 'bank') {
            setIconName('bank');
        }
        else if (accountType === 'credit') {
            setIconName('credit-card-outline');
        }
        else if (accountType === 'wallet') {
            setIconName('wallet');
        }
    }, [accountType]);

    useEffect(() => {
        setBalance(accountBalance);
    }, [accountBalance]);

    return (
        <View style={styles.container}>
            <Icon style={styles.icon} size={25} name={iconName} />
            <Text style={styles.BarText}>{accountName}</Text>
            <Text style={styles.balanceText}>$ {balance}</Text>
        </View>
    );

}

export default AccountBar;

const styles = StyleSheet.create({

    container:
    {
        backgroundColor: COLORS.white,
        shadowColor: '#000000',
        shadowOpacity: 0.8,
        shadowRadius: 4,
        shadowOffset: {
            height: 2,
            width: 2,
        },
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
    }
});
