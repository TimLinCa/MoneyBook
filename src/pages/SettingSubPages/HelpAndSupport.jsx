import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Linking} from 'react-native';
import {COLORS, SIZES, FONTS} from '@styles';

function HelpAndSupport() {
  const handlePhonePress = () => {
    Linking.openURL('tel:+19999999999');
  };

  const handleEmailPress = () => {
    Linking.openURL('mailto:MoneyBook@gmail.com');
  };

  return (
    <View style={styles.box}>
      <TouchableOpacity onPress={handlePhonePress}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 10,
          }}>
          <Text style={styles.text}>Contact Number</Text>
          <Text style={styles.text}>+1 999-999-9999</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleEmailPress}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 10,
          }}>
          <Text style={styles.text}>Email</Text>
          <Text style={styles.text}>MoneyBook@gmail.com</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}
export default HelpAndSupport;

const styles = StyleSheet.create({
  box: {
    backgroundColor: '#ffffff',
    marginLeft: SIZES.padding,
    marginRight: SIZES.padding,
    padding: 10,
    borderRadius: 8,
    marginVertical: 10,
  },
  text: {
    color: COLORS.black,
    fontSize: 18,
  },
});
