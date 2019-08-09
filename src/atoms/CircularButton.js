import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { color } from '../theme';

const CircularButton = props => {
  const { style, onPress } = props;
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={{ ...styles.root, ...style }}>
        <Text style={styles.cross}>X</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  root: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    height: 50,
    width: 50,
    backgroundColor: color.secondary,
    shadowOffset: { width: 2, height: 2 },
    shadowColor: "black",
    shadowOpacity: 0.3,
    elevation: 1,
  },
  cross: {
    fontWeight: 'bold',
    fontSize: 20,
    color: "white",
  }
});

export default CircularButton;
