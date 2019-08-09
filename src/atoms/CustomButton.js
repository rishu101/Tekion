import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { color } from "../theme";
const CustomButton = props => {
  const { title, onPress, style, textStyle } = props;
  return (
    <View style={{ ...styles.root, ...style }}>
      <TouchableOpacity onPress={onPress}>
        <Text style={{ ...styles.text, ...textStyle }}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: color.secondary,
  },
  text: {
    color: 'white'
  },
});

export default CustomButton;
