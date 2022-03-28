import { useEffect, useState } from 'react';
import { NativeSyntheticEvent, ScrollView, StyleSheet, TextInput, TextInputChangeEventData } from 'react-native';
import { Button, RadioButton } from 'react-native-paper';

import { Text, View } from '../components/Themed';
import { urlGetNotes } from '../constants/ServerConfig';

interface IDataItem {
  id: number,
  note: string,
  tags: string,
  created_at: string,
}

interface IDataItems extends Array<IDataItem>{}

export default function NotesScreen() {
  const [data, setData] = useState<IDataItems>([]),
    [note, setNote] = useState<string>(''),
    [tags, setTags] = useState<string>('');

  useEffect(() => {
    let isMounted = true;

    fetch(urlGetNotes)
    .then(response => response.json())
    .then(json => { if(isMounted) setData(json.data)})
    
    return () => { isMounted = false }
  }, [data])

  function parseData() {
    return data.map((value) => <View style={styles.container} key={`note-${value.id}`}>
        <Text>{value.note}</Text>
        <Text>{value.created_at}</Text>
        <Text>{value.tags}</Text>
      </View>
    ).reverse()
  }

  return (
    <ScrollView style={styles.container}>
      <TextInput style={ styles.input } placeholder="Поле для заметки"
        value={note}
        onChange={(text: NativeSyntheticEvent<TextInputChangeEventData>) => 
          setNote(text.nativeEvent.text)} />
      <TextInput style={ styles.input } placeholder="Поле для тегов"
        value={tags}
        onChange={(text: NativeSyntheticEvent<TextInputChangeEventData>) => 
          setTags(text.nativeEvent.text)} />
      <Button
        onPress={() => { 
          const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ note,  tags })
          }

          setNote('')
          setTags('')

          fetch(urlGetNotes, requestOptions)
            .then(response => response.json())
        }}
        style={styles.button}>
        <Text style={{ fontSize: 20, color: '#fff' }}>Добавить заметку</Text>
      </Button>

      { parseData() }

    </ScrollView>
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