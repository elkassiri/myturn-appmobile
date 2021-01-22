import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Button} from 'react-native-paper';
import {Image} from 'react-native';
import motif from '../assest/motif.png';

export default class ViewAll extends Component {
  gotoqr = () => {
    this.props.navigation.navigate('QRscanne');
  };
  gotohi = () => {
    this.props.navigation.navigate('List');
  };
  render() {
    return (
     
     
        <View style={styles.container}>
          <View style={{marginTop:30,marginBottom:50,marginLeft:10}}>
          <Text style={styles.logoText1}>Welcome to </Text>
          <Text style={styles.logoText2}> MyTurn</Text>
          </View>
          
          <Button
            style={styles.button}
            color="#000"
            fontWeight="bold"
            onPress={this.gotoqr}
            mode="Contained">
            Scanner QR
          </Button>
          <Button
            style={styles.button}
            color="#000"
            fontWeight="bold"
            onPress={this.gotohi}
            mode="Contained">
            Liste QR 
          </Button>
          <Image source={motif} style={styles.logom} />
        </View>
      
    
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'rgb(10, 7, 40)',

  },

  logoText1: {
    fontSize: 40,
    fontFamily: 'normal',
    color: '#2080FB',
    letterSpacing: 2,
    marginTop:40
  },
  logoText2: {
    fontSize: 40,
    fontFamily: 'normal',
    color: '#2080FB',
    letterSpacing: 2,
    marginLeft:30
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
    marginTop:'20%'
  },
  button: {
    marginRight: 20,
    marginTop:20,
    height: 50,
    width: 150,
    borderRadius: 30,
    backgroundColor: 'white',
  },
});
