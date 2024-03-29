import React, { useEffect } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { COLORS, SIZES, FONTS } from '@styles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


function TransactionBar({ Date, TransactionName, Amount }) {
    return (
        <View style={styles.container}>
            <Text style={styles.date}>{Date}</Text>
            <View style={styles.detailContainer}>
                <Text style={styles.detailText}>{TransactionName}</Text>
                <View style={styles.detailAmount}>
                    <Text style={styles.amountText}>${Amount.toLocaleString()}</Text>
                </View>

            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container:
    {
        shadowColor: '#000000',
        shadowOpacity: 0.8,
        shadowRadius: 4,
        shadowOffset: {
            height: 2,
            width: 2,
        },
        padding: SIZES.padding,
        marginBottom: SIZES.padding * 0.5,
        marginRight: SIZES.padding,
        marginLeft: SIZES.padding,
    },
    date:
    {
        fontSize: SIZES.body3,
        color: COLORS.black,
    },
    detailContainer:
    {
        marginTop: SIZES.padding,
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderColor: 'gray',
        paddingBottom: SIZES.padding,
    },
    detailText:
    {
        fontSize: SIZES.body3,
        alignSelf: 'center',
        color: COLORS.black,
        width: '75%',
    },
    detailAmount:
    {
        width: '25%',
    },
    amountText: {
        fontSize: SIZES.body3,
        color: COLORS.black,
        position: 'absolute',
        right: 0,
    }
});

export default TransactionBar;
