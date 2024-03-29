import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {COLORS, SIZES, FONTS} from '@styles';

function About() {
  return (
    <View>
      <Text>Name</Text>
      <Text>Version</Text>
    </View>
  );
}
export default About;

const styles = StyleSheet.create({
  box: {
    backgroundColor: '#ffffff',
    marginLeft: SIZES.padding,
    marginRight: SIZES.padding,
    padding: 10,
    borderRadius: 8,
    marginVertical: 10,
  },
});
