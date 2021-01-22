import React, {Component, useState} from 'react';
import {FlatList, Text, View,StyleSheet,TouchableOpacity,Alert} from 'react-native';
import {Button} from 'react-native-paper';
import {openDatabase} from 'react-native-sqlite-storage';
import { Icon } from 'react-native-elements'
var db = openDatabase({name: 'UserDatabasea.db'});

export default class List extends Component {
  
  async fetchData(qr) {
    try {
      const res = await fetch(
        'https://mighty-temple-86101.herokuapp.com/api/myturn/client/getall/' +
          qr,
      ).then((res) => res.json());
      const nbcours = res.nbcours;
      this.setState({
        cours: nbcours,
      });
    } catch (error) {
      console.error(error.message);
    }
    db.transaction((tx) => {
      tx.executeSql('UPDATE table_userqra set user_cour=? Where user_qr=?', [
        this.state.cours,
        qr,
      ]);
    });
  }
  

  fonction =()=>{
    db.transaction((tx) => {
      tx.executeSql('SELECT * FROM table_userqra', [], (tx, results) => {
        var temp = [];
        for (let i = 0; i <= results.rows.length; ++i) {
          this.fetchData(results.rows.item(i).user_qr);
          temp.push(results.rows.item(i));
          console.log(results.rows.item(i));
        }
        this.setState({
          FlatListItems: temp,
        });
      });
    });
    db.transaction((tx) => {
      tx.executeSql('SELECT * FROM table_userqra', [], (tx, results) => {
        var temp1 = [];
        for (let i = 0; i < results.rows.length; ++i) {
          temp1.push(results.rows.item(i));
         
        }
        this.setState({
          FlatListItems: temp1,
          refreshing:false
        });
      });
    });

    
  }
  constructor(props) {
    super(props);
    this.state = {
      cours: '',
      FlatListItems: [],
    refreshing:false
    };
   
   this.fonction()
   
  }

  register_user = () => {
    db.transaction((tx) => {
      tx.executeSql('DELETE FROM  table_userqra ', []);
    });
   this.handleRefresh()
  };

  goto = () => {
    this.props.navigation.navigate('QRscanne');
  };

  ListViewItemSeparator = () => {
    return (
      <View style={{height: 0.2, width: '100%', backgroundColor: '#808080'}} />
    );
  };

  handleRefresh=()=>{
    this.setState({
 page:1,
 refreshing:true,
 seed:this.state.seed +1 },() => {
 this.fonction()
    })

   }

   deleteAddress(a,b) {
    Alert.alert(
      'Delete Address',
      'Are you sure want to delete this address ?',
      [
        {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
        {text: 'OK', onPress: () => this.deleteAddressDetail(a,b)},
      ],
      { cancelable: false }
    )
  }

  deleteAddressDetail(a,b) {
    db.transaction((tx) => {
      tx.executeSql('DELETE FROM  table_userqra where user_qr=? and user_nbtour=? ', [a,b]);
    });
  }

  render() {
    return (
      <View  style={styles.container}>
        
       <FlatList
          data={this.state.FlatListItems}
       
          keyExtractor={(item, index) => index.toString()}
          refreshing={this.state.refreshing}
          onRefresh={this.handleRefresh}
          renderItem={({item}) => (
            <View
              style={{backgroundColor: 'white', marginBottom:30, borderRadius:10,height:150 ,padding: 20}}>
              <Text style={styles.textfooter2}>{item.user_service}</Text>
              <Text style={styles.textfooter}>{item.user_description}</Text>
              <Text style={styles.text}><Text style={styles.textfooter2}>Current Turn:</Text> {item.user_cour} </Text>
             
              <TouchableOpacity onPress={() => this.deleteAddress(item.user_qr,item.user_nbtour)}>
                <Text name="trash" style={{paddingLeft: 10,paddingRight:10}} size={20} color="red" >DELETE</Text>
              </TouchableOpacity> <Text style={styles.text}><Text style={styles.textfooter2}>My Turn:</Text> {item.user_nbtour}</Text>
            </View>
            
          )}
          
        /> 
       <View style={styles.buttonv}>
        <Button style={styles.button} color="#000" fontWeight= 'bold' onPress={this.register_user} mode="Contained">
          DELETE
        </Button>
        <Button style={styles.button} color="#000" fontWeight= 'bold' onPress={this.goto} mode="Contained">
          ADD
        </Button>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(10, 7, 40)',
    padding: 20
    
  },


  hairline: {
    backgroundColor: '#243659',
    height: 2,
    width: 100,
    borderRadius: 5,
    marginTop: 10,
  },

  button: {
    marginRight: 20,
    height: 50,
    width: 150,
    borderRadius: 30,
    backgroundColor: 'white',
  },
  textfooter2: {
    color: 'rgb(10, 7, 40)',
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  textfooter: {
    color: 'rgb(10, 7, 40)',
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 1,
    marginBottom:10
  },

  text: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#B04900',
  },
  buttonv: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: '15%',
    flexDirection: 'row',
    
  },
});

