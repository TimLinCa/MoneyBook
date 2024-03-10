import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS, SIZES, FONTS } from '@styles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import { SafeAreaView } from 'react-native-safe-area-context';
function MainDebt() {
    const { debt, setdebt } = React.useState(0);
    const { creditCard, setcreditCard } = React.useState(0);
    return (
        <SafeAreaView style={styles.safeView}>
            <View style={styles.assetView}>
                <View style={styles.viewStart}>
                    <FontAwesome6 name='file-invoice-dollar' size={30} color={COLORS.black} />
                </View>
                <View style={styles.viewEnd}>
                    <Text style={styles.currentTextH1}>$ {debt}</Text>
                </View>
            </View>

            <View style={{ backgroundColor: COLORS.white, marginTop: SIZES.padding * 1.5 }}>
                <View style={styles.summaryView}>
                    <View style={styles.currencyLabelTextContainer}>
                        <Text style={styles.currencyLabelText}>Credit Card</Text>
                    </View>
                    <View style={styles.currentTextContainer} >
                        <Text style={styles.currentText}>$ {creditCard}</Text>
                    </View>
                </View>
            </View>
        </SafeAreaView >
    );
}

const styles = StyleSheet.create({
    safeView: {
        backgroundColor: COLORS.white,
        height: '100%'
    },
    assetView: {
        marginTop: SIZES.padding,
        paddingBottom: SIZES.padding,
        backgroundColor: COLORS.white,
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderColor: COLORS.lightGray,
    },
    viewStart: {
        flex: 1,
        alignItems: 'flex-start'
    },
    viewEnd: {
        flex: 2,
        alignItems: 'flex-end'
    },
    summaryView: {
        flexDirection: 'row',
        borderColor: COLORS.white,
        marginBottom: SIZES.padding * 1.5,
    },
    currencyLabelText: {
        verticalAlign: 'middle',
        color: COLORS.black,
        fontSize: SIZES.h3,
    },
    currentTextH1: {
        color: COLORS.red,
        fontWeight: 'bold',
        fontSize: SIZES.h1,
    },
    currentText: {
        color: COLORS.red,
        fontSize: SIZES.h3,
    },
    currencyLabelTextContainer: {
        flex: 1,
        alignItems: 'flex-start',
        verticalAlign: 'middle',
        alignSelf: 'center'
    },
    currentTextContainer: {
        flex: 2,
        alignItems: 'flex-end'
    }

});

export default MainDebt;
