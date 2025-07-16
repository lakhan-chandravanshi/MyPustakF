// import React, { useEffect, useState } from 'react';
// import { View, FlatList, Text, TouchableOpacity, StyleSheet } from 'react-native';
// import axios from 'axios';

// export default function BookListScreen({ navigation }) {
//   const [books, setBooks] = useState([]);

//   useEffect(() => {
//     axios.get('http://192.168.29.115:8000/books/')
//       .then(res => setBooks(res.data))
//       .catch(err => console.log("Error fetching books:", err));
//   }, []);

//   return (
//     <View style={styles.container}>
//       <Text style={styles.header}>Available Books</Text>
//       <FlatList
//         data={books}
//         keyExtractor={item => item.id.toString()}
//         renderItem={({ item }) => (
//           <TouchableOpacity
//             style={styles.item}
//             onPress={() => navigation.navigate('Order', { book: item })}
//           >
//             <Text style={styles.title}>{item.title}</Text>
//             <Text style={styles.author}>by {item.author}</Text>
//           </TouchableOpacity>
//         )}
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { padding: 20, flex: 1 },
//   header: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
//   item: { backgroundColor: '#f1f1f1', padding: 15, borderRadius: 8, marginBottom: 10 },
//   title: { fontSize: 18, fontWeight: '600' },
//   author: { fontSize: 14, color: '#666' }
// });


import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios';

export default function BookListScreen({ navigation }) {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://192.168.29.115:8000/books/')
      .then(res => {
        setBooks(res.data);
      })
      .catch(err => console.log("Error fetching books:", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Loading books...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Available books</Text>
      <FlatList
        data={books}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.item}
            onPress={() => navigation.navigate('Order', { book: item })}
          >
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.author}>by {item.author}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, flex: 1 },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  item: { backgroundColor: '#f1f1f1', padding: 15, borderRadius: 8, marginBottom: 10 },
  title: { fontSize: 18, fontWeight: '600' },
  author: { fontSize: 14, color: '#666' }
});
