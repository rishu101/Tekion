import React, { Component } from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  Animated,
  PanResponder,
  Dimensions,
} from 'react-native';
import CustomImage from "../../atoms/CustomImage";
import CircularButton from "../../atoms/CircularButton";
import ProductDetails from "./components/ProductDetails";
import {
  heightPercentageToDP,
  getHeaderHeight,
  widthPercentageToDP,
} from "../../utils/helper";
import CustomButton from "../../atoms/CustomButton";

const SCREEN_HEIGHT = Dimensions.get("window").height;
const SWIPE_THRESHOLD = 0.1 * SCREEN_HEIGHT;
const SWIPE_OUT_DURATION = 250;
const images = [
  require('../../assets/tesla-front.png'),
  require('../../assets/tesla-front.png'),
  require('../../assets/tesla-front.png'),
  require('../../assets/tesla-front.png'),
];

export default class Product extends Component {
  static defaultProps = {
    onSwipeUp: () => {},
    onSwipeDown: () => {}
  };

  constructor(props) {
    super(props);

    const position = new Animated.ValueXY();
    const buttonPosition = new Animated.ValueXY();
    const backgroundPostion = new Animated.ValueXY();

    const panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (event, gesture) => {
        position.setValue({ x: 0, y: gesture.dy });
      },
      onPanResponderRelease: (event, gesture) => {
        if (gesture.dy > SWIPE_THRESHOLD) {
          this.forceSwipe("down");
        } else if (gesture.dy < -SWIPE_THRESHOLD) {
          this.forceSwipe("up");
        } else {
          this.resetPosition();
        }
      },
    });

    const backgroundPanResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: () => {},
      onPanResponderRelease: (event, gesture) => {
        this.forceSwipe("down");
      },
    });

    this.state = {
      panResponder,
      backgroundPanResponder,

      position,
      buttonPosition,
      showDetails: true,
      isExpanded: false
    };
  }

  forceSwipe = direction => {
    const { isExpanded } = this.state;
    const y =
      direction === "down"
        ? SCREEN_HEIGHT
        : -heightPercentageToDP(40) + getHeaderHeight();

    let x = 0;
    if (!isExpanded && direction === 'up') {
      x = -widthPercentageToDP(3);
    }
    Animated.timing(this.state.position, {
      toValue: { x, y },
      duration: SWIPE_OUT_DURATION
    }).start(() => this.onSwipeComplete(direction));
  };

  onSwipeComplete = direction => {
    const { isExpanded } = this.state;
    const y =
      direction === 'down'
        ? SCREEN_HEIGHT
        : -heightPercentageToDP(40) + getHeaderHeight();

    let x = 0;

    if (!isExpanded && direction === 'up') {
      x = -widthPercentageToDP(3);
    }
    this.state.position.setValue({ x, y });
    if (direction === "down") {
      this.setState({
        showDetails: false,
        isExpanded: false,
      });
    } else {
      this.setState({
        showDetails: true,
        isExpanded: true,
      });
    }
  };

  resetPosition = () => {
    Animated.timing(this.state.position, {
      toValue: { x: 0, y: 0 },
      duration: SWIPE_OUT_DURATION * 2,
    }).start(() => {
      this.setState({
        isExpanded: false,
      });
    });
  };

  getCardStyles = () => {
    const { position } = this.state;

    return {
      ...position.getLayout()
    };
  };

  renderImages = () => {
    return images.map(image => (
      <CustomImage style={styles.image} source={image} />
    ));
  };

  onClose = () => {
    this.setState({
      showDetails: true,
    });
    Animated.timing(this.state.position, {
      toValue: { x: 0, y: 0 },
      duration: SWIPE_OUT_DURATION,
    }).start(() => {
      this.state.position.setValue({ x: 0, y: 0 });
    });
    Animated.timing(this.state.buttonPosition, {
      toValue: { x: 0, y: 0 },
      duration: SWIPE_OUT_DURATION * 2,
    }).start(() => {
      this.state.position.setValue({ x: 0, y: 0 });
    });
  };

  render() {
    const { showDetails, isExpanded } = this.state;
    const rootAlignStyle = {
      alignItems: showDetails ? 'flex-start' : 'center',
    };
    return (
      <View style={{ ...styles.root, ...rootAlignStyle }}>
        <Animated.View {...this.state.backgroundPanResponder.panHandlers}>
          <ScrollView>{this.renderImages()}</ScrollView>
        </Animated.View>
        {!showDetails && (
          <View style={styles.crossButton}>
            <CircularButton onPress={this.onClose} />
          </View>
        )}
        {showDetails && (
          <Animated.View
            style={this.getCardStyles()}
            {...this.state.panResponder.panHandlers}
          >
            <View
              style={
                !isExpanded
                  ? { ...styles.detail, ...styles.cardDefault }
                  : { ...styles.detail, ...styles.detailsExpanded }
              }
            >
              <ProductDetails />
            </View>
          </Animated.View>
        )}
        {showDetails && (
          <Animated.View style={this.state.buttonPosition.getLayout()}>
            <CustomButton
              style={styles.bottomButton}
              onPress={() => {}}
              title="Create RO"
            />
          </Animated.View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
  },
  image: {
    marginBottom: 5
  },
  crossButton: {
    zIndex: 5,
    elevation: 1,
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
  },
  detail: {
    position: "absolute",
    top: -heightPercentageToDP(60),
    left: 0,
    zIndex: 10,
    height: heightPercentageToDP(100),
    width: widthPercentageToDP(94),
    marginLeft: widthPercentageToDP(3),
    marginRight: widthPercentageToDP(3),
    backgroundColor: "white",
  },
  detailsExpanded: {
    width: widthPercentageToDP(100),
    margin: 0,
  },
  bottomButton: {
    width: widthPercentageToDP(100),
    height: 50,
    bottom: 0,
    position: "absolute",
    zIndex: 11,
    elevation: 11,
  },
  cardDefault: {
    borderRadius: 10,
    shadowOffset: { width: 2, height: 2 },
    shadowColor: "black",
    shadowOpacity: 0.3,
    elevation: 10,
  },
});
