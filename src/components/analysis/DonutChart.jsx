import React, { useEffect } from 'react';
import { VictoryPie, VictoryLabel, VictoryTheme, VictoryChart, LineSegment } from 'victory-native';
import { COLORS, SIZES, FONTS } from '../../../styles';
import { PieChartColors } from '../../../utils/colors';
import { ScrollView, StyleSheet, View, Text, Dimensions } from 'react-native';
import { Svg } from 'react-native-svg';
import { GetExpenseCategoryList, GetExpenseByMonth } from '@store/mmkv';
// receive data
const getRandomColor = () => {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

function DonutChart({ navigation }) {

  const [totalExpense, setTotalExpense] = React.useState(0);
  const [data, setData] = React.useState([]);

  useEffect(() => {
    const getData = async () => {

      const expenseCategoryList = GetExpenseCategoryList(new Date().getFullYear(), new Date().getMonth() + 1);
      const categoryData = expenseCategoryList.map((item) => {
        return {
          label: item.category,
          y: item.amount,
        };
      });
      setData(categoryData);
    };

    const unsubscribe = navigation.addListener('focus', () => {
      getData();
      setTotalExpense(GetExpenseByMonth(new Date().getFullYear(), new Date().getMonth() + 1));
    });


    getData();
    setTotalExpense(GetExpenseByMonth(new Date().getFullYear(), new Date().getMonth() + 1));
    return unsubscribe;

  }, [navigation]);

  return (
    <View style={{ flex: 1 }}>
      <Text style={styles.componentTitle}>Expenses Categories</Text>
      <View style={styles.box}>

        <View style={
          styles.donutContainer
        }>
          <Svg width={300} height={300} >

            <VictoryPie
              labelIndicator={<LineSegment style={styles.line} />}
              labelRadius={115}

              style={{
                labels: { fontSize: 13 },
              }}
              data={data}
              width={300} // Adjust width
              height={300} // Adjust height
              innerRadius={50} // Adjust inner radius to create a donut effect
              colorScale={PieChartColors} // Custom color scale
              animate={{ duration: 300 }}
              padAngle={1} // Adjust spacing between segments

            />
            <VictoryLabel
              textAnchor="middle"
              style={{ fontSize: 15 }}
              x={150} y={150}
              text={() => '$' + totalExpense}
            />

          </Svg>
        </View>
      </View>




    </View>
  );
}

const styles = StyleSheet.create({
  safeView: {
    flex: 1,
    height: '100%',
  },
  line: {
    stroke: 'black', fill: 'none',
  },
  donutContainer: {
    height: 300,
    width: 300,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
    marginLeft: SIZES.padding,
    marginRight: SIZES.padding,
    //padding: 10,
    borderRadius: 8,
    marginVertical: 10,
    flexDirection: 'row',

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
