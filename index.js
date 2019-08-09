/**
 * @format
 */

import { AppRegistry } from 'react-native';
import { name as appName } from './app.json';
import AppNavigator from "./src/navigator";;

AppRegistry.registerComponent(appName, () => AppNavigator);
