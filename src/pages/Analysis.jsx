import React from 'react';
import {ScrollView, StyleSheet, View, Text, Dimensions} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Header from '../components/analysis/Header';
import MonthlyStatement from '../components/analysis/MonthlyStatement';
import Trend from '../components/analysis/Trend';
import Budget from '../components/analysis/Budget';
import Chart from '../components/analysis/Chart';
import DonutChart from '../components/analysis/DonutChart';
//This page will show the user's spending analysis.

function Analysis() {
  return (
    <SafeAreaView>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <Header />
        <MonthlyStatement />
        <DonutChart />
        <Budget />
        <Trend />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flexGrow: 1,
  },
});
export default Analysis;
