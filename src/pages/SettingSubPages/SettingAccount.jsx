import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {COLORS, SIZES, FONTS} from '@styles';

function SettingAccount() {
  return (
    <View style={styles.box}>
      <Text>Name</Text>
      <Text>Email</Text>
      <Text>Birth Day</Text>
      <Text>Phone</Text>
    </View>
  );
}
export default SettingAccount;

const styles = StyleSheet.create({
  box: {
    backgroundColor: '#ffffff',
    marginLeft: SIZES.padding,
    marginRight: SIZES.padding,
    padding: 10,
    borderRadius: 8,
    marginVertical: 10,
  },
});
