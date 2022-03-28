import { useEffect, useState } from 'react';
import { NativeSyntheticEvent, ScrollView, StyleSheet, TextInput, TextInputChangeEventData, TouchableOpacity } from 'react-native';
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
    [noteInput, setNoteInput] = useState<string>(''),
    [tagsInput, setTagsInput] = useState<string | null>(null),
    [noteId, setNoteId] = useState<number>(0);

  useEffect(() => {
    let isMounted = true;

    fetch(urlGetNotes)
    .then(response => response.json())
    .then(json => { if(isMounted) setData(json.data)})
    
    return () => { isMounted = false }
  }, [data])

  function parseData() {
    return data.map((value) => <TouchableOpacity
      style={styles.container}
      key={`note-${value.id}`}
      onPress={(e) => {
        setNoteInput(value.note)
        setTagsInput(value.tags)
        setNoteId(value.id)
      }}>
        <Text>{value.note}</Text>
        <Text>{value.created_at}</Text>
        <Text>{value.tags}</Text>
        <Button
          onPress={ () => deleteNote(value.id) }
          style={styles.button}>
          <Text style={{ fontSize: 20, color: '#fff' }}>удалить</Text>
        </Button>
    </TouchableOpacity>
    ).reverse()
  }

  function deleteNote(id: number) {
    const requestOptions = {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    }
    
    fetch(urlGetNotes + id, requestOptions)
      .then(response => response.json())
  }

  function updateNote(id: number) {
    const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ note: noteInput, tags: tagsInput })
    }
    

    fetch(urlGetNotes + id, requestOptions)
      .then(response => response.json())

    setNoteInput('')
    setTagsInput(null)
  }

  return (
    <ScrollView style={styles.container}>
      <TextInput style={ styles.input } placeholder="Поле для заметки"
        value={noteInput}
        onChange={(text: NativeSyntheticEvent<TextInputChangeEventData>) => 
          setNoteInput(text.nativeEvent.text)} />
      <TextInput style={ styles.input } placeholder="Поле для тегов"
        value={tagsInput ? tagsInput : ''}
        onChange={(text: NativeSyntheticEvent<TextInputChangeEventData>) => 
          setTagsInput(text.nativeEvent.text)} />
      
      <Button
        onPress={ () => updateNote(noteId) }
        style={styles.button}>
        <Text style={{ fontSize: 20, color: '#fff' }}>Изменить заметку</Text>
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