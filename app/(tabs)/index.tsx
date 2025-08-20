
import React, { useState } from 'react';
import {
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

// Define type of task
type Task = {
  id: number;
  text: string;
  completed: boolean;
};

export default function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [taskText, setTaskText] = useState<string>('');

  // Function to add a new task
  const addTask = () => {
    if (taskText.trim() === '') {
      return;
    }
    const newTasks = [...tasks, { id: Date.now(), text: taskText, completed: false }];
    setTasks(newTasks);
    setTaskText('');
    
  };

  // Function to toggle a task's completion status
  const toggleComplete = (id: number) => {
    const newTasks = tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(newTasks);
  };

  // Function to delete a task
  const deleteTask = (id: number) => {
    const newTasks = tasks.filter(task => task.id !== id);
    setTasks(newTasks);
  };

  // Renders each individual task item
  const renderTaskItem = ({ item }: { item: Task }) => (
    <View style={styles.taskItem}>
      <TouchableOpacity
        style={styles.taskContent}
        onPress={() => toggleComplete(item.id)}
        accessibilityLabel={`Toggle completion for ${item.text}`}
      >
        <Text style={[styles.taskText, item.completed && styles.taskCompleted]}>
          {item.text}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => deleteTask(item.id)}
        style={styles.deleteButton}
        accessibilityLabel={`Delete ${item.text}`}
      >
        <Text style={styles.deleteButtonText}>×</Text>
      </TouchableOpacity>
    </View>
  );


  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#6A0DAD" />
      <View style={styles.header}>
        <Text style={styles.headerText}>Task Manager</Text>
      </View>

      <View style={styles.container}>
        <View style={styles.inputCard}>
          <TextInput
            style={styles.input}
            placeholder="What needs to be done?"
            placeholderTextColor="#888"
            value={taskText}
            onChangeText={setTaskText}
            onSubmitEditing={addTask}
            returnKeyType="done"
          />
        </View>

        <FlatList
          data={tasks}
          renderItem={renderTaskItem}
          keyExtractor={item => item?.id?.toString() || Math.random().toString()}
          style={styles.taskList}
          contentContainerStyle={styles.taskListContent}
          ListEmptyComponent={<Text style={styles.emptyListText}>No tasks added yet.</Text>}
        />
        
        <View style={styles.bottomAddContainer}>
          <TouchableOpacity style={styles.addButton} onPress={addTask}>
            <Text style={styles.addButtonText}>Add</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#6A0DAD', 
  },
  header: {
    height: 80,
    backgroundColor: '#6A0DAD', 
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 20,
    marginBottom: 20,   
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  closeButton: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    fontSize: 30,
    color: '#fff',
  },
  container: {
    flex: 1,
    backgroundColor: '#F0EAF9', 
    paddingHorizontal: 20,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: -20,
    paddingTop: 20,
  },
  inputCard: {
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  input: {
    height: 40,
    fontSize: 16,
    color: '#333',
  },
  taskList: {
    flex: 1,
  },
  taskListContent: {
    paddingBottom: 20,
  },
  taskItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  taskContent: {
    flex: 1,
  },
  taskText: {
    fontSize: 16,
    color: '#333',
  },
  taskCompleted: {
    textDecorationLine: 'line-through',
    color: '#A0A0A0',
  },
  deleteButton: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteButtonText: {
    color: '#E0115F',
    fontSize: 24,
    fontWeight: 'bold',
  },
  bottomAddContainer: {
    width: '100%',
    alignItems: 'center',
    paddingBottom: 20,
  },
  addButton: {
    backgroundColor: '#8A2BE2', 
    borderRadius: 25,
    paddingHorizontal: 40,
    paddingVertical: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
    marginBottom: 50,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  emptyListText: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 16,
    color: '#888',
  },
});



