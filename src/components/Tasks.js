import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { AuthContext } from './AuthContext';
import { db } from './firebase';

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const { user } = React.useContext(AuthContext);

  useEffect(() => {
    const unsubscribe = db.collection('tasks').where('userId', '==', user.uid)
      .onSnapshot((snapshot) => {
        const tasksData = snapshot.docs.map((doc) => {
          const taskData = doc.data();
          const taskId = doc.id;

          return {
            id: taskId,
            title: taskData.title,
            description: taskData.description,
            completed: taskData.completed,
          };
        });

        setTasks(tasksData);
      });

    return () => unsubscribe();
  }, []);

  const handleCompleteTask = (taskId) => {
    db.collection('tasks').doc(taskId).update({ completed: true });
  };

  const handleRemoveTask = (taskId) => {
    db.collection('tasks').doc(taskId).delete();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tarefas</Text>

      {tasks.map((task) => (
        <View key={task.id} style={styles.task}>
          <Text style={task.completed ? styles.completedTask : styles.taskTitle}>{task.title}</Text>
          <Text style={styles.taskDescription}>{task.description}</Text>

          <View style={styles.buttons}>
            <Button
              title="Marcar como concluída"
              onPress={() => handleCompleteTask(task.id)}
              disabled={task.completed}
            />

            <Button
              title="Remover"
              onPress={() => handleRemoveTask(task.id)}
            />
          </View>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },

  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },

  task: {
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
  },

  taskTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },

  taskDescription: {
    fontSize: 16,
  },

  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  completedTask: {
    textDecorationLine: 'line-through',
  },
});

export default Tasks;
