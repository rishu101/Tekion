import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { color } from "../../../theme";
import { widthPercentageToDP } from "../../../utils/helper";

const TextRow = props => {
  const {
    style,
    title,
    subtitle,
    RightItem,
    titleStyle,
    subtitleStyle
  } = props;

  return (
    <View style={{ ...styles.root, ...style }}>
      <View style={styles.details}>
        <Text style={{ ...styles.title, ...titleStyle }}>{title}</Text>
        <Text style={{ ...styles.subtitle, ...subtitleStyle }}>{subtitle}</Text>
      </View>
      <View style={styles.rightItem}>{RightItem}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flexDirection: "row",
    padding: 20,
    width: widthPercentageToDP(100)
  },
  details: {},
  title: {
    fontSize: 15,
    color: color.textLight
  },
  subtitle: {
    fontSize: 15,
    color: color.textDark
  },
  rightItem: {
    marginLeft: "auto",
  }
});

export default TextRow;
