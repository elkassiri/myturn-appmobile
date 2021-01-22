import React, {Component} from 'react';
import {View, Text, StyleSheet, Animated, StatusBar} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Image} from 'react-native';
import motif from '../assest/motif.png';

export default class Splash extends Component {
  
  state = {
    LogoText: new Animated.Value(0),
  };

  componentDidMount() {
    const {LogoText} = this.state;
    Animated.timing(LogoText, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }

  constructor(props) {
    super(props);
    setTimeout(() => {
      this.props.navigation.navigate('ViewAll');
    }, 3000);
  }

  render() {
    return (
      <LinearGradient
        colors={['rgb(10, 7, 40)', 'rgb(10, 7, 40)']}
        style={styles.container}
        start={{x: 0.8, y: 0}}
        locations={[0.9, 1]}
        end={{x: 0.9, y: 1}}>
        <StatusBar hidden={true} />

        <Animated.View style={{opacity: this.state.LogoText}}>
          <Text style={styles.logoText1}>
            My<Text style={styles.logoText}>Turn</Text>
          </Text>
        </Animated.View>
        <View style={styles.hairline} />
        <Image source={motif} style={styles.logom} />
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: '70%',
    backgroundColor: 'rgb(10, 7, 40)',
    alignContent: 'center',
  },
  logoText: {
    fontSize: 60,
    fontFamily: 'normal',
    color: '#ffffff',
    letterSpacing: 2,
  },
  logoText1: {
    fontSize: 70,
    fontFamily: 'normal',
    color: '#2080FB',
    letterSpacing: 2,
  },
  hairline: {
    backgroundColor: '#2080FB',
    height: 3,
    width: 190,
    borderRadius: 5,
  },
  logom: {
    width: 400,
    height: 340,
    flex: 0,
  },
   button: {
    marginRight: 20,
    height: 50,
    width: 150,
    borderRadius: 30,
    backgroundColor: 'white',
  },
});
