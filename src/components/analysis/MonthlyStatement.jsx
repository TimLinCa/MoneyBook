import React from 'react';
import {COLORS, SIZES, FONTS} from '../../../styles';
import {ScrollView, StyleSheet, View, Text, Dimensions} from 'react-native';

function MonthlyStatement() {
  const [income, setIncome] = React.useState(0);
  const [expense, setExpense] = React.useState(0);
  return (
    <View>
      <Text style={styles.componentTitle}>Monthly Statement</Text>
      <View style={styles.box}>
        <View style={styles.summaryView}>
          <View style={styles.currencyLabelTextContainer}>
            <Text style={styles.currencyLabelText}>Balance</Text>
          </View>
          <View style={styles.currentTextContainer}>
            <Text style={styles.currentText}>$ {income - expense}</Text>
          </View>
        </View>
        <View style={styles.divider} />
        {/* Income */}
        <View style={styles.summaryView}>
          <View style={styles.currencyLabelTextContainer}>
            <Text style={styles.currencyLabelText}>Income</Text>
          </View>
          <View style={styles.currentTextContainer}>
            <Text style={styles.currentText}>$ {income}</Text>
          </View>
        </View>
        <View style={styles.divider} />
        {/* Expense */}
        <View style={styles.summaryView}>
          <View style={styles.currencyLabelTextContainer}>
            <Text style={styles.currencyLabelText}>Expense</Text>
          </View>
          <View style={styles.currentTextContainer}>
            <Text style={styles.currentText}>$ {expense}</Text>
          </View>
        </View>
      </View>
    </View>
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
    backgroundColor: '#ffffff',
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
export default MonthlyStatement;
