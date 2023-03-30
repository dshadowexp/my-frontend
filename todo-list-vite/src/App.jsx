import { useState, useEffect } from 'react';
import '../dist/styles.css';
import axios from 'axios';

import Header from './components/header.jsx';
import AddTodo from './components/add-todo.jsx';
import TodoList from './components/todo-list';

export default function App() {
  const [editIndex, setEditIndex] = useState(null);
  const [todoTitle, setTodoTitle] = useState('');
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const controller = new AbortController();

    axios.get('http://localhost:8080/api/todos', {
      signal: controller.signal
    })
      .then((response) => {
        setTodos(response.data);
      })
      .catch((err) => {
        if (!axios.isCancel(err)) {
          console.log(err);
        }
      });

    return () => {
      controller.abort();
    }
  }, []);

  function onTodoTitleChange(e) {
    e.preventDefault();
    setTodoTitle(e.target.value);
  }

  async function addTodo() {
    if (todoTitle.trim() === '')
      return;
    axios.post('http://localhost:8080/api/todos', {
      title: todoTitle.trim()
    }).then((response) => {
      setTodos([...todos, response.data]);
      setTodoTitle('');
    }).catch(error => {
      console.log(`Error; ${error.message}`);
    });    
  }

  function completeTodo(todoId) {
      const todoToUpdate = todos.find((todo) => todo._id === todoId);
      axios.put(`http://localhost:8080/api/todos/${todoId}`, {
        active: !todoToUpdate.active
      })
        .then(response => {
          setTodos(todos.map((todo) => {
            if (todo._id == response.data._id) {
              return response.data;
            }
            return todo;
          }))
        })
        .catch((err) => {
          console.log(err);
        });
  }

  async function deleteTodo(todoId) {
    try {
      await axios.delete(`http://localhost:8080/api/todos/${todoId}`);
      setTodos(todos.filter((todo) => todoId != todo._id));
    } catch (err) {
      console.log(err)
    }
  }

  function editTodo(todoId) {
    let targetTodo = todos.find(todo => todo._id === todoId);
    setTodoTitle(targetTodo.title);
    setEditIndex(todoId)
  }

  function updateTodo(e) {
    e.preventDefault();
    if (editIndex === null)
      return;
    axios.put(`http://localhost:8080/api/todos/${editIndex}`, {
      title: todoTitle
    })
      .then(response => {
        setTodos(todos.map((todo) => {
          if (todo._id == response.data._id) {
            return response.data;
          }
          return todo;
        }))
      })
      .catch((err) => {
          console.log(err);
        });

    setTodos(todos.map((todo) => {
      if (todo._id === editIndex) {
        todo.title = todoTitle
      }
      return todo;
    }));
    cancelEdit();
  }

  function cancelEdit() {
    setTodoTitle('');
    setEditIndex(null);
  }

  return <div className="app">
    <Header />
    <main>
      <AddTodo 
        isAdd={editIndex === null}
        title={todoTitle} 
        setTitle={onTodoTitleChange} 
        addTodo={addTodo} 
        updateTodo={updateTodo}
        cancelEdit={cancelEdit}
      />
      <TodoList 
        todos={todos} 
        completeTodo={completeTodo} 
        editTodo={editTodo} 
        removeTodo={deleteTodo}
      />
    </main>
  </div>
}