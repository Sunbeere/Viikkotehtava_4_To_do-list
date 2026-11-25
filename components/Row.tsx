import { View, Text, StyleSheet } from 'react-native'
import { Task } from './types/Task'

interface TodoRowProps {
    item: Task
}

export default function Row({item}: TodoRowProps) {
  return (
    <View style={styles.todoRow}>
      <Text style={styles.todoText}>{item.text}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    todoRow: {
        flexDirection: 'row',
        backgroundColor: '#f5f5f5',
        alignItems: 'center',
        padding: 4,
        margin: 4,
        borderColor: '#C1c0c0',
        borderWidth: 8,
        borderRadius: 8,
        marginBottom: 8,
        
    },

    todoText: {
      flex:1,
      color: '#000'
    }
});

