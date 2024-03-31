import React, { useEffect } from 'react';
import { COLORS, SIZES } from '../../../styles';

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NavigationContainer } from '@react-navigation/native';
import BarChart from '@components/analysis/BarChart';
import LineChart from '@components/analysis/LineChart';
import { GetIncomeByMonth, GetExpenseByMonth } from '@store/mmkv';
import moment from 'moment';


import {
  StyleSheet,
  View,
  Text,
} from 'react-native';
const Tab = createMaterialTopTabNavigator();

function Trend({ navigation }) {
  const [incomeData, setIncomeData] = React.useState([]);
  const [expenseData, setExpenseData] = React.useState([]);
  const [balanceData, setBalanceData] = React.useState([]); // State to store income data
  //const [selectedButton, setSelectedButton] = React.useState('Income'); // State to manage the selected button
  useEffect(() => {
    const getData = async () => {
      let incomeData_temp = [];
      let expenseData_temp = [];
      let balanceData_temp = [];
      for (let i = -5; i <= 1; i++) {
        const month = new Date().getMonth() + i;
        let monthString = moment().month(month).format('MMM');
        monthString = monthString.substring(0, 3);
        const income = GetIncomeByMonth(new Date().getFullYear(), month);
        incomeData_temp.push({ month: monthString, amount: income });
        const expense = GetExpenseByMonth(new Date().getFullYear(), month);
        expenseData_temp.push({ month: monthString, amount: expense });
        const balance = Math.round((income - expense) * 100) / 100;
        balanceData_temp.push({ month: monthString, amount: balance });
      }

      setExpenseData(expenseData_temp);
      setIncomeData(incomeData_temp);
      setBalanceData(balanceData_temp);
    };
    const unsubscribe = navigation.addListener('focus', async () => {
      await getData();
    });
    return unsubscribe;
  }, [navigation]);
  return (
    <View>
      {/* <Chart /> */}
      <Text style={styles.componentTitle}>Trend</Text>
      <View style={styles.box}>
        <NavigationContainer independent={true}>
          <Tab.Navigator
            screenOptions={{
              tabBarInactiveTintColor: 'gray',
              tabBarActiveTintColor: 'black',
              tabBarIndicatorStyle: {
                borderRadius: 20,
                backgroundColor: 'white',
                height: '100%',
                alignSelf: 'center',
                alignContent: 'center',
              },
              tabBarIndicatorContainerStyle: { width: '100%' },
              tabBarLabelStyle: { fontSize: SIZES.body5, fontWeight: 'bold' },
              tabBarStyle: {
                backgroundColor: COLORS.lightGray,
                borderRadius: 20,
                margin: SIZES.padding,
                width: '99.9%',
                height: '8%',
                alignSelf: 'center',
              },
              tabBarContentContainerStyle: {
                alignItems: 'center',
                alignSelf: 'center',
              },
            }}>
            <Tab.Screen name="Income" children={() => <BarChart chartData={incomeData} color={COLORS.navyBlue} />} />
            <Tab.Screen name="Expense" children={() => <BarChart chartData={expenseData} color={COLORS.red} />} />
            <Tab.Screen name="Balance" children={() => <LineChart chartData={balanceData} color={COLORS.darkYellow} />} />
          </Tab.Navigator>
        </NavigationContainer>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  safeView: {
    flex: 1,
    height: '100%',
  },
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
    fontSize: SIZES.h2,
    marginLeft: SIZES.padding,
  },
  box: {
    backgroundColor: '#ffffff',
    height: 430,
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
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#DDDDDD',
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginHorizontal: 5,
    borderRadius: 5,
  },
  selectedButton: {
    backgroundColor: '#B8B6B6',
  },
  buttonText: {
    fontSize: 16,
  },
});
export default Trend;
