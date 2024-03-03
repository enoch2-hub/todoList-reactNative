import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const TodoListScreen = () => {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);

  const addTask = () => {
    setTasks([...tasks, { id: Date.now().toString(), text: task, completed: false }]);
    setTask('');
  };

  const deleteTask = (taskId) => {
    const updatedTasks = tasks.filter((item) => item.id !== taskId);
    setTasks(updatedTasks);
  };


  const completeTask = (taskId) => {
    const updatedTasks = tasks.map((item) => {
      if (item.id === taskId) {
        return { ...item, completed: !item.completed };
      }
      return item;
    });
    setTasks(updatedTasks);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My To-Do List</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter task"
          value={task}
          onChangeText={setTask}
          placeholderTextColor="white"
        />
        <Button title="Add Task" onPress={addTask} />
      </View>
      <ScrollView style={styles.taskList}>
        {tasks.map((item) => (
          <View key={item.id} style={styles.taskItemContainer}>
            <Text
              style={[
                styles.taskItem,
                item.completed && styles.completedTask,
              ]}
            >
              {item.text}
            </Text>
            <TouchableOpacity onPress={() => completeTask(item.id)}>
              {item.completed ? (
                <Icon name="undo" size={20} color="blue" />
              ) : (
                <Icon name="check" size={20} color="green" />
              )}
            </TouchableOpacity>
            <TouchableOpacity onPress={() => deleteTask(item.id)}>
              <Icon name="trash" size={20} color="red" />
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#202020',
    paddingTop: 80,
  },
  title: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginRight: 10,
    padding: 5,
    color: 'white',
  },
  taskList: {
    maxHeight: 200,
  },
  taskItemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  taskItem: {
    color: 'white',
    fontSize: 16,
    marginBottom: 5,
  },
  completedTask: {
    textDecorationLine: 'line-through',
    color: 'grey',
  },
  actionButton: {
    marginLeft: 10,
    color: 'blue',
  },
});

export default TodoListScreen;
