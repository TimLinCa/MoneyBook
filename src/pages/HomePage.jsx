import React, { useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';

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


//This page will show the user's summary of their accounts such as total balance and loan and budget information.

const Tab = createMaterialTopTabNavigator();

function renderHeader() {

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
            <Text style={{ ...FONTS.h2, color: COLORS.white }}>Feb, 20(Tue)</Text>
            <Text style={{ ...FONTS.h4, color: COLORS.lightGray }}>Async 3 minute ago</Text>
          </View>
          <View style={{ flex: 2, alignItems: "flex-end", marginRight: SIZES.padding }}>
            <Button color={COLORS.darkYellow}>
              <Icon name="rotate-3d-variant" size={25} color={COLORS.white} />
              Async
            </Button>
          </View>
        </View>
      </View>
    </View >
  );
}

function renderSummaryInfo(netAsset) {
  return (
    <TouchableOpacity style={styles.summaryInfo}>
      <View>
        <View style={{ flexDirection: 'row', height: SIZES.height * 0.045 }}>
          <View style={{ flex: 1 }}>
            <Text style={{ color: COLORS.black, fontSize: SIZES.h3, flex: 1, marginTop: SIZES.padding * 1.2, marginLeft: SIZES.padding * 1.5 }}>Net asset</Text>
          </View>
          <View style={{ flex: 2, alignItems: 'flex-end', marginTop: SIZES.padding * 1.5, marginRight: SIZES.padding * 1.5 }}>
            <Text>＞</Text>
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
              tabBarContentContainerStyle: { alignItems: 'center', alignSelf: 'center' }
            }}
          >
            <Tab.Screen name="Asset" children={() => <MainAsset cadBalance={10000.12} usdBalance={5000} othersBalance={0} />} />
            <Tab.Screen name="DEBT" children={() => <MainDebt creditCardDebt={10000} />} />
          </Tab.Navigator>
        </NavigationContainer>
      </View>
    </TouchableOpacity >

  );
}

function renderBudgetInfo() {
  return (
    <ScrollView style={styles.budgetInfo}>
      <MainBudget
        style={styles.BudgetBar}
        name="Grocery"
        max={2000}
        min={0}
        value={500}
        barWidth={SIZES.width * 0.65}
      />
      <MainBudget
        style={styles.BudgetBar}
        name="Gasoline"
        max={1000}
        min={0}
        value={800}
        barWidth={SIZES.width * 0.65}
      />
      <MainBudget
        style={styles.BudgetBar}
        name="Travel"
        max={500}
        min={0}
        value={450}
        barWidth={SIZES.width * 0.65}
      />
    </ScrollView>
  );
}

function HomePage() {
  const [netAsset, setNetAsset] = useState(0);

  useEffect(() => {
    setNetAsset(5000.12);
  }, []);



  return (
    <SafeAreaView style={{ flex: 1, paddingBottom: 10 }}>
      {renderHeader()}
      {renderSummaryInfo(netAsset)}
      {renderBudgetInfo()}
    </SafeAreaView>
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
    height: SIZES.height * 0.4,
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
    top: SIZES.height * 0.59,
    height: SIZES.height * 0.335,
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
