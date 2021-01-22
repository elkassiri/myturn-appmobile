import React, {Component} from 'react';
import {
  StyleSheet,
  ActivityIndicator,
  View,
  Modal,
  Text,
  TouchableHighlight,
} from 'react-native';
import './variableglobale';
import QRCodeScanner from 'react-native-qrcode-scanner';

export default class Qr extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
    };
  }

  showModal = () => {
    this.setState({
      modalVisible: true,
    });
    setTimeout(() => {
      this.setState({
        modalVisible: false,
      });
      this.props.navigation.navigate('Tour');
    }, 4000);
  };

  onSuccess = (e) => {
    global.qr[0] = e.data.replace(/[\[\]']+/g, '');
    fetch(
      'https://mighty-temple-86101.herokuapp.com/api/myturn/client/put/' +
        global.qr,
      {
        method: 'PUT',
      },
    )
      .then(
        fetch(
          'https://mighty-temple-86101.herokuapp.com/api/myturn/client/get/' +
            global.qr,
        ),
      )
      .then((response) => response.json())
      .then((data) => (global.tour[0] = data.nbtotal))
      .catch((err) => console.log(err));
    this.showModal();
  };

  render() {
    return (
      <View>
        <QRCodeScanner onRead={this.onSuccess} showMarker={true} />

        <View>
          <Modal
            animationType="slide"
            transparent
            visible={this.state.modalVisible}>
            <View style={styles.modalView}>
              <Text style={styles.textStyle}>Loading...</Text>
            </View>
          </Modal>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },

  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    marginTop: '70%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },

  textStyle: {
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
