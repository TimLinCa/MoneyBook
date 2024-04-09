import React from 'react';
import {View, Text, Switch, StyleSheet, TouchableOpacity} from 'react-native';

function Notification() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Notification Page</Text>
      <View style={styles.setting}>
        <Text>Messages Notifications</Text> 
        <Switch thumbColor="#007bff" trackColor={{ false: '#ccc', true: '#007bff' }} />
      </View>
      <View style={styles.setting}>
        <Text>Account Notifications</Text>
        <Switch thumbColor="#007bff" trackColor={{ false: '#ccc', true: '#007bff' }} />
      </View>
      <View style={styles.setting}>
        <Text>In-App Notifications</Text>
        <Switch thumbColor="#007bff" trackColor={{ false: '#ccc', true: '#007bff' }} />
      </View>
      <View style={styles.footer}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  setting: {
    marginBottom: 20,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default Notification;
