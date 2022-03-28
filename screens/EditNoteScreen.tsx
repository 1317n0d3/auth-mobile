import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Platform, StyleSheet, Image, ImageProps, TextInput, TouchableOpacity, NativeSyntheticEvent, TextInputChangeEventData, ScrollView } from 'react-native';
import { Button } from 'react-native-paper';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { urlGetNotes } from '../constants/ServerConfig';
import { RootStackScreenProps, RootTabScreenProps } from '../types';

export default function EditNoteScreen({ navigation, route }: RootStackScreenProps<'EditNote'>) {
  const [noteInput, setNoteInput] = useState<string>(route.params.noteInput),
    [tagsInput, setTagsInput] = useState<string | null>(route.params.tagsInput),
    noteId: number = route.params.noteId;

  function updateNote(id: number) {
    const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ note: noteInput, tags: tagsInput })
    }
    

    fetch(urlGetNotes + id, requestOptions)
      .then(response => response.json())
  }

  function deleteNote(id: number) {
    const requestOptions = {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    }
    
    fetch(urlGetNotes + id, requestOptions)
      .then(response => response.json())
  }

  return (
    <ScrollView style={ styles.container }>
      <TextInput style={ styles.input } placeholder="Теги"
        value={tagsInput ? tagsInput : ''}
        onChange={(text: NativeSyntheticEvent<TextInputChangeEventData>) => 
          setTagsInput(text.nativeEvent.text)} />
      <TextInput style={ styles.inputNote } placeholder="Введите текст"
        multiline={ true }
        value={noteInput}
        onChange={(text: NativeSyntheticEvent<TextInputChangeEventData>) => 
          setNoteInput(text.nativeEvent.text)} />
      <Button
        onPress={ () => {
          updateNote(noteId)
          navigation.navigate('Root', { screen: 'Notes' })
        }}
        style={styles.button}>
        <Text style={{ fontSize: 20, color: '#fff' }}>Изменить заметку</Text>
      </Button>
      <Button
        onPress={ () => {
          deleteNote(noteId)
          navigation.navigate('Root', { screen: 'Notes' })
        }}
        style={styles.button}>
        <Text style={{ fontSize: 20, color: '#fff' }}>Удалить заметку</Text>
      </Button>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    padding: 10,
  },
  titleDark: {
    fontSize: 20,
    fontWeight: 'bold',
    padding: 10,
    color: 'white',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  input: {
    height: 40,
    margin: 12,
    padding: 10,
    backgroundColor: 'white',
  },
  inputNote: {
    height: 400,
    margin: 12,
    padding: 10,
    backgroundColor: 'white',
  },
  button: {
    marginTop: 10,
    backgroundColor: '#194bff',
  },
  hidden: {
    display: 'none',
  },
  buttonDisabled: {
    marginTop: 10,
    backgroundColor: '#757575',
  },
  error: {
    paddingTop: 10,
    color: 'red',
  }
});
