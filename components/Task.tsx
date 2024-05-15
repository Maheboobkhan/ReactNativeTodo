// import React, { useState } from 'react';
// import { View, Text, TextInput, Button, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
// import Icon from 'react-native-vector-icons/Feather';

// const TodoApp: React.FC = () => {
//   const [todos, setTodos] = useState<{ id: number, text: string }[]>([]);
//   const [todoText, setTodoText] = useState<string>('');

//   const addTodo = () => {
//     if (todoText.trim() !== '') {
//       setTodos([...todos, { id: Date.now(), text: todoText }]);
//       setTodoText('');
//     }
//   };

//   const deleteTodo = (id: number) => {
//     setTodos(todos.filter(todo => todo.id !== id));
//   };

//   const editTodo = (id: number) => {
//     // Implement logic to edit the todo item's text
//     // For simplicity, let's just display an alert
//     alert('Edit functionality will be implemented here');
//   };

//   return (
//     <View style={styles.container}>
//       <FlatList
//         data={todos}
//         keyExtractor={(item) => item.id.toString()}
//         renderItem={({ item }) => (
//           <View style={styles.todoItem}>
//             <Text style={styles.todoText}>{item.text}</Text>
//             <View style={styles.iconContainer}>
//               <TouchableOpacity onPress={() => deleteTodo(item.id)}>
//                 <Icon name="trash" size={20} color="red" />
//               </TouchableOpacity>
//               <TouchableOpacity onPress={() => editTodo(item.id)}>
//                 <Icon name="edit" size={20} color="blue" />
//               </TouchableOpacity>
//             </View>
//           </View>
//         )}
//       />
//       <View style={styles.inputContainer}>
//         <TextInput
//           style={styles.input}
//           value={todoText}
//           onChangeText={setTodoText}
//           placeholder="Enter todo"
//         />
//         <Button title="Add Todo" onPress={addTodo} />
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     paddingHorizontal: 20,
//     paddingTop: 20,
//     paddingBottom: 60, // Space for input and button at the bottom
//     backgroundColor: '#fff',
//   },
//   inputContainer: {
//     position: 'absolute',
//     bottom: 0,
//     width: '100%',
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     backgroundColor: '#fff',
//     paddingRight: 20,
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: '#ccc',
//     padding: 10,
//     marginRight: 10,
//     width: '80%',
//     borderRadius: 5,
//   },
//   todoItem: {
//     width: '98%',
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     padding: 10,
//     backgroundColor: '#ccc',
//     marginBottom: 10,
//   },
//   todoText: {
//     width : '80%',
//     fontSize: 16,
//   },
//   iconContainer: {
//     flexDirection: 'row',
//     gap: 20
//   },
// });

// export default TodoApp;








import React, { useState, useRef } from 'react';
import { View, Text, TextInput, Button, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

const TodoApp: React.FC = () => {
  const [todos, setTodos] = useState<{ id: number, text: string }[]>([]);
  const [todoText, setTodoText] = useState<string>('');
  const [editingTodoId, setEditingTodoId] = useState<number | null>(null);
  const inputRef = useRef<TextInput | null>(null);

  const addTodo = () => {
    if (todoText.trim() !== '') {
      if (editingTodoId !== null) {
        // If editing an existing todo, update its text
        const updatedTodos = todos.map(todo =>
          todo.id === editingTodoId ? { ...todo, text: todoText } : todo
        );
        setTodos(updatedTodos);
        setEditingTodoId(null); // Clear editing state
      } else {
        // If not editing, add a new todo
        setTodos([...todos, { id: Date.now(), text: todoText }]);
      }
      setTodoText('');
    }
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const startEditTodo = (id: number, text: string) => {
    setEditingTodoId(id);
    setTodoText(text);
    inputRef.current?.focus();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Todo App</Text>
      <FlatList
        data={todos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={[styles.todoItem, editingTodoId === item.id && styles.activeItem]}>
            <Text style={styles.todoText}>{item.text}</Text>
            <View style={styles.iconContainer}>
              <TouchableOpacity onPress={() => deleteTodo(item.id)}>
                <Icon name="trash" size={20} color="red" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => startEditTodo(item.id, item.text)}>
                <Icon name="edit" size={20} color="blue" />
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
      <View style={styles.inputContainer}>
        <TextInput
        ref={inputRef}
          style={styles.input}
          value={todoText}
          onChangeText={setTodoText}
          placeholder="Enter todo"
        />
        <Button
          title={editingTodoId !== null ? "Edit Todo" : "Add Todo"}
          onPress={addTodo}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 60, // Space for input and button at the bottom
    backgroundColor: '#fff',
  },
  heading: {
    fontSize: 35,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  inputContainer: {
    position: 'absolute',
    bottom: 2,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingRight: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    fontSize: 18,
    marginRight: 10,
    width: '80%',
    borderRadius: 5,
  },
  todoItem: {
    width: '98%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: '#ccc',
    marginBottom: 10,
    borderRadius: 7,
  },
  todoText: {
    width: '80%',
    fontSize: 16,
  },
  iconContainer: {
    flexDirection: 'row',
    gap: 20
  },
  activeItem: {
    backgroundColor: 'lightblue', // Change background color for active item
  },
});

export default TodoApp;
