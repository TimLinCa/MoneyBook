import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {COLORS, SIZES, FONTS} from '@styles';

function About() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>About</Text>
      <View style={styles.box}>
        <Text style={styles.text}>Name: MoneyBook Financial App</Text>
        <Text style={styles.text}>Version: 1.0.0</Text>
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
  box: {
    backgroundColor: '#ffffff',
    marginLeft: SIZES.padding,
    marginRight: SIZES.padding,
    padding: 10,
    borderRadius: 8,
    marginVertical: 10,
  },
  text: {
    fontSize: 16,
    marginBottom: 5,
  },
});

export default About;