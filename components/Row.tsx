import { View, Text, StyleSheet, Pressable } from 'react-native'
import { Task } from './types/Task'

interface TodoRowProps {
    item: Task
    onPress: () => void
}

export default function Row({ item, onPress }: TodoRowProps) {
    return (
        <Pressable style={styles.todoRow} onPress={onPress}>

            <Text style={[styles.todoText, { textDecorationLine: item.completed === 1 ? 'line-through' : 'none' }]}>
                {item.text}
            </Text>
        </Pressable >
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
        flex: 1,
        color: '#000'
    }
});

