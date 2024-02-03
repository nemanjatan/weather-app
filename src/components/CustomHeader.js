import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const CustomHeader = () => {
  return (
    <View style={styles.headerContainer}>
      <Image 
        source={require('../assets/images/wizard.png')}
        style={styles.headerIcon}
      />
      <Text style={styles.headerText}>Weather Wizard Alerts</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: '#FFDD59', // Example vibrant color
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF', // Adjust color based on background
    marginLeft: 10,
  },
  headerIcon: {
    width: 30,
    height: 30,
    // Add further styling as needed
  },
});

export default CustomHeader;
