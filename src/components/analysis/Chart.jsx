import React from 'react';
import {COLORS, SIZES, FONTS} from '../../../styles';
import {BarChart} from 'react-native-chart-kit';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {NavigationContainer} from '@react-navigation/native';
import MainAsset from '@components/main/MainAsset';
import MainDebt from '@components/main/MainDebt';
import {SafeAreaView} from 'react-native-safe-area-context';

import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
} from 'react-native';

const mockData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      data: [1000, 2000, 1500, 3000, 2500, 2000],
    },
  ],
};

const chartConfig = {
  backgroundGradientFrom: '#fff',
  backgroundGradientTo: '#fff',
  decimalPlaces: 0,
  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  barPercentage: 0.5,
};

function Chart() {
  return (
    <View style={styles.safeView}>
      <Text>Income Screen</Text>
      <BarChart
        data={mockData}
        width={300}
        height={200}
        yAxisSuffix="$"
        chartConfig={chartConfig}
      />
    </View>

    // <ScrollView contentContainerStyle={styles.scrollView}>
    //   <View style={styles.container}>
    //     <BarChart
    //       data={{
    //         labels: ['January', 'February', 'March', 'April', 'May'],
    //         datasets: [
    //           {
    //             data: [4000, 3000, 4000, 3000, 6000],
    //           },
    //         ],
    //       }}
    //       width={Dimensions.get('window').width * 0.95}
    //       height={230}
    //       yAxisLabel="$"
    //       yAxisSuffix=""
    //       yAxisInterval={1000}
    //       chartConfig={chartConfig}
    //       bezier
    //       style={styles.barChartContainer}
    //       fromZero
    //     />
    //   </View>
    // </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  safeView: {
    backgroundColor: COLORS.white,
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
    justifyContent: 'center',
  },
  barChartContainer: {
    marginHorizontal: 10,
    borderRadius: 16,
    marginBottom: 10,
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
export default Chart;
