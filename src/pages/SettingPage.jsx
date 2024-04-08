import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity, Button} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {SafeAreaView} from 'react-native-safe-area-context';
import {COLORS, SIZES, FONTS} from '../../styles';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';
import SettingAccount from '@pages/SettingSubPages/SettingAccount';
import Notification from '@pages/SettingSubPages/Notification';
import PrivacySecurity from '@pages/SettingSubPages/PrivacySecurity';
import HelpAndSupport from '@pages/SettingSubPages/HelpAndSupport';
import About from '@pages/SettingSubPages/About';

const Stack = createNativeStackNavigator();
function renderheader() {
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.headerText}>Settings</Text>
    </View>
  );
}
function UserInfo() {
  return (
    <View style={{marginLeft: 10, marginBottom: 30}}>
      <Text style={styles.userInfo}>Hello username</Text>
      <Text>Your email is here</Text>
    </View>
  );
}

const SettingPage = ({navigation}) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="SettingPage"
        component={SettingPageScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen name="Account" component={SettingAccount} />
      <Stack.Screen name="Notification" component={Notification} />
      <Stack.Screen name="Privacy&Security" component={PrivacySecurity} />
      <Stack.Screen name="HelpAndSupport" component={HelpAndSupport} />
      <Stack.Screen name="About" component={About} />
    </Stack.Navigator>
  );
};

const SettingPageScreen = ({navigation}) => {
  return (
    <View>
      {renderheader()}
      {UserInfo()}
      {/* <Button
        title="Go to Setting Account"
        onPress={() => navigation.navigate('SettingAccount')}
      /> */}
      <View>
        <TouchableOpacity onPress={() => navigation.navigate('Account')}>
          <View style={styles.container}>
            <Text style={[styles.text, {fontSize: 35}]}>
              <Icon name="user" size={28} color="#999" style={styles.icon} />{' '}
              Account
            </Text>
            <Text style={{fontSize: 35}}>{'>'}</Text>
          </View>
        </TouchableOpacity>
        {<View style={styles.divider} />}
        <TouchableOpacity onPress={() => navigation.navigate('Notification')}>
          <View style={styles.container}>
            <Text style={[styles.text, {fontSize: 35}]}>
              <Icon name="bell" size={28} color="#999" style={styles.icon} />{' '}
              Notifications
            </Text>
            <Text style={{fontSize: 35}}>{'>'}</Text>
            {/* You can use '>' directly in the Text component */}
          </View>
        </TouchableOpacity>
        {<View style={styles.divider} />}

        <TouchableOpacity
          onPress={() => navigation.navigate('Privacy&Security')}>
          <View style={styles.container}>
            <Text style={[styles.text, {fontSize: 35}]}>
              <Icon name="lock" size={33} color="#999" style={styles.icon} />
              {'  '}Privacy & Security
            </Text>
            <Text style={{fontSize: 35}}>{'>'}</Text>
            {/* You can use '>' directly in the Text component */}
          </View>
        </TouchableOpacity>
        {<View style={styles.divider} />}

        <TouchableOpacity onPress={() => navigation.navigate('HelpAndSupport')}>
          <View style={styles.container}>
            <Text style={[styles.text, {fontSize: 35}]}>
              <Icon
                name="question"
                size={40}
                color="#999"
                style={styles.icon}
              />
              {'  '}
              Help and Support
            </Text>
            <Text style={{fontSize: 35}}>{'>'}</Text>
            {/* You can use '>' directly in the Text component */}
          </View>
        </TouchableOpacity>
        {<View style={styles.divider} />}

        <TouchableOpacity onPress={() => navigation.navigate('About')}>
          <View style={styles.container}>
            <Text style={[styles.text, {fontSize: 35}]}>
              <Icon name="info" size={35} color="#999" style={styles.icon} />
              {'   '}About
            </Text>
            <Text style={{fontSize: 35}}>{'>'}</Text>
            {/* You can use '>' directly in the Text component */}
          </View>
        </TouchableOpacity>
        {<View style={styles.divider} />}

        <TouchableOpacity>
          <View style={styles.container}>
            <Text style={[styles.text, {fontSize: 35}]}>
              <Icon
                name="sign-out"
                size={30}
                color="#999"
                style={styles.icon}
              />{' '}
              Sign Out
            </Text>
            <Text style={{fontSize: 35}}>{'>'}</Text>
            {/* You can use '>' directly in the Text component */}
          </View>
        </TouchableOpacity>
        {<View style={styles.divider} />}
      </View>
    </View>
  );
};

export default SettingPage;

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
  userInfo: {
    fontSize: 20, // Change the font size to your desired size
    fontWeight: 'bold', // Make the text bold
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', // Align items at the start and end of the container
    paddingRight: 10, // Add padding to create space between the text and the '>' symbol
    fontSize: 16, // Change the font size to your desired size
    marginHorizontal: 15,
    marginBottom: 3,
  },
  text: {
    marginRight: 5,
  },
  divider: {
    height: 1,
    backgroundColor: '#ccc', // Customize the color as needed
    marginVertical: 1,
    marginTop: 10,
    marginHorizontal: 15,
  },
  icon: {
    //marginRight: 5, // Add margin to the right of the icon
  },
});
