import React from 'react';
import {COLORS, SIZES, FONTS} from '../../../styles';
import {BarChart} from 'react-native-chart-kit';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {NavigationContainer} from '@react-navigation/native';
import Chart from '@components/analysis/Chart';
import {SafeAreaView} from 'react-native-safe-area-context';

import MainAsset from '@components/main/MainAsset';

import MainDebt from '@components/main/MainDebt';

import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
const Tab = createMaterialTopTabNavigator();

function Trend() {
  //const [selectedButton, setSelectedButton] = React.useState('Income'); // State to manage the selected button

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
              tabBarIndicatorContainerStyle: {width: '100%'},
              tabBarLabelStyle: {fontSize: SIZES.body5, fontWeight: 'bold'},
              tabBarStyle: {
                backgroundColor: COLORS.lightGray,
                borderRadius: 20,
                margin: SIZES.padding,
                width: '99.9%',
                height: '10%',
                alignSelf: 'center',
              },
              tabBarContentContainerStyle: {
                alignItems: 'center',
                alignSelf: 'center',
              },
            }}>
            <Tab.Screen name="Income" component={Chart} />
            <Tab.Screen name="Expense" component={Chart} />
            <Tab.Screen name="Balance" component={Chart} />
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
    fontSize: SIZES.h1,
    marginLeft: SIZES.padding,
  },
  box: {
    backgroundColor: '#ffffff',
    height: 300,
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
