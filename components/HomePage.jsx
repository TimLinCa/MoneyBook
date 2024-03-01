import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import axios from "axios";
import { Button } from '@rneui/themed';
import { useState } from "react";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { COLORS, SIZES, FONTS } from '../styles';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NavigationContainer } from '@react-navigation/native';
const address = '10.0.0.153';
axios.defaults.baseURL = `http://${address}:8080`;

//This page will show the user's summary of their accounts such as total balance and loan and budget information.


const Tab = createMaterialTopTabNavigator();
function Page1() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Page 1!</Text>
        </View>
    );
}

function Page2() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Page 2!</Text>
        </View>
    );
}

function renderheader() {
    return (
        <View
            style={
                {
                    width: '100%',
                    height: SIZES.height * 0.22464,
                    ...styles.shadow,
                    backgroundColor: COLORS.navyBlue,
                }
            }>

            <View style={{
                marginLeft: SIZES.padding,
            }}>
                <TouchableOpacity
                    /* Notification button */
                    style={{
                        marginTop: SIZES.padding * 2,
                        width: '100%',
                        alighItems: 'flex-end',
                        paddingHorizontal: 5
                    }
                    }>
                    <View>
                        <Icon name='bell-outline' size={25} color={COLORS.white} ></Icon>
                    </View>
                </TouchableOpacity>
                <View style={{ flexDirection: 'row', marginTop: 20 }}>
                    <View>
                        <Text style={{ ...FONTS.h2, color: COLORS.white }}>Feb, 20(Tue)</Text>
                        <Text style={{ ...FONTS.h4, color: COLORS.lightGray }}>Async 3 minute ago</Text>
                    </View>
                    <View style={{ flex: 2, alignItems: "flex-end", marginRight: SIZES.padding }}>
                        <Button color={COLORS.darkYellow}>
                            <Icon name='rotate-3d-variant' size={25} color={COLORS.white} ></Icon>
                            Async
                        </Button>
                    </View>
                </View>
            </View>
        </View >
    );
}

function renderSummaryInfo() {
    return (
        <TouchableOpacity style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: SIZES.height * 0.1718,
            height: SIZES.height * 0.73,
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
        }}>
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
                    <Text style={{ color: COLORS.green, fontWeight: 700, fontSize: SIZES.h1, marginLeft: SIZES.padding * 1.5 }}>$ {SIZES.height}</Text>
                </View>
            </View>
            <View style={{ backgroundColor: COLORS.white, flex: 1, borderRadius: 20, paddingBottom: SIZES.padding, paddingLeft: SIZES.padding, paddingRight: SIZES.padding }} >
                <NavigationContainer independent={true}>

                    <Tab.Navigator
                        screenOptions={{
                            tabBarLabelStyle: { fontSize: SIZES.body5, fontWeight: 'bold' },
                            tabBarStyle: { backgroundColor: COLORS.lightGray, borderRadius: 20, margin: SIZES.padding, width: '99.9%', height: '5%', alignSelf: 'center', alignContent: 'center' },
                            tabBarInactiveTintColor: 'gray',
                            tabBarActiveTintColor: 'black',
                            tabBarIndicatorStyle: { borderRadius: 20, backgroundColor: 'white', height: '90%', alignItems: 'center', justifyContent: 'center' },
                        }}
                    >
                        <Tab.Screen name="Asset" component={Page1} />
                        <Tab.Screen name="DEBT" component={Page2} />
                    </Tab.Navigator>
                </NavigationContainer>
            </View>
        </TouchableOpacity >

    );
}


function HomePage() {
    const [linkToken, setLinkToken] = useState(null);

    // useEffect(() => {
    //     async function fetchLinkToken() {
    //         const res = await axios.post(`/api/create_link_token`);
    //         setLinkToken(res.data.link_token);
    //     }
    //     fetchLinkToken();
    // }, []);


    return (
        <View style={{ flex: 1, paddingBottom: 10 }}>
            {renderheader()}
            {renderSummaryInfo()}
        </View>
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
});

export default HomePage;
