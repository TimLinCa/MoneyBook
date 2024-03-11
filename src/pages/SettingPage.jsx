import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {SafeAreaView} from 'react-native-safe-area-context';
import {COLORS, SIZES, FONTS} from '../../styles';

//This page can show the user's settings such as  notifications, securities, and privacies.

const Tab = createMaterialTopTabNavigator();

function renderheader() {
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.headerText}>Settings</Text>
    </View>
  );
}

function SettingPage() {
  return <SafeAreaView>{renderheader()}</SafeAreaView>;
}

export default SettingPage;

const styles = StyleSheet.create({
  headerContainer: {
    width: '100%',
    height: SIZES.height * 0.06,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
    backgroundColor: COLORS.navyBlue,
    flexDirection: 'row',
  },
  headerText: {
    color: COLORS.white,
    fontSize: SIZES.h2,
    alignSelf: 'center',
    marginLeft: SIZES.padding,
  },
});
