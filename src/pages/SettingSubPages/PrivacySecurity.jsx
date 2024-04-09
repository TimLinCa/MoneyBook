// PrivacySecurity.jsx
import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import ToggleSwitch from 'toggle-switch-react-native';

function PrivacySecurity() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Privacy & Security</Text>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Security Alerts</Text>
        <Text style={styles.sectionText}>
          Receive security alerts for suspicious activities related to your account.
        </Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Update Services</Text>
        <Text style={styles.sectionText}>
          Keep your app up to date to ensure the latest security features are enabled.
        </Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>MoneyBook Online Security Guarantee</Text>
        <Text style={styles.sectionText}>
          This is just a visual representation of how the online Security of the app should look like. 
          There's no real information or steps to follow up, just for information purposes. 
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus quis sapien quis
          mauris varius pharetra. Vestibulum ac justo non lacus scelerisque commodo.
        </Text>
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
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  sectionText: {
    fontSize: 16,
  },
});

export default PrivacySecurity;
