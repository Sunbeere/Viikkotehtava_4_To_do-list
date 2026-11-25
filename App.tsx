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
        setTasks(JSON.parse(storedTasks));
      }
    };
loadTasks();
  }, []);

  const markTaskAsCompleted = async (id: number) => {
    const updatedTasks = tasks.map(task =>
    task.id === id
    ? {...task, completed: task.completed === 1 ? 0 : 1 }
    : task
    );
 
  setTasks(updatedTasks);
  await AsyncStorage.setItem('tasks', JSON.stringify(updatedTasks));
};


  const addTask = async () => {
   if(!input.trim()) return

   const id = tasks.length + 1
    const task: Task = { id, text: input, completed:0}
    const updatedTasks=[...tasks,task]
    setTasks(updatedTasks)
    await AsyncStorage.setItem('tasks', JSON.stringify(updatedTasks));
    setInput("")
   
    console.log("Adding new item")
  }


  return (
    <SafeAreaView style={styles.container}>
    <View>
      <TextInput
      value={input}
      onChangeText={setInput}
      placeholder='Add new task...'
      onSubmitEditing={addTask}
      
     />
    </View>
    <FlatList<Task>
      data={tasks}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({item}) => <Row item={item} />}
      renderItem={({item}) => (
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
    justifyContent: 'center',
  },
});
