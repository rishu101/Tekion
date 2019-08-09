import { Dimensions, DeviceInfo, Platform } from 'react-native';
import { Header } from 'react-navigation';

export const LANDSCAPE = 'landscape';
export const PORTRAIT = 'portrait';

export const getHeaderHeight = () => {
  let height;
  const orientation = getOrientation();
  height = getHeaderSafeAreaHeight();
  height +=
    DeviceInfo.isIPhoneX_deprecated && orientation === PORTRAIT ? 24 : 0;

  return height;
};

// This does not include the new bar area in the iPhone X, so I use this when I need a custom headerTitle component
export const getHeaderSafeAreaHeight = () => {
  const orientation = getOrientation();
  if (Platform.OS === 'ios' && orientation === LANDSCAPE && !Platform.isPad) {
    return 32;
  }
  return Platform.OS === 'ios' ? Header.HEIGHT : Header.HEIGHT + 10;
};

export const getOrientation = () => {
  const { width, height } = Dimensions.get('window');
  return width > height ? LANDSCAPE : PORTRAIT;
};
export const widthPercentageToDP = width => {
  return (Dimensions.get("window").width * width) / 100;
};

export const heightPercentageToDP = height => {
  return (Dimensions.get("window").height * height) / 100;
};
