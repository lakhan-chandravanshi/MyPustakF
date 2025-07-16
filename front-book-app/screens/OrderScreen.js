import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import axios from 'axios';

export default function OrderScreen({ route }) {
  const { book } = route.params;
  const [name, setName] = useState('');

  const placeOrder = () => {
    if (!name.trim()) {
      Alert.alert("Error", "Please enter your name");
      return;
    }

    axios.post('http://192.168.29.115:8000/order/', {
      book_id: book.id,
      customer_name: name
    })
    .then(res => {
      Alert.alert('Success', res.data.message);
      setName('');
    })
    .catch(err => {
      console.log("Error placing order:", err);
      Alert.alert('Error', 'Failed to place order');
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Ordering: <Text style={styles.book}>{book.title}</Text></Text>
      <TextInput
        placeholder="Enter your name"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />
      <Button title="Place Order" onPress={placeOrder} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, flex: 1, justifyContent: 'center' },
  label: { fontSize: 18, marginBottom: 10 },
  book: { fontWeight: 'bold' },
  input: { borderWidth: 1, borderColor: '#ccc', marginBottom: 20, padding: 10, borderRadius: 5 }
});
