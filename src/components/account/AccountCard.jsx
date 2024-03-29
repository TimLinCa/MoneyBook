import React, { useEffect } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { COLORS, SIZES, FONTS } from '@styles';
import { Card } from '@rneui/themed';
import { Button } from '@rneui/themed';
import AccountBar from './AccountBar';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { GetInstitutionIconUrl } from '@store/mmkv';
import CIBCIcon from '@images/CIBCLogo.png';
import ScotiaIcon from '@images/Scotiabank-logo.png';
import RBCIcon from '@images/RBC-logo.png';
import TDIcon from '@images/TD-logo.png';
import BMOIcon from '@images/BMO-logo.png';
import NBCIcon from '@images/NBC-logo.png';
function getIconSource(bankName) {
    let iconSource = '';
    switch (bankName) {
        case 'CIBC':
            iconSource = CIBCIcon;
            break;
        case 'Scotiabank':
            iconSource = ScotiaIcon;
            break;
        case 'RBC Loyal Bank':
            iconSource = RBCIcon;
            break;
        case 'TD Canada Trust':
            iconSource = TDIcon;
            break;
        case 'BMO Bank of Montreal':
            iconSource = BMOIcon;
            break;
        case 'National Bank of Canada':
            iconSource = NBCIcon;
            break;
    }
    return iconSource;
}

function AccountCard({ navigation, bankName, accountInfo }) {
    const [iconImgName, setIconImgName] = React.useState('');
    const [name, setName] = React.useState('BankName');
    useEffect(() => {
        setName(bankName);
        setIconImgName(getIconSource(bankName));
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
            {
                accountInfo != null ? accountInfo.map((account, index) => {
                    return (
                        <AccountBar key={account.id} navigation={navigation} id={account.id} bankName={bankName} accountType={account.type} accountName={account.name + '(' + account.accountMask + ')'} accountBalance={account.balance} />
                    );
                }) : <View />
            }
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
        marginBottom: SIZES.padding,
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
