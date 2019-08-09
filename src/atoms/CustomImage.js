import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { color } from '../theme';
import { widthPercentageToDP, heightPercentageToDP } from '../utils/helper';

const CustomImage = props => {
  const { source, style } = props;
  return (
    <View style={{ ...styles.root, ...style }}>
      <Image style={styles.image} source={source} />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    width: widthPercentageToDP(100),
    backgroundColor: color.background,
    height: heightPercentageToDP(30),
    justifyContent: 'center',
    alignItems: "center",
  },
  image: {
    width: widthPercentageToDP(60),
    resizeMode: 'contain',
  },
});

export default CustomImage;
