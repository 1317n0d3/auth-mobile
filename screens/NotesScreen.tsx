import { useEffect, useState } from 'react';
import { NativeSyntheticEvent, ScrollView, StyleSheet, TextInput, TextInputChangeEventData, TouchableOpacity } from 'react-native';
import { Button, RadioButton } from 'react-native-paper';

import { Text, View } from '../components/Themed';
import { urlGetNotes } from '../constants/ServerConfig';
import { RootTabScreenProps } from '../types';

interface IDataItem {
  id: number,
  note: string,
  tags: string,
  created_at: string,
}

interface IDataItems extends Array<IDataItem>{}

export default function NotesScreen({ navigation, route }: RootTabScreenProps<'Notes'>) {
  const [data, setData] = useState<IDataItems>([]),
    tags: Array<string> = [],
    notesMaxLength = 40;

  useEffect(() => {
    let isMounted = true;

    fetch(urlGetNotes)
    .then(response => response.json())
    .then(json => { if(isMounted) setData(json.data)})
    
    data.forEach((value) => {
      if(value.tags) value.tags.trim().split(' ').forEach((tag) => tags.includes(tag) ? tags.push(tag) : null)
    })
    
    return () => { isMounted = false }
  }, [])

  function createTags() {
    console.log('0');

    return tags.map((tag) => (
      <TouchableOpacity>
        <Text>{tag}</Text>
      </TouchableOpacity>
    ))
  }

  function createNotes() {
    console.log('2');
    
    return data.map((value) => {
      return (
        <TouchableOpacity
          style={styles.noteContainer}
          key={`note-${value.id}`}
          onPress={() => {
            navigation.navigate('EditNote', {
              noteInput: value.note,
              tagsInput: value.tags,
              noteId: value.id,
            })
          }}>

          {
            value.note.length > notesMaxLength ?
            <Text>{value.note.slice(0, notesMaxLength)}...</Text> :
            <Text>{value.note}</Text>
          }

          <View style={ styles.rowContainer } >
            <Text style={{ fontWeight: '500' }} >{value.created_at.slice(5, 16)}</Text>

            {
              value.tags ?
              <Text style={{ fontStyle: 'italic' }} >Tags: {value.tags}</Text> :
              null
            }

          </View>

        </TouchableOpacity>
    )}).reverse()
  }

  return (
    <ScrollView style={styles.container}>

      { createTags() }

      { createNotes() }

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  noteContainer: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  rowContainer: {
    marginTop: 7,
    flexDirection: 'row',
    justifyContent: 'space-between',
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