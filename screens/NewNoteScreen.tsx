import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Platform, StyleSheet, Image, ImageProps, TextInput, TouchableOpacity, NativeSyntheticEvent, TextInputChangeEventData, ScrollView } from 'react-native';
import { Button } from 'react-native-paper';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { urlGetNotes } from '../constants/ServerConfig';
import { RootTabScreenProps } from '../types';

export default function NewNoteScreen() {
  const [noteInput, setNoteInput] = useState<string>(''),
    [tagsInput, setTagsInput] = useState<string | null>(null);


  function postNote() {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ note: noteInput,  tags: tagsInput })
    }

    setNoteInput('')
    setTagsInput(null)

    fetch(urlGetNotes, requestOptions)
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
        onPress={ postNote }
        style={styles.button}>
        <Text style={{ fontSize: 20, color: '#fff' }}>Добавить заметку</Text>
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
