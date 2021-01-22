import React, {Component, useState, useEffect} from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import './variableglobale';


const testt = () => {

  const [nbtotal, setnbtotal] = React.useState('');

  React.useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(
          'https://mighty-temple-86101.herokuapp.com/api/myturn/client/put/' +
          global.qr,
        {
          method: 'PUT',
        },
        ).then((res) => res.json());
        const nbtotal= res.nbtotal;
        setnbtotal(nbtotal);
      } catch (error) {
        console.error(error.message);
      }
    }
    
  }, []);

  return (
      <Text> {nbtotal}</Text>
  );
};

export default testt;