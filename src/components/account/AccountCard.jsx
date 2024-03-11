import React, { useEffect } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { COLORS, SIZES, FONTS } from '@styles';
import { Card } from '@rneui/themed';
import { Button } from '@rneui/themed';
import AccountBar from './AccountBar';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import CIBCIcon from '@images/CIBCLogo.png';
function AccountCard({ bankName }) {

    const [iconImgName, setIconImgName] = React.useState(CIBCIcon);
    const [name, setName] = React.useState('BankName');
    useEffect(() => {
        setName(bankName);
        if (bankName === 'CIBC') {
            setIconImgName(CIBCIcon);
        }
    }, [bankName]);


    return (
        <View style={styles.container}>
            <View style={styles.cardTitle}>
                <Image source={iconImgName} style={styles.Logo} />
                <Text style={styles.bankName}>{name}</Text>
                <View style={styles.asyncButton}>
                    <Button buttonStyle={{ flexDirection: 'row', borderRadius: 15 }} color={COLORS.darkYellow}>
                        <Icon style={styles.buttonIcon} name="rotate-3d-variant" size={20} color={COLORS.white} />
                        <Text style={styles.buttonText}>Async</Text>
                    </Button>
                </View>
            </View>
            <View style={styles.cardBar} />
            <AccountBar accountType='bank' accountName='Chequing(123***888)' accountBalance={20000} />
            <AccountBar accountType='credit' accountName='Credit Card(123***888)' accountBalance={-5000} />
        </View>

    );
}

const styles = StyleSheet.create({
    cardBar: {
        backgroundColor: COLORS.lightGray,
        height: 1,
        marginLeft: SIZES.padding * 1.5,
        marginRight: SIZES.padding * 1.5,
        marginBottom: SIZES.padding,
    },
    buttonIcon: {
        flex: 1,
    },
    buttonText: {
        flex: 2,
        fontWeight: 'bold',
        color: COLORS.white,
        fontSize: SIZES.body3,
    },
    cardTitle: {
        flexDirection: 'row',
        padding: SIZES.padding,
    },
    icon: {
        marginLeft: SIZES.padding,
        alignSelf: 'center',
        marginRight: SIZES.padding,
    },
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
        borderRadius: 20,
    },
    bankName: {
        fontSize: SIZES.h2,
        alignSelf: 'center',
        color: COLORS.black,
    },
    asyncButton: {
        position: 'absolute',
        right: 0,
        marginRight: SIZES.padding,
        alignSelf: 'center',
    },
    Logo:
    {
        resizeMode: 'contain',
        height: 35,
        width: 35,
        marginRight: SIZES.padding,
    },

});


export default AccountCard;

