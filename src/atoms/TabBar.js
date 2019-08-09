import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView
} from 'react-native';
import { color } from '../theme';
import { widthPercentageToDP } from '../utils/helper';

const TabBar = props => {
  const { style, tabs, onPress } = props;

  const getTabTextStyle = isSelected =>
    isSelected ? styles.selected : styles.unselected;
  const getLineStyle = isSelected =>
    isSelected ? styles.lineSelected : styles.lineUnselected;

  return (
    <View style={{ ...styles.root, ...style }}>
      <ScrollView horizontal>
        {tabs.map(tab => (
          <TouchableOpacity onPress={() => onPress(tab.id)}>
            <View style={styles.center}>
              <Text
                style={{ ...getTabTextStyle(tab.isSelected), ...styles.text }}
              >
                {tab.title}
              </Text>
              <View style={getLineStyle(tab.isSelected)} />
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  selected: {
    color: color.secondary
  },
  unselected: {
    color: color.textMuted
  },
  lineSelected: {
    backgroundColor: color.secondary,
    height: 5,
    minWidth: widthPercentageToDP(32),
  },
  lineUnselected: {
    backgroundColor: color.textMuted,
    height: 2,
    marginTop: 1.5,
    minWidth: widthPercentageToDP(32),
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingRight: 15,
    paddingLeft: 15,
    paddingBottom: 10,
  },
  center: {
    alignItems: "center",
  },
});

export default TabBar;
