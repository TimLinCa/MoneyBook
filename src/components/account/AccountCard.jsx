import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { Card } from '@rneui/themed';
import { Button } from '@rneui/themed';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { COLORS, SIZES, FONTS } from '../../../styles/theme.js';
function AccountCard() {
    return (
        <View style={styles.container}>
            <View style={styles.cardTitle}>
                <Image style={{ height: 40, width: 40 }} />
                <Text style={styles.bankName}>BankName</Text>
                <View style={styles.asyncButton}>
                    <Button buttonStyle={{ flexDirection: 'row', borderRadius: 15 }} color={COLORS.darkYellow}>
                        <Icon style={{ flex: 1 }} name="rotate-3d-variant" size={20} color={COLORS.white} />
                        <Text style={{ flex: 2, fontWeight: 'bold', color: COLORS.white, fontSize: SIZES.body3 }}>Async</Text>
                    </Button>
                </View>

            </View>
        </View>

    );
}

const styles = StyleSheet.create({
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

    },
    asyncButton: {
        position: 'absolute',
        right: 0,
        marginRight: SIZES.padding,
        alignSelf: 'center',
    }

});


export default AccountCard;

