import React, {Component, useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  BackHandler,
  Alert,
} from 'react-native';
import './variableglobale';
var width = Dimensions.get('window').width;
import {NavigationEvents} from 'react-navigation';
import {Button} from 'react-native-paper';
import {openDatabase} from 'react-native-sqlite-storage';
var db = openDatabase({name: 'UserDatabasea.db'});

const Tour = ({navigation}) => {
  const [resa, setresa] = React.useState(true);
  const [description, setdescription] = React.useState('');
  const [nbcours, setnbcours] = React.useState('');
  const [nameservice, setnameservice] = React.useState('');

  _onBlurr = () => {
    BackHandler.removeEventListener(
      'hardwareBackPress',
      this._handleBackButtonClick,
    );
  };

  _onFocus = () => {
    BackHandler.addEventListener(
      'hardwareBackPress',
      this._handleBackButtonClick,
    );
  };

  _handleBackButtonClick = () => true;

  exit_function = () => {
    BackHandler.exitApp();
  };

  alerta = (a) => {
    alert('Results', a);
  };
  // data
  register_user = () => {
    db.transaction(function (tx) {
      tx.executeSql(
        'INSERT INTO table_userqra ( user_qr, user_nbtour ,user_service ,user_description, user_cour) VALUES (?,?,?,?,?)',
        [global.qr[0], global.tour[0],global.service[0],global.description[0],global.cour[0]],
      );
    });

    navigation.navigate('List');
  };

  /////////////////////////////////////////////

  React.useEffect(() => {
    let repeat;
    async function fetchData() {
      try {
        const res = await fetch(
          'https://mighty-temple-86101.herokuapp.com/api/myturn/client/getall/' +
            global.qr,
        ).then((res) => res.json());
        const nameservice = res.nameservice;
        const description = res.description;
        const nbcours = res.nbcours;
        setnameservice(nameservice);
        setdescription(description);
        setnbcours(nbcours);
        setresa(false);
        repeat = setTimeout(fetchData, 10000);
      } catch (error) {
        console.error(error.message);
      }
    }
    fetchData();
    return () => {
      if (repeat) {
        setresa(true);
        clearTimeout(repeat);
      }
    };
  }, []);
  return (
    <View style={styles.container}>
      <NavigationEvents
        onWillFocus={this._onFocus}
        onWillBlur={this._onBlurr}
      />
      <View style={styles.header}>
        <Text style={styles.textheader}> {nameservice}</Text>
        <View style={styles.hairline2} />
        <Text style={styles.textheader1}> {description}</Text>
      </View>

      <View style={styles.footer}>
        <View style={styles.desk}>
          <View style={styles.hairline} />
          <Text style={styles.textfooter}> MON TOUR </Text>
          <View style={styles.hairline} />
          <Text style={styles.textfooter2}>{global.tour[0]}</Text>
          <View style={styles.hairline} />
          <Text style={styles.textfooter}> TOUR ACTUEL </Text>
          <View style={styles.hairline} />
          <Text style={styles.textfooter2}>{nbcours}</Text>
          <ActivityIndicator size="large" color="#0000ff" animating={resa} />
        </View>
        <View style={styles.button}>
          <Button
            color="#FFF"
            onPress={this.register_user}
            mode="Contained"
            style={styles.button1}>
            CONFIRMER
          </Button>

          <Button
            color="#FFF"
            onPress={this.exit_function}
            mode="Contained"
            style={styles.button2}>
            FERMER
          </Button>
        </View>
      </View>
    </View>
  );
};

export default Tour;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(10, 7, 40)',
    alignItems: 'center',
  },

  header: {
    flex: 1,
    marginHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },

  textheader: {
    color: 'white',
    fontSize: 'bold',
    fontSize: 25,
    letterSpacing: 2,
  },
  textheader1: {
    color: 'white',
    fontSize: 'bold',
    fontSize: 18,
    paddingTop: 10,
  },
  hairline2: {
    backgroundColor: '#2080FB',
    height: 2,
    width: 200,
    borderRadius: 5,
    marginTop: 10,
  },

  footer: {
    flex: 3,
    backgroundColor: 'white',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 40,
  },

  textfooter: {
    color: '#05375a',
    fontSize: 30,
    fontWeight: 'bold',
    letterSpacing: 1,
  },

  text: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },

  desk: {
    alignItems: 'center',
    width: width,
  },

  textfooter2: {
    color: '#B04900',
    fontSize: 30,
    fontWeight: 'bold',
    letterSpacing: 1,
    paddingBottom: '10%',
  },

  hairline: {
    backgroundColor: '#243659',
    height: 2,
    width: 100,
    borderRadius: 5,
    marginTop: 10,
  },
  indicator: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 80,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: '15%',
    flexDirection: 'row',
    width: width,
  },
  button1: {
    marginRight: 20,
    height: 50,
    width: 150,
    borderRadius: 30,
    backgroundColor: 'rgb(10, 7, 40)',
  },
  button2: {
    marginLeft: 20,
    height: 50,
    width: 150,
    borderRadius: 30,
    backgroundColor: 'rgb(10, 7, 40)',
  },
});
