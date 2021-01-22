import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import Splash from './scenes/Splash';
import QRscanne from './scenes/QRscanne';
import Tour from './scenes/Tour';
import ViewAll from './scenes/ViewAll';
import List from './scenes/List';

const App = createStackNavigator(
  {
    Splash: {screen: Splash, navigationOptions: {headerShown: false}},
    QRscanne: {screen: QRscanne, navigationOptions: {headerShown: false}},
    Tour: {screen: Tour, navigationOptions: {headerShown: false}},
    List: {screen: List, navigationOptions: {headerShown: false}},
    ViewAll: {screen: ViewAll, navigationOptions: {headerShown: false}},
   
  },
  {initialRouteName: 'Splash'},
);

export default createAppContainer(App);

