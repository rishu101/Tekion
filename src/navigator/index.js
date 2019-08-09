import React from "react";
import { createStackNavigator, createAppContainer } from "react-navigation";
import Product from "../features/Product";

const rootNaviagtor = createStackNavigator({
  product: Product,
});

export default createAppContainer(rootNaviagtor);
