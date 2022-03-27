import { useEffect, useState } from 'react';
import { NativeSyntheticEvent, ScrollView, StyleSheet, TextInput, TextInputChangeEventData } from 'react-native';
import { Button, RadioButton } from 'react-native-paper';

import { Text, View } from '../components/Themed';

export default function NotesScreen() {
  const [data, setData] = useState([]);

  useEffect(() => {
    let isMounted = true;

    fetch('http://localhost:3000/api/notes')
    .then(response => response.json())
    .then(json => { if(isMounted) setData(json.data)})
    
    return () => { isMounted = false }
  }, [])

  return (
    <View style={styles.container}>
      <Button
        onPress={() => { 
          console.log('Response: ', data);
        }}
        style={styles.button}>
        <Text style={{ fontSize: 20, color: '#fff' }}>Войти</Text>
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: '500',
    padding: 10,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  button: {
    marginTop: 10,
    backgroundColor: '#194bff',
  },
  buttonDisabled: {
    marginTop: 10,
    backgroundColor: '#757575',
  },
  hidden: {
    display: 'none',
  },
  error: {
    paddingTop: 10,
    color: 'red',
  }
});