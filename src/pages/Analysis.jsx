import React from 'react';
import {BarChart} from 'react-native-chart-kit';
import {ScrollView, StyleSheet, View, Text, Dimensions} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {SafeAreaView} from 'react-native-safe-area-context';
import {COLORS, SIZES, FONTS} from '../../styles';
import Svg, {Rect} from 'react-native-svg';
//This page will show the user's spending analysis.

function renderHeader() {
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.headerText}>Analysis</Text>
    </View>
  );
}
const chartConfig = {
  backgroundGradientFrom: '#b8b6b6',
  backgroundGradientTo: '#b8b6b6',
  decimalPlaces: 2,
  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  style: {borderRadius: 16, marginHorizontal: 20, marginVertical: 10},
  propsForDots: {r: '6', strokeWidth: '2', stroke: '#ffa726'},
};

function monthlyStatement() {
  return (
    <View>
      <Text style={styles.componentTitle}>Monthly Statement</Text>
      {/* Balance */}
      <View style={styles.box}>
        <View style={styles.summaryView}>
          <View style={styles.currencyLabelTextContainer}>
            <Text style={styles.currencyLabelText}>Balance</Text>
          </View>
          <View style={styles.currentTextContainer}>
            <Text style={styles.currentText}>$ 1,500</Text>
          </View>
        </View>
        <View style={styles.divider} />
        {/* Income */}
        <View style={styles.summaryView}>
          <View style={styles.currencyLabelTextContainer}>
            <Text style={styles.currencyLabelText}>Income</Text>
          </View>
          <View style={styles.currentTextContainer}>
            <Text style={styles.currentText}>$ 4,000</Text>
          </View>
        </View>
        <View style={styles.divider} />
        {/* Expense */}
        <View style={styles.summaryView}>
          <View style={styles.currencyLabelTextContainer}>
            <Text style={styles.currencyLabelText}>Expense</Text>
          </View>
          <View style={styles.currentTextContainer}>
            <Text style={styles.currentText}>$ 2,500</Text>
          </View>
        </View>
      </View>
      <Text style={styles.componentTitle}>Your Budget</Text>
      <View style={styles.box}>
        {/*Food and Grocery*/}
        <View style={styles.summaryView}>
          <View style={styles.currencyLabelTextContainer}>
            <Text style={styles.currencyLabelText}>Food and Grocery</Text>
          </View>
          <View style={styles.currentTextContainer}>
            <Text style={styles.currentText}>$ 400</Text>
          </View>
        </View>
        <View style={styles.divider} />
        {/*Houseing or Rent*/}
        <View style={styles.summaryView}>
          <View style={styles.currencyLabelTextContainer}>
            <Text style={styles.currencyLabelText}>Housing or Rent</Text>
          </View>
          <View style={styles.currentTextContainer}>
            <Text style={styles.currentText}>$ 1,000</Text>
          </View>
        </View>
        <View style={styles.divider} />
        {/*Bills*/}
        <View style={styles.summaryView}>
          <View style={styles.currencyLabelTextContainer}>
            <Text style={styles.currencyLabelText}>Bills</Text>
          </View>
          <View style={styles.currentTextContainer}>
            <Text style={styles.currentText}>$ 200</Text>
          </View>
        </View>
        <View style={styles.divider} />
        {/*Insurance*/}
        <View style={styles.summaryView}>
          <View style={styles.currencyLabelTextContainer}>
            <Text style={styles.currencyLabelText}>Insurance</Text>
          </View>
          <View style={styles.currentTextContainer}>
            <Text style={styles.currentText}>$ 250</Text>
          </View>
        </View>
        <View style={styles.divider} />
        {/*Transportation*/}
        <View style={styles.summaryView}>
          <View style={styles.currencyLabelTextContainer}>
            <Text style={styles.currencyLabelText}>Transportation</Text>
          </View>
          <View style={styles.currentTextContainer}>
            <Text style={styles.currentText}>$ 200</Text>
          </View>
        </View>
        <View style={styles.divider} />
        {/*Entertainment*/}
        <View style={styles.summaryView}>
          <View style={styles.currencyLabelTextContainer}>
            <Text style={styles.currencyLabelText}>Entertainment</Text>
          </View>
          <View style={styles.currentTextContainer}>
            <Text style={styles.currentText}>$ 100</Text>
          </View>
        </View>
        <View style={styles.divider} />
        {/*Personal Spending*/}
        <View style={styles.summaryView}>
          <View style={styles.currencyLabelTextContainer}>
            <Text style={styles.currencyLabelText}>Personal Spending</Text>
          </View>
          <View style={styles.currentTextContainer}>
            <Text style={styles.currentText}>$ 100</Text>
          </View>
        </View>
        <View style={styles.divider} />
        {/*Total*/}
        <View style={[styles.summaryView, {marginTop: 25}]}>
          <View style={styles.currencyLabelTextContainer}>
            <Text style={styles.currencyLabelText}>Total</Text>
          </View>
          <View style={styles.currentTextContainer}>
            <Text style={styles.currentText}>$ 2,250</Text>
          </View>
        </View>
        <View style={styles.divider} />
      </View>
      <Text style={styles.componentTitle}>Monthly Statement</Text>
      <View>
        <BarChart
          data={{
            labels: ['January', 'February', 'March', 'April', 'May'],
            datasets: [
              {
                data: [
                  4000, 3000, 4000, 3000, 5000,
                  // Math.random(),
                  // Math.random(),
                  // Math.random(),
                  // Math.random(),
                  // Math.random(),
                  // Math.random(),
                ],
              },
            ],
          }}
          width={Dimensions.get('window').width * 0.95}
          height={220}
          yAxisLabel="$"
          yAxisSuffix=""
          yAxisInterval={1000}
          chartConfig={chartConfig}
          bezier
          style={styles.barChartContainer}
          fromZero
        />
      </View>
    </View>
  );
}

function Analysis() {
  return (
    <SafeAreaView>
      <ScrollView contentContainerStyle={styles.scrollView}>
        {renderHeader()}
        {monthlyStatement()}
      </ScrollView>
    </SafeAreaView>
  );
}

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
  componentTitle: {
    color: COLORS.black,
    fontSize: SIZES.h1,
    marginLeft: SIZES.padding,
  },
  box: {
    backgroundColor: '#b8b6b6',
    marginLeft: SIZES.padding,
    marginRight: SIZES.padding,
    padding: 10,
    borderRadius: 8,
    marginVertical: 10,
  },
  summaryView: {
    flexDirection: 'row',
    borderColor: COLORS.white,
    marginBottom: 5,
  },
  currencyLabelText: {
    verticalAlign: 'middle',
    color: COLORS.black,
    fontSize: SIZES.h3,
  },
  currentText: {
    color: COLORS.black,
    fontSize: SIZES.h3,
  },
  currencyLabelTextContainer: {
    flex: 2,
    alignItems: 'flex-start',
  },
  currentTextContainer: {
    flex: 2,
    alignItems: 'flex-end',
  },
  currentTextH1: {
    color: COLORS.green,
    fontWeight: 'bold',
    fontSize: SIZES.h1,
  },
  divider: {
    height: 1,
    backgroundColor: '#ccc', // Customize the color as needed
    marginVertical: 1,
  },
  scrollView: {
    flexGrow: 1,
  },
  barChartContainer: {
    marginLeft: 10, // Horizontal margin
    marginRight: 10,
    borderRadius: 16,
  },
});
export default Analysis;
