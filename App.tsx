import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Task } from './components/types/Task';
import Row from './components/Row';

export default function App() {


  const [input, setInput] = useState<string>("")
  const [tasks, setTasks] = useState<Task[]>([])

  useEffect(() => {
    const loadTasks = async () => {
      const storedTasks = await AsyncStorage.getItem('tasks');
      if (storedTasks) {
        setTasks(JSON.parse(storedTasks) as Task[]);
      }
    };
    loadTasks();
  }, []);

  const markTaskAsCompleted = async (id: number) => {
    const updatedTasks = tasks.map(task =>
      task.id === id
        ? { ...task, completed: task.completed === 1 ? 0 : 1 }
        : task
    );

    setTasks(updatedTasks);
    await AsyncStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };


  const addTask = async () => {
    if (!input.trim()) return

    const id = tasks.length + 1
    const task: Task = { id, text: input, completed: 0 }
    const updatedTasks = [...tasks, task]
    setTasks(updatedTasks)
    await AsyncStorage.setItem('tasks', JSON.stringify(updatedTasks));
    setInput("")

    console.log("Adding new item")
  }


  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Todo List</Text>

      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          value={input}
          onChangeText={setInput}
          placeholder='Enter task' />
        <Text onPress={addTask} style={styles.saveButton}>Save</Text>


      </View>


      <FlatList<Task>
        data={tasks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Row item={item} onPress={() => markTaskAsCompleted(item.id)} />
        )}
      />
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'stretch',
    justifyContent: 'flex-start',

  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    marginTop: 20,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 8,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    fontSize: 20,
  },
  saveButton: {
    padding: 20,
    fontWeight: 'bold',
    fontSize: 20,
    color: 'blue',

  },

});
