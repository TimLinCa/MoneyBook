import React, { useEffect } from 'react';
import * as Progress from 'react-native-progress';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS, SIZES, FONTS } from '@styles';

const getBackgroundColor = (percentage) => {
    let value = percentage * 100;
    let color;
    if (value === 0) {
        color = '';
    } else if (value >= 1 && value < 50) {
        color = COLORS.green;
    } else if (value >= 50 && value < 90) {
        color = '#ffb641';
    } else if (value >= 90) {
        color = 'red';
    }
    return color;
};


function MainBudget({ name, max, min, value, barWidth }) {
    const [percentage, SetPercentage] = React.useState(0);
    useEffect(() => {
        let percentageValue = ((value - min) / (max - min));
        SetPercentage(percentageValue);
    }, [value, max, min]);

    return (
        <View style={styles.container}>
            <Text style={styles.barLabel} >{name}</Text>
            <View style={styles.inner}>
                <Progress.Bar height={25} borderRadius={10} progress={percentage} color={getBackgroundColor(percentage)} width={barWidth} borderColor={COLORS.lightGray} />
                <Text style={styles.label}>{value}/{max}</Text>
            </View>
        </View>

    );
}

const styles = StyleSheet.create({
    barLabel: {
        color: COLORS.black,
        fontSize: SIZES.h3,
        alignSelf: 'center',
        marginRight: 10,
        width: SIZES.width * 0.2,
    },
    container: {
        flexDirection: 'row',
        marginBottom: SIZES.padding,
    },
    inner: {
        justifyContent: 'center',
    },
    label: {
        fontSize: SIZES.h3,
        color: 'black',
        position: 'absolute',
        zIndex: 1,
        alignSelf: 'center',
    }
});

export default MainBudget;