import React, { useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { Button } from '@rneui/themed';
import { useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { COLORS, SIZES, FONTS } from '@styles';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NavigationContainer } from '@react-navigation/native';
import MainAsset from '@components/main/MainAsset';
import MainDebt from '@components/main/MainDebt';
import MainBudget from '@components/main/MainBudget';
import { SafeAreaView } from 'react-native-safe-area-context';
import moment from 'moment';
var momenttz = require('moment-timezone');
import { InitialKey, getTotalLiabilitiesByCurrency, UpdateLastAsyncTime, GetLastAsyncTime, getTotalBalanceByCurrency, updateExchangedRate, getExchangeRate, getBudgetInfo, UpdateAccountBalance, GetTransactionCursor, GetInstitutionToken, AddInstitutionToken, AsyncInstitutionAccountInfo, GetInstitutionNameList, GetLocalInstitutionAccountInfo, Test, UpdateTransactionInfo } from '@store/mmkv';
import NetInfo from "@react-native-community/netinfo";
import axios from 'axios';
import { IP_ADDRESS } from '@env';
const address = IP_ADDRESS;
axios.defaults.baseURL = `http://${address}:3005`;
//This page will show the user's summary of their accounts such as total balance and loan and budget information.

const Tab = createMaterialTopTabNavigator();
InitialKey();
function HomePage({ navigation }) {
  const [cadBalance, setCadBalance] = useState(0);
  const [usdBalance, setUsdBalance] = useState(0);
  const [othersBalance, setOthersBalance] = useState(0);
  const [creditDebt, setCreditDebt] = useState(0);
  const [budgetList, setBudgetList] = useState([]);
  const [isAsync, setIsAsync] = useState(false);
  const [currentDate, setCurrentDate] = useState('');
  const [lastAsyncText, setLastAsyncText] = useState('');
  const asyncAccount = async () => {
    setIsAsync(true);

    const institutionNameList = GetInstitutionNameList();
    for (let institutionName of institutionNameList) {
      const accToken = GetInstitutionToken(institutionName);
      const authRes = await axios.post('/async_balance', { access_token: accToken });
      UpdateAccountBalance(institutionName, authRes);
      let hasMore = true;
      let cursor = GetTransactionCursor(institutionName);
      while (hasMore) {
        let asyncTransaction = await axios.post('/asyncTransactions', { access_token: accToken, cursor: cursor });
        UpdateTransactionInfo(institutionName, asyncTransaction.data.added, asyncTransaction.data.modified, asyncTransaction.data.removed, asyncTransaction.data.cursor);
        cursor = asyncTransaction.data.cursor;
        hasMore = asyncTransaction.data.has_more;
      }
    }
    const tz = await momenttz.tz.guess();
    UpdateLastAsyncTime(moment().tz(tz).format('YYYY-MM-DD HH:mm:ss'));
    setIsAsync(false);
  };


  useEffect(() => {
    const renderTotalBalanceByCurrency = async () => {
      let cadBalance_temp = 0;
      let usdBalance_temp = 0;
      let othersBalance_temp = 0;

      let netConnect = false;
      let IsInternetReachable = false;
      await NetInfo.fetch().then(state => {
        netConnect = state.isConnected;
        IsInternetReachable = state.isInternetReachable;
      });
      if (netConnect && IsInternetReachable) {
        const exchangeRateRes = await axios.post('/get_exchange_rate', { currencyList: ['usd', 'twd'] });
        updateExchangedRate(exchangeRateRes.data);
      }
      const totalBalanceByCurrency = getTotalBalanceByCurrency();

      totalBalanceByCurrency.forEach(tb => {

        if (tb.currency === 'CAD') {
          cadBalance_temp = tb.balance;
        }
        else {
          const rate = getExchangeRate(tb.currency);
          if (tb.currency === 'USD') {
            usdBalance_temp = tb.balance * rate;
          }
          else {
            othersBalance_temp += tb.balance * rate;
          }
        }
      });

      setCadBalance(cadBalance_temp);
      setUsdBalance(usdBalance_temp);
      setOthersBalance(othersBalance_temp);
      setBudgetList(getBudgetInfo(new Date().getFullYear(), new Date().getMonth() + 1));

      const TotalLiabilities = getTotalLiabilitiesByCurrency();
      let creditDebt_temp = 0;
      TotalLiabilities.forEach(tb => {
        if (tb.currency === 'CAD') {
          creditDebt_temp += tb.balance;
        }
        else {
          const rate = getExchangeRate(tb.currency);
          creditDebt_temp += tb.balance * rate;
        }
      });

      setCreditDebt(creditDebt_temp);
    };

    const renderAsyncDate = async () => {
      const currentDate_temp = new Date();
      const tz = await momenttz.tz.guess();
      let monthString = moment().tz(tz).format('MMM');
      let dateDayString = currentDate_temp.getDate();
      let dayString = moment().tz(tz).format('dddd');
      dayString = dayString.substring(0, 3);
      let string = monthString + ', ' + dateDayString + '(' + dayString + ')';
      setCurrentDate(string);
      setLastAsyncText(moment(GetLastAsyncTime(), 'YYYY-MM-DD HH:mm:ss').fromNow());

    };
    const unsubscribe = navigation.addListener('focus', () => {
      renderTotalBalanceByCurrency();
      renderAsyncDate();
    });

    renderTotalBalanceByCurrency();
    renderAsyncDate();
    return unsubscribe;

  }, [navigation, isAsync]);

  return (
    <SafeAreaView style={{ flex: 1, paddingBottom: 10 }}>
      {renderHeader(asyncAccount, isAsync, currentDate, lastAsyncText)}
      {renderSummaryInfo(cadBalance, usdBalance, othersBalance, creditDebt)}
      {renderBudgetInfo(budgetList)}
    </SafeAreaView>
  );
}


function renderHeader(asyncAccount, isAsync, currentDate, lastAsyncText) {
  const TestButtonFunction = async () => {
    Test();

    //AddBudgetItem('FOOD_AND_DRINK', 3000);
    // console.log(getBudgetInfo(new Date().getFullYear(), new Date().getMonth() + 1));

  };
  return (
    <View
      style={
        styles.headerContainer
      }>

      <View style={{
        marginLeft: SIZES.padding,
      }}>
        <TouchableOpacity
          /* Notification button */
          style={styles.headerTouchableOpacity
          }>
          <View>
            <Icon name="bell-outline" size={25} color={COLORS.white} />
          </View>
        </TouchableOpacity>
        <View style={{ flexDirection: 'row', marginTop: 20 }}>
          <View>
            <Text style={{ ...FONTS.h2, color: COLORS.white }}>{currentDate}</Text>
            <Text style={{ ...FONTS.h4, color: COLORS.lightGray }}>Async {lastAsyncText}</Text>
          </View>
          <View style={{ flex: 2, alignItems: "flex-end", marginRight: SIZES.padding }}>
            <Button onPress={() => asyncAccount()} color={COLORS.darkYellow}>
              {isAsync ? <ActivityIndicator color={COLORS.white} style={styles.buttonIcon} animating={isAsync} /> : <Icon style={styles.buttonIcon} name="rotate-3d-variant" size={20} color={COLORS.white} />}
              Async
            </Button>
          </View>
        </View>
      </View>
    </View >
  );
}

function renderSummaryInfo(cadBalance, usdBalance, othersBalance, creditDebt) {
  const netAsset = cadBalance + usdBalance + othersBalance - creditDebt;
  return (
    <View style={styles.summaryInfo}>
      <View>
        <View style={{ flexDirection: 'row', height: SIZES.height * 0.045 }}>
          <View style={{ flex: 1 }}>
            <Text style={{ color: COLORS.black, fontSize: SIZES.h3, flex: 1, marginTop: SIZES.padding * 1.2, marginLeft: SIZES.padding * 1.5 }}>Net asset</Text>
          </View>

        </View>
        <View style={{ alignItems: 'flex-start', height: SIZES.height * 0.0562 }}>
          <Text style={{ color: COLORS.green, fontWeight: 700, fontSize: SIZES.h1, marginLeft: SIZES.padding * 1.5 }}>$ {netAsset.toLocaleString()}</Text>
        </View>
      </View>
      <View style={{ backgroundColor: COLORS.white, flex: 1, borderRadius: 20, paddingBottom: SIZES.padding, paddingLeft: SIZES.padding, paddingRight: SIZES.padding }} >
        <NavigationContainer independent={true}>
          <Tab.Navigator
            screenOptions={{
              tabBarInactiveTintColor: 'gray',
              tabBarActiveTintColor: 'black',
              tabBarIndicatorStyle: { borderRadius: 20, backgroundColor: 'white', height: '100%', alignSelf: 'center', alignContent: 'center' },
              tabBarIndicatorContainerStyle: { width: '100%' },
              tabBarLabelStyle: { fontSize: SIZES.body5, fontWeight: 'bold' },
              tabBarStyle: { backgroundColor: COLORS.lightGray, borderRadius: 20, margin: SIZES.padding, width: '99.9%', height: '10%', alignSelf: 'center' },
              tabBarContentContainerStyle: { alignItems: 'center', alignSelf: 'center' },
            }}
          >
            <Tab.Screen name="Asset" children={() => <MainAsset cadBalance={cadBalance} usdBalance={usdBalance} othersBalance={othersBalance} />} />
            <Tab.Screen name="DEBT" children={() => <MainDebt creditCardDebt={creditDebt} />} />
          </Tab.Navigator>
        </NavigationContainer>
      </View>
    </View >

  );
}

function renderBudgetInfo(budgetList) {
  return (
    <ScrollView style={styles.budgetInfo}>
      {
        budgetList.map((budget, index) => {
          return (
            <MainBudget
              key={index}
              name={budget.name}
              max={budget.budget}
              min={0}
              value={budget.amount}
              barWidth={SIZES.width * 0.65}
            />
          );
        })
      }

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
  },
  summaryInfo: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: SIZES.height * 0.1718,
    height: SIZES.height * 0.42,
    backgroundColor: COLORS.white,
    marginLeft: SIZES.padding,
    marginRight: SIZES.padding,
    shadowColor: '#000000',
    shadowOpacity: 0.8,
    shadowRadius: 4,
    shadowOffset: {
      height: 2,
      width: 2,
    },
    borderRadius: 20,
    flexDirection: 'column',
  },
  budgetInfo: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: SIZES.height * 0.61,
    height: SIZES.height * 0.31,
    backgroundColor: COLORS.white,
    marginLeft: SIZES.padding,
    marginRight: SIZES.padding,
    shadowColor: '#000000',
    shadowOpacity: 0.8,
    shadowRadius: 4,
    shadowOffset: {
      height: 2,
      width: 2,
    },
    borderRadius: 20,
    flexDirection: 'column',
    paddingLeft: SIZES.padding,
    paddingRight: SIZES.padding,
    paddingTop: SIZES.padding,

  },
  headerContainer: {
    width: '100%',
    height: SIZES.height * 0.22464,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
    backgroundColor: COLORS.navyBlue,
  },
  headerTouchableOpacity: {
    marginTop: SIZES.padding * 2,
    paddingHorizontal: 5,
    alignSelf: 'flex-start',
    width: 35,
  },
});

export default HomePage;
