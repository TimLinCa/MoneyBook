import React from 'react';
// import {VictoryPie, VictoryLegend} from 'victory-native';
import {COLORS, SIZES, FONTS} from '../../../styles';
import {ScrollView, StyleSheet, View, Text, Dimensions} from 'react-native';
import {PieChart} from 'react-native-chart-kit';
// receive data
const screenWidth = Dimensions.get('window').width;
const chartConfig = {
  backgroundGradientFrom: '#1E2923',
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: '#08130D',
  backgroundGradientToOpacity: 0.5,
  color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
  strokeWidth: 2, // optional, default 3
  barPercentage: 0.5,
  useShadowColorFromDataset: false, // optional
};

function DonutChart() {
  const data = [
    {
      name: 'Seoul',
      population: 21500000,
      color: 'rgba(131, 167, 234, 1)',
      legendFontColor: '#7F7F7F',
      legendFontSize: 13,
    },
    {
      name: 'Toronto',
      population: 2800000,
      color: '#F00',
      legendFontColor: '#7F7F7F',
      legendFontSize: 13,
    },
    {
      name: 'New York',
      population: 8538000,
      color: '#adff2f',
      legendFontColor: '#7F7F7F',
      legendFontSize: 13,
    },
    {
      name: 'Moscow',
      population: 11920000,
      color: 'rgb(0, 0, 255)',
      legendFontColor: '#7F7F7F',
      legendFontSize: 13,
    },
  ];
  return (
    <View style={styles.safeView}>
      <Text style={styles.componentTitle}>Donut Chart</Text>
      <View style={styles.box}>
        <PieChart
          data={data}
          width={screenWidth}
          height={220}
          chartConfig={chartConfig}
          accessor={'population'}
          backgroundColor={'transparent'}
          //paddingLeft={'0'}
          center={[10, 10]}
        />
      </View>
    </View>
  );

  // const data = [
  //   {x: 'Grocery', y: 500, color: '#FF5733'},
  //   {x: 'Gasoline', y: 500, color: '#FFC300'},
  //   {x: 'Liquor', y: 400, color: '#C70039'},
  //   {x: 'Others', y: 700, color: '#900C3F'},
  // ];
  // function getTotal(data) {
  //   return data.reduce((acc, current) => acc + current.y, 0);
  // }
  // const total = getTotal(data);

  // return (
  //   <View style={{flex: 1}}>
  //     <Text style={styles.componentTitle}>Expenses</Text>
  //     <View style={styles.box}>
  //       {/* <VictoryLegend
  //         x={-5} // Set x position to 20 for left alignment
  //         y={0} // Set y position to 20 for top alignment
  //         orientation="vertical"
  //         data={data.map(item => ({name: item.x, symbol: {fill: item.color}}))}
  //         style={{labels: {fontSize: 12}}} // Set custom style for labels (fontSize: 10)
  //       /> */}
  //       <View style={{marginTop: -300}}>
  //         {/* <VictoryPie
  //           data={data}
  //           width={430} // Adjust width
  //           height={300} // Adjust height
  //           innerRadius={50} // Adjust inner radius to create a donut effect
  //           colorScale={data.map(item => item.color)} // Custom color scale
  //           padAngle={2} // Adjust spacing between segments
  //           label={() => total} // Render total as label in the center
  //         /> */}
  //         <Text
  //           style={{
  //             position: 'absolute',
  //             top: 135,
  //             left: '50%',
  //             color: '#000000',
  //             fontSize: 20,
  //           }}>
  //           ${total}
  //         </Text>
  //       </View>
  //     </View>
  //   </View>
  // );
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
    marginLeft: SIZES.padding,
    marginRight: SIZES.padding,
    //padding: 10,
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

export default DonutChart;
