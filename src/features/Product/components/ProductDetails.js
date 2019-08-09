import React, { Component } from "react";
import { Text, StyleSheet, View, Platform } from "react-native";
import TabBar from "../../../atoms/TabBar";
import { color } from "../../../theme";
import { circle, rightItem } from '../../../utils/styles';
import TextRow from "./TextRow";

const tabs = [
  {
    id: 1,
    isSelected: true,
    title: 'General'
  },
  {
    id: 2,
    isSelected: false,
    title: 'Pricing'
  },
  {
    id: 3,
    isSelected: false,
    title: 'Parts'
  },
  {
    id: 4,
    isSelected: false,
    title: 'Damages'
  },
];

const detailsArray = [
  {
    id: 1,
    title: "2016 Infinity QT",
    subtitle: "Space Grey",
    titleStyle: {
      color: 'black',
      fontWeight: "bold",
    },
    RightItem: (
      <View style={rightItem}>
        <View style={circle} />
        <Text style={{ marginLeft: 7 }}>PDI</Text>
      </View>
    )
  },
  {
    id: 2,
    title: "Stock Number",
    subtitle: "TIN12897",
  },
  {
    id: 3,
    title: "VIN",
    subtitle: "KT1290BJB678970"
  },
  {
    id: 4,
    title: "State",
    subtitle: "Stocked in"
  },
  {
    id: 5,
    title: "Recieved On",
    subtitle: "August 9, 2019"
  },
  {
    id: 6,
    title: "Vehicle Type",
    subtitle: "Sedan"
  },
];

export default class ProductDetails extends Component {
  state = {
    tabs,
  };

  onTabChange = id => {
    const { tabs } = this.state;
    tabs.forEach(tab => (tab.isSelected = tab.id === id));
    this.setState({ tabs });
  };

  renderDetails = () => {
    return (
      <View>
        {detailsArray.map(item => (
          <TextRow {...item} />
        ))}
      </View>
    );
  };

  render() {
    const { style } = this.props;
    return (
      <View style={{ ...styles.root, ...style }}>
        <TabBar style={styles.tabs} tabs={tabs} onPress={this.onTabChange} />
        {this.renderDetails()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    alignItems: "center"
  },
  tabs: {
    marginTop: Platform.OS === 'ios' ? 15 : 20,
    marginBottom: 20
  },
});
