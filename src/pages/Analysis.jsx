import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../components/analysis/Header';
import MonthlyStatement from '../components/analysis/MonthlyStatement';
import Trend from '../components/analysis/Trend';
import Budget from '../components/analysis/Budget';
import DonutChart from '../components/analysis/DonutChart';
//This page will show the user's spending analysis.

function Analysis({ navigation }) {


  return (
    <SafeAreaView>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <Header />
        <MonthlyStatement />
        <DonutChart navigation={navigation} />
        <Budget />
        <Trend navigation={navigation} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flexDirection: 'column',
  },
});
export default Analysis;
