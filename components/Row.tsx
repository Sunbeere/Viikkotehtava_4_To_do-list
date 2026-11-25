import { Text, StyleSheet, Pressable } from 'react-native'
import { Task } from './types/Task'

interface TodoRowProps {
    item: Task
    onPress: () => void
}

export default function Row({ item, onPress }: TodoRowProps) {
    return (
        <Pressable style={styles.todoRow} onPress={onPress}>


            <Text style={[styles.todoText, 
                { textDecorationLine: item.completed === 1 ? 'line-through' : 'none'

                }
                ]}>
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
        marginHorizontal: 12,
        borderColor: '#C1c0c0',
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 8,

    },

    todoText: {
        flex: 1,
        fontSize: 20,
        color: '#000'
    }
});

